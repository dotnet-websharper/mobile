package com.intellifactory.android;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.Executor;
import java.util.concurrent.atomic.AtomicBoolean;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import android.util.Log;

/** Implements running an async BT socket server */
final class BluetoothSocketServer {

	/** Implements the service */
	public static interface Acceptor {

		/** Called when a new client connects */
		public void accept(BluetoothAsyncSocket socket);
	}

	final private static String TAG = "BluetoothSocketServer";
	final private Acceptor acceptor;
	final private BluetoothAdapter adapter;
	final private String name;
	final private UUID uuid;
	final private AtomicBoolean isRunning = new AtomicBoolean(false);

	private BluetoothSocketServer(Acceptor acceptor, BluetoothAdapter adapter,
			String name, String uuid) {
		this.acceptor = acceptor;
		this.adapter = adapter;
		this.name = name;
		this.uuid = UUID.fromString(uuid);
	}

	/** Creates and starts a new server */
	final public static BluetoothSocketServer start(Acceptor acceptor,
			BluetoothAdapter adapter, Executor executor, String name,
			String uuid) {
		final BluetoothSocketServer job = new BluetoothSocketServer(acceptor,
				adapter, name, uuid);
		job.start(executor);
		return job;
	}

	/** Tests if the server is running */
	final public boolean isRunning() {
		return isRunning.get();
	}

	/** Stops the server gracefully */
	final public void stop() {
		isRunning.set(false);
	}

	/** Starts the server using the given executor */
	final private void start(final Executor executor) {
		isRunning.set(true);
		executor.execute(new Runnable() {
			public void run() {
				try {
					while (isRunning.get()) {
						try {
							BluetoothServerSocket socket = adapter
									.listenUsingRfcommWithServiceRecord(name,
											uuid);
							BluetoothSocket client = socket.accept();
							BluetoothAsyncSocket job = new BluetoothAsyncSocket(client,null);
							executor.execute(job);
							acceptor.accept(job);
						} catch (IOException io) {
							Log.e(TAG, "IOException", io);
						}
					}
				} finally {
					isRunning.set(false);
				}
			}
		});
	}

}
