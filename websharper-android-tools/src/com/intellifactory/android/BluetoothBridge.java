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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Executor;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

/**
 * Implements a stub object available in WebSharper as
 * AndroidWebSharperBluetoothBridge.
 */
final class BluetoothBridge {

	final private AsyncActivity activity;
	final private BluetoothAdapter adapter;
	final private ConcurrentLinkedQueue<BluetoothDevice> deviceQueue = new ConcurrentLinkedQueue<BluetoothDevice>();
	final private Executor executor;

	public BluetoothBridge(AsyncActivity activity, BluetoothAdapter adapter,
			Executor executor) {
		this.activity = activity;
		this.adapter = adapter;
		this.executor = executor;
	}
		
	/** Attempts to cancel device discovery. */
	final public boolean cancelDiscovery() {
		return adapter.cancelDiscovery();
	}

	/** Connects to a remote device */
	final public Task.Status<BluetoothAsyncSocket> connectToDevice(
			BluetoothDevice device, String uuid) {
		return BluetoothSocketClient.connect(device, uuid).start(executor);
	}
	
	final static class Server {
		final private ConcurrentLinkedQueue<BluetoothAsyncSocket> clients;
		final private BluetoothSocketServer server;

		public Server(ConcurrentLinkedQueue<BluetoothAsyncSocket> clients,
				BluetoothSocketServer server) {
			this.clients = clients;
			this.server = server;
		}

		public List<BluetoothAsyncSocket> getClients() {
			ArrayList<BluetoothAsyncSocket> r = new ArrayList<BluetoothAsyncSocket>();
			while (true) {
				BluetoothAsyncSocket socket = clients.remove();
				if (socket == null) {
					return r;
				} else {
					r.add(socket);
				}
			}
		}

		public boolean isRunning() {
			return server.isRunning();
		}

		public void stop() {
			server.stop();
		}
	}
	
	/** Starts a server */
	final public Server createServer(String name, String uuid) {
		final ConcurrentLinkedQueue<BluetoothAsyncSocket> clients = new ConcurrentLinkedQueue<BluetoothAsyncSocket>();
		return new Server(clients, BluetoothSocketServer.start(
				new BluetoothSocketServer.Acceptor() {
					public void accept(BluetoothAsyncSocket job) {
						clients.add(job);
					}
				}, adapter, executor, name, uuid));
	}

	/** Requests the user to enable the adapter */
	final public Task.Status<Void> enable() {
		return activity.startActivityTask(
				new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)).start(
				executor);
	}
	
	/** Returns devices bonded/paired to the local adapter */
	final public List<BluetoothDevice> getBondedDevices() {
		return new ArrayList<BluetoothDevice>(adapter.getBondedDevices());
	}

	/** Gets discovered devices */
	final public List<BluetoothDevice> getDiscoveredDevices() {
		final Set<BluetoothDevice> deviceSet = new HashSet<BluetoothDevice>();
		while (true) {
			BluetoothDevice d = deviceQueue.poll();
			if (d == null) {
				return new ArrayList<BluetoothDevice>(deviceSet);
			} else {
				deviceSet.add(d);
			}
		}
	}

	/** Tests if the device can be discovered */
	final public boolean isDiscoverable() {
		return adapter.getScanMode() == BluetoothAdapter.SCAN_MODE_CONNECTABLE_DISCOVERABLE;
	}

	/** Tests if device discovery is in progress */
	final public boolean isDiscovering() {
		return adapter.isDiscovering();
	}

	/** Checks if the adapter is currently enabled */
	final public boolean isEnabled() {
		return adapter.isEnabled();
	}

	/** Requests the user to allow the discovery of the current device */
	final public Task.Status<Void> makeDiscoverable(final int seconds) {
		Intent intent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
		intent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, seconds);
		return activity.startActivityTask(intent).start(executor);
	}

	/** Schedules a read operation with a given socket */
	final public Task.Status<String> socketRead(BluetoothAsyncSocket socket) {
		return socket.read().start(executor);
	}

	/** Schedules a write on a socket */
	final public Task.Status<Void> socketWrite(BluetoothAsyncSocket socket,
			String data) {
		return socket.write(data).start(executor);
	}

	/** Attempts to start device discovery */
	final public boolean startDiscovery() {
		final BroadcastReceiver onFound = new BroadcastReceiver() {
			@Override
			public void onReceive(Context context, Intent intent) {
				String action = intent.getAction();
				if (BluetoothDevice.ACTION_FOUND.equals(action)) {
					BluetoothDevice device = intent
							.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
					deviceQueue.add(device);
				}
			}
		};
		final BroadcastReceiver onFinished = new BroadcastReceiver() {
			@Override
			public void onReceive(Context context, Intent intent) {
				if (intent.getAction().equals(
						BluetoothAdapter.ACTION_DISCOVERY_FINISHED)) {
					activity.unregisterReceiver(onFound);
					activity.unregisterReceiver(this);
				}
			}
		};
		activity.registerReceiver(onFound, new IntentFilter(
				BluetoothDevice.ACTION_FOUND));
		activity.registerReceiver(onFinished, new IntentFilter(
				BluetoothAdapter.ACTION_DISCOVERY_FINISHED));
		if (adapter.startDiscovery()) {
			return true;
		} else {
			activity.unregisterReceiver(onFound);
			activity.unregisterReceiver(onFinished);
			return false;
		}
	}
}
