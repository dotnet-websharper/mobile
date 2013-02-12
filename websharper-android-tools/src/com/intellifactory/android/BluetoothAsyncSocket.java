package com.intellifactory.android;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.LinkedBlockingQueue;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.util.Base64;
import android.util.Log;

/** Wraps a BT socket to provide async operations */
final class BluetoothAsyncSocket implements Runnable {

	final private static String TAG = "BluetoothAsyncSocket";
	final private LinkedBlockingQueue<BluetoothSocketMessage> queue;
	final private BluetoothSocket socket;
	final private Task.Environment<BluetoothAsyncSocket> task;

	final private Task<String> readTask = new Task<String>(
			new Task.Definition<String>() {
				public void run(final Task.Environment<String> env) {
					queue.add(new BluetoothSocketMessage.Read(
							new Callback<String>() {
								public void call(String data) {
									env.done(data);
								}
							}));
				}
			});

	/** Wraps a BT socket */
	public BluetoothAsyncSocket(final BluetoothSocket socket, Task.Environment<BluetoothAsyncSocket> task) {
		this.task = task;
		this.socket = socket;
		this.queue = new LinkedBlockingQueue<BluetoothSocketMessage>();
	}

	/** Schedules closing the socket */
	final public void close() {
		queue.add(new BluetoothSocketMessage.Close());
	}
	
	/** Exposes the connected device */
	final public BluetoothDevice getRemoteDevice() {
		return socket.getRemoteDevice();
	}

	/** Reads from the socket asynchronously */
	final public Task<String> read() {
		return readTask;
	}

	/** Writes to the socket asynchronously */
	final public Task<Void> write(final String data) {
		return new Task<Void>(new Task.Definition<Void>() {
			public void run(final Task.Environment<Void> env) {
				queue.add(new BluetoothSocketMessage.Write(data,
						new Callback<Void>() {
							public void call(Void data) {
								env.done(data);
							}
						}));
			}
		});
	}

	/** Executes the interaction with the socket */
	final public void run() {
		try {
			final InputStream input = socket.getInputStream();
			final OutputStream output = socket.getOutputStream();
			final byte[] buffer = new byte[8 * 1024];
			LOOP: while (true) {
				final BluetoothSocketMessage msg = queue.take();
				switch (msg.getType()) {
				case CLOSE:
					break LOOP;
				case READ:
					final BluetoothSocketMessage.Read mR = (BluetoothSocketMessage.Read) msg;
					final int n = input.read(buffer);
					final String data = n > 0 ? Base64.encodeToString(buffer, 0, n, Base64.NO_WRAP) : "";
					mR.doneReading(data);
					continue LOOP;
				case WRITE:
					final BluetoothSocketMessage.Write mW = (BluetoothSocketMessage.Write) msg;
					byte [] b = Base64.decode(mW.getData(), Base64.NO_WRAP);
					output.write(b);
					mW.doneWriting();
					continue LOOP;
				}
			}
		} catch (InterruptedException ie) {
			if (task != null)
				task.error(ie);
			Log.e(TAG, "Socket-handling thread interrupted", ie);
		} catch (IOException io) {
			if (task != null)
				task.error(io);
			Log.e(TAG, "IO error while handling a socket", io);
		} finally {
			try {
				socket.close();
			} catch (IOException io) {
				Log.e(TAG, "Could not close the connection", io);
			}
		}
	}
}
