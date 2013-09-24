// WebSharper.Mobile - support for building mobile WebSharper apps
// Copyright (c) 2013 IntelliFactory
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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
									socket, task);
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
