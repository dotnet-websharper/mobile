package com.intellifactory.android;

/** A union type that represents messages sent to a BT socket. */
abstract class BluetoothSocketMessage {

	abstract public Type getType();

	static enum Type {
		CLOSE, READ, WRITE
	}

	final static class Close extends BluetoothSocketMessage {
		final public Type getType() {
			return Type.CLOSE;
		}
	}

	final static class Read extends BluetoothSocketMessage {
		final private Callback<String> cont;

		public Read(Callback<String> cont) {
			this.cont = cont;
		}

		final public void doneReading(String data) {
			cont.call(data);
		}

		final public Type getType() {
			return Type.READ;
		}
	}

	final static class Write extends BluetoothSocketMessage {
		final private Callback<Void> cont;
		final private String data;

		public Write(String data, Callback<Void> cont) {
			this.cont = cont;
			this.data = data;
		}

		final public String getData() {
			return data;
		}

		final public void doneWriting() {
			cont.call(null);
		}

		final public BluetoothSocketMessage.Type getType() {
			return BluetoothSocketMessage.Type.WRITE;
		}
	}

}
