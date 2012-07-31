package com.intellifactory.android;

import java.util.Hashtable;

import android.app.Activity;
import android.content.Intent;

import com.intellifactory.android.Task.Environment;

/**
 * Wraps Activity with the ability to easily start sub-activities and execute
 * actions when those complete.
 */
public class AsyncActivity extends Activity {

	/** Implements a continuation of an activity */
	static public interface Continuation {

		/** Called when an activity finishes executing */
		public void onActivityResult(final int response, final Intent intent);
	}

	private int uid = 1;
	final private Hashtable<Integer, Continuation> continuations = new Hashtable<Integer, Continuation>();

	/** Starts an activity and executes a given continuation when done */
	final public void startActivity(final Intent intent, final Continuation k) {
		final int id = uid++;
		final Integer key = Integer.valueOf(id);
		continuations.put(key, k);
		startActivityForResult(intent, id);
	}

	/** Returns a task that starts a given activity */
	final public Task<Void> startActivityTask(final Intent intent) {
		return new Task<Void>(new Task.Definition<Void>() {
			public void run(final Environment<Void> env) {
				startActivity(intent, new Continuation() {
					public void onActivityResult(final int response,
							final Intent intent) {
						if (response == Activity.RESULT_OK) {
							env.done(null);
						} else {
							env.error(new Exception("Bad activity result code"));
						}
					}
				});
			}
		});
	}

	/** Overrides onActivityResult to provide asynchronous activity handling */
	@Override
	final public void onActivityResult(int request, int response, Intent intent) {
		final Integer key = Integer.valueOf(request);
		final Continuation k = continuations.get(key);
		continuations.remove(key);
		k.onActivityResult(response, intent);
	}
}
