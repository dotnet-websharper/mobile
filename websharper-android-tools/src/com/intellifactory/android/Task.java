package com.intellifactory.android;

import java.util.concurrent.Executor;
import java.util.concurrent.atomic.AtomicReference;

/** Represents an asynchronously completing computation */
final class Task<T> {

	/** Used to define a new user task */
	static interface Definition<T> {
		/**
		 * Runs the task. Must eventually call once one of the continuation
		 * functions in the provided environment.
		 */
		public void run(Environment<T> env);
	}

	/** The environment available to executing tasks */
	static interface Environment<T> {
		/** The success continuation function */
		public void done(T value);

		/** The error continuation function */
		public void error(Exception e);

		/** The associated executor */
		public Executor getExecutor();
	}

	/**
	 * A union type representing task states.
	 * 
	 * 		type State<'T> =
	 *			| Done of 'T
	 *			| Error of exn
	 *			| Waiting
	 */
	abstract static class State {

		final static class Done<T> extends State {
			final private T value;

			public Done(T value) {
				this.value = value;
			}

			final public Type getType() {
				return Type.DONE;
			}

			final public T getValue() {
				return value;
			}
		}

		final static class Error extends State {
			final private Exception error;

			public Error(Exception error) {
				this.error = error;
			}

			final public Exception getError() {
				return error;
			}

			final public Type getType() {
				return Type.ERROR;
			}
		}

		static enum Type {
			DONE, ERROR, WAITING
		}

		final static class Waiting extends State {
			final static private State instance = new Waiting();

			final public static State getInstance() {
				return instance;
			}

			final public Type getType() {
				return Type.WAITING;
			}
		}

		abstract public Type getType();
	}

	/** Represents the status of an executing task */
	final static class Status<T> {
		final private AtomicReference<State> state;

		public Status(AtomicReference<State> state) {
			this.state = state;
		}

		public Exception getError() {
			if (isError()) {
				return ((State.Error) getState()).getError();
			} else {
				return null;
			}
		}
		
		public String getErrorMessage() {
			return getError().getMessage();
		}

		public State getState() {
			return state.get();
		}

		@SuppressWarnings("unchecked")
		public T getValue() {
			if (isDone() && !isError()) {
				return ((State.Done<T>) getState()).getValue();
			} else {
				return null;
			}
		}

		public boolean isDone() {
			switch (getState().getType()) {
			case DONE:
			case ERROR:
				return true;
			case WAITING:
			default:
				return false;
			}
		}

		public boolean isError() {
			switch (getState().getType()) {
			case ERROR:
				return true;
			case DONE:
			case WAITING:
			default:
				return false;
			}
		}
	}

	final private Definition<T> def;

	/** Constructs a new task from a given definition */
	public Task(Definition<T> def) {
		this.def = def;
	}

	/** Starts executing the task with a given executor */
	public Status<T> start(final Executor executor) {
		final AtomicReference<State> state = new AtomicReference<State>(
				State.Waiting.getInstance());
		executor.execute(new Runnable() {
			public void run() {
				try {
					def.run(new Environment<T>() {
						public void done(T value) {
							state.set(new State.Done<T>(value));
						}

						public void error(Exception e) {
							state.set(new State.Error(e));
						}

						public Executor getExecutor() {
							return executor;
						}
					});
				} catch (final Exception e) {
					state.set(new State.Error(e));
				}
			}
		});
		return new Status<T>(state);
	}
}
