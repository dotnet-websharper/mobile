package com.intellifactory.android;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.webkit.WebView;
import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

/**
 * Implements a stub object available in WebSharper as AndroidWebSharperBluetoothBridge.
 */
final class BluetoothBridge {
	
	final private static String TAG = "BluetoothBridge";

	final private AsyncActivity activity;
	final private BluetoothAdapter adapter;
	final private BluetoothSocketManager bsm;
	final private BluetoothReceiver receiver;	

	final private RegistryTable<BluetoothDevice> devices = new RegistryTable<BluetoothDevice>();	
	final private RegistryTable<BluetoothSocketManager.Server> servers = new RegistryTable<BluetoothSocketManager.Server>();
	final private RegistryTable<BluetoothSocketManager.Socket> sockets = new RegistryTable<BluetoothSocketManager.Socket>();
	
	final private Responder responder = new Responder();
	private boolean deviceReceiverRegistered = false;
	
	public BluetoothBridge(	final BluetoothAdapter btAdapter,
							final AsyncActivity asyncActivity,
							final WebView webkit) {		
		receiver = new BluetoothReceiver(asyncActivity, webkit);
		activity = asyncActivity;
		adapter = btAdapter;
		bsm = new BluetoothSocketManager(btAdapter, new BluetoothSocketManager.Synchronizer() {
			final public void schedule(final Runnable action) {
				activity.runOnUiThread(action);
			}
		});
	}	

	/**
	 * Connects to a device defined by devideId and returns the socketId.
	 * Returns the status asynchronously.
	 */
	final public void connectToDevice(final int deviceId, final String uuid, final int uid) {
		try {
			bsm.connect(uuid, uid, devices.get(deviceId), responder, responder);
		} catch (final WebSharperException e) {
			Log.e(TAG, "Failure in connectToDevice", e);
			receiver.onAsyncError(uid, e.getMessage());
		}
	}

	/**
	 * Starts a server with a given name and returns the serverId.
	 */
	final public int makeServer(final String name, final String uuid) {
		return new Acceptor(name, uuid).getServerId();
	}
	
	/**
	 * Utility class used in makeServer.
	 */
	final private class Acceptor implements BluetoothSocketManager.Acceptor {
		final int serverId;
		public Acceptor(final String name, final String uuid) {			
			serverId = servers.add(bsm.listen(uuid, name, this));
		}
		final int getServerId() {
			return serverId;
		}
		final public BluetoothSocketManager.SocketListener accept(BluetoothSocketManager.Socket socket) {
			receiver.onAccept(serverId, sockets.add(socket), devices.add(socket.getDevice()));
			return responder;
		}
	}
		
	/**
	 * Starts a server by a given ID.
	 */
	final public void startServer(final int serverId) {
		try {
			servers.get(serverId).start();
		} catch (WebSharperException e) {
			Log.e(TAG, "Failure in startServer", e);
		}
	}
	
	/**
	 * Stops and removes the server with a given serverId.
	 */
	final public void disposeServer(final int serverId) {
		try {
			servers.get(serverId).stop();
			servers.remove(serverId);
		} catch (WebSharperException e) {
			Log.e(TAG, "Failure in stopServer", e);
		}		
	}

	/**
	 * Returns devices bonded/paired to the local adapter.
	 */
	final public int getBondedDeviceCount() {
		Log.e("BluetoothBridge", "Running getBondedDeviceCount");
		return adapter.getBondedDevices().size();
	}

	/**
	 * Returns devices bonded/paired to the local adapter.
	 */
	final public void getBondedDevices(final int uid) {
		activity.runOnUiThread(new Runnable() {
			final public void run() {
				Log.e("BluetoothBridge", "Running getBondedDevices");				
				final Set<BluetoothDevice> deviceSet = adapter.getBondedDevices();	
				final int[] result = new int[deviceSet.size()];
				final Iterator<BluetoothDevice> it = deviceSet.iterator();
				int i = 0;
				while (it.hasNext()) {
					final BluetoothDevice d = it.next();
					result[i] = devices.add(d);
					i++;
				}
				Log.e("BluetoothBridge", "Bonded device count: " + deviceSet.size());
				Log.e("BluetoothBridge", "Bonded device IDs: " + result);
				receiver.onGotBoundedDevices(uid, result);
			}
		});		
	}
	
	/**
	 * Tests if device discovery is in progress.
	 */
	final public boolean isDiscovering() {
		return adapter.isDiscovering();
	}

