package com.intellifactory.android;

import android.app.Activity;
import android.webkit.WebView;

/**
 * Represents the AndroidWebSharperReceiver JavaScript object extensions
 * used for sending Bluetooth-related messages to WebSharper.
 */
final class BluetoothReceiver {
	
	final private Activity act;
	final private WebView browser;
	
	public BluetoothReceiver(final Activity activity, final WebView web) {
		act = activity;
		browser = web;
	}

	/**
	 * Finishes a write operation.
	 */
	final public void onWrite(final int uid) {
		onAsync(new JsonMessage().with("uid", uid));
	}
	
	/**
	 * Finishes a read operation.
	 */
	final public void onRead(final int uid, final String data) {
		onAsync(new JsonMessage().with("uid", uid).with("data", data));
	}
	
	/**
	 * Finishes enabling Bluetooth.
	 */
	final public void onEnabled(final int uid) {
		onAsync(new JsonMessage().with("uid", uid));
	}

	/**
	 * Finishes making the device discoverable.
	 */
	final public void onMadeDiscoverable(final int uid) {
		onAsync(new JsonMessage().with("uid", uid));
	}

	/**
	 * Called on every new device discovery event.
	 */
	final public void onDiscover(final int deviceId) {
		call("onDiscover", new JsonMessage().with("device", deviceId));
	}
	
	/**
	 * Called on every server accept event.
	 */
	final public void onAccept(final int server, final int socket, final int device) {		
		call("onAccept", new JsonMessage().with("server", server).with("socket", socket).with("device", device));
	}
	
	/**
	 * Finishes connecting to a remote device.
	 */
	final public void onConnected(final int uid, final int socket) {
		onAsync(new JsonMessage().with("uid", uid).with("socket", socket));
	}

	/**
	 * Notify about an asynchronous failure.
	 */
	final public void onAsyncError(final int uid, final String error) {
		onAsync(new JsonMessage().with("uid", uid).with("error", error));
	}
	
	final private void call(final String methodName, final JsonMessage body) {
		final String msg = "javascript:AndroidWebSharperReceiver." + methodName + "(" + body + ");";
		act.runOnUiThread(new Runnable() {
			public void run() {
				browser.loadUrl(msg);				
			}
		});
	}

	final private void onAsync(final JsonMessage body) {
		call("onAsync", body);
	}
}
