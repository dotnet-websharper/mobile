package com.intellifactory.android;

import java.io.IOException;
import java.util.UUID;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;

final class BluetoothSocketClient {

	public static Task<BluetoothAsyncSocket> connect(
			final BluetoothDevice device, final String uuid) {
		return new Task<BluetoothAsyncSocket>(
				new Task.Definition<BluetoothAsyncSocket>() {
					public void run(Task.Environment<BluetoothAsyncSocket> task) {
						try {
							UUID token = UUID.fromString(uuid);
							BluetoothSocket socket = device
									.createRfcommSocketToServiceRecord(token);
							socket.connect();
							BluetoothAsyncSocket job = new BluetoothAsyncSocket(
									socket);
							task.getExecutor().execute(job);
							task.done(job);
						} catch (IOException io) {
							task.error(io);
						} catch (Exception e) {
							task.error(e);
						}
					}
				});
	}
}