	/**
	 * Attempts to cancel device discovery. 
	 */
	final public boolean cancelDiscovery() {
		if (deviceReceiverRegistered) {
			deviceReceiverRegistered = false;
			activity.unregisterReceiver(responder);			
		}
		return adapter.cancelDiscovery();
	}

	/**
	 * Attempts to start device discovery.
	 */
	final public boolean startDiscovery() {
		if (!deviceReceiverRegistered) {
			deviceReceiverRegistered = true;
			activity.registerReceiver(responder, new IntentFilter(BluetoothDevice.ACTION_FOUND));
		}
		return adapter.startDiscovery();		

	}
	
	/**
	 * Tests if the device can be discovered.
	 */
	final public boolean isDiscoverable() {
		return adapter.getScanMode() == BluetoothAdapter.SCAN_MODE_CONNECTABLE_DISCOVERABLE;
	}
	
	/**
	 * Requests the user to allow the discovery of the current device.
	 * Returns status code asynchronously.
	 */
	final public void makeDiscoverable(final int seconds, final int uid)
	{
		Intent intent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
		intent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, seconds);
		activity.startActivity(intent, new AsyncActivity.Continuation() {
			final public void onActivityResult(int response, Intent intent) {
				receiver.onMadeDiscoverable(uid);
			}
		});
	}

	/**
	 * Requests the user to enable the adapter. Sends back a status result message asynchronously.
	 */
	final public void enable(final int uid) {
		activity.startActivity(new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE), new AsyncActivity.Continuation() {
			final public void onActivityResult(int response, Intent intent) {
				receiver.onEnabled(uid);
			}
		});		
	}

	/**
	 * Checks if the adapter is currently enabled.
	 */
	final public boolean isEnabled() {
		return adapter.isEnabled();
	}	

		
	/**
	 * Gets the address of a device.
	 */
	final public String deviceAddress(final int deviceId) {
		try {
			return devices.get(deviceId).getAddress();
		} catch (WebSharperException e) {
			Log.e(TAG, "Exception in getDeviceAddres", e);
			return null;
		}		
	}

	/**
	 * Gets the name of a device.
	 */
	final public String deviceName(final int deviceId) {
		try {
			return devices.get(deviceId).getName();
		} catch (WebSharperException e) {
			Log.e(TAG, "Exception in getDeviceName", e);
			return null;
		}
	}

	/**
	 * Removes a reference to a device from the pool to free memory.
	 */
	final public void disposeDevice(final int deviceId) {
		devices.remove(deviceId);
	}
			
	/**
	 * Schedules a read operation with a given unique id on a socket defined by socketId.
	 */
	final public void socketRead(final int socketId, final int uid) {
		try {
			sockets.get(socketId).read(uid);
		} catch (WebSharperException e) {
			Log.e(TAG, "Failure in readFromSocket", e);
			receiver.onAsyncError(uid, e.getMessage());
		}
	}
	
	/**
	 * Schedules a write operation with a given unique id on a socket defined by socketId.
	 * Data string is binary data where signed bytes are mapped to characters in the (0-255) range
	 * using two's complement.
	 */
	final public void writeToSocket(final int socketId, final int uid,final String data) {
		try {
			sockets.get(socketId).write(uid, data);
		} catch (WebSharperException e) {
			Log.e(TAG, "Failure in writeToSocket", e);			
			receiver.onAsyncError(uid, e.getMessage());
		}
	}

	/**
	 * Schedules a close operation on a socket defined by socketId and forgets the reference to the socket.
	 */
	final public void disposeSocket(final int socketId) {
		try {
			sockets.get(socketId).close();
			sockets.remove(socketId);
		} catch (WebSharperException e) {
			Log.e(TAG, "Failure in closeSocket", e);
		}
	}
	
	/**
	 * Implements various callback interfaces.
	 */
	final private class Responder
		extends BroadcastReceiver
		implements
			BluetoothSocketManager.ConnectionHandler,
			BluetoothSocketManager.SocketListener {
	
		@Override
		final public void onReceive(Context ctx, Intent intent) {
			final BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
			receiver.onDiscover(devices.add(device));
		}		

		final public void onConnectionError(final int uid, final IOException io) {
			Log.e(TAG, "Error while connecting to device", io);
			receiver.onAsyncError(uid, io.getMessage());
		}
		
		final public void onConnected(final int uid, final BluetoothSocketManager.Socket socket) {
			receiver.onConnected(uid, sockets.add(socket));			
		}

		final public void onReadCompleted(final int uid, final String data) {
			receiver.onRead(uid, data);
		}
		
		final public void onWriteCompleted(final int uid) {
			receiver.onWrite(uid);
		}		
	}
}
