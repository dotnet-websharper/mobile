package com.intellifactory.android;

import android.webkit.WebView;

/**
 * Represents the AndroidWebSharperReceiver JavaScript object used 
 * for sending messages to WebSharper.
 */
final class WebSharperReceiver {
	
	final private WebView browser;
	
	public WebSharperReceiver(final WebView web) {
		browser = web;
	}

	/**
	 * Notify about an asynchronous failure.
	 */
	final public void onAsyncError(final int uid, final String error) {
		onAsync(new JsonMessage().with("uid", uid).with("error", error));
	}

	/**
	 * Finish taking a picture. 
	 */
	final public void onPictureTaken(final int uid, final String jpeg) {
		onAsync(new JsonMessage().with("uid", uid).with("jpeg", jpeg));
	}

	/**
	 * Notify about acceleration change.
	 */
	final public void onAccelerationChange(final double x, final double y, final double z) {
		call("onAccelerationChange", new JsonMessage().with("x", x).with("y", y).with("z", z));
	}	
	
	/**
	 * Finish determining the geographic location.
	 */
	final public void onGeoLocation(final int uid, final double lat, final double lng) {
		onAsync(new JsonMessage().with("uid", uid).with("lat", lat).with("lng", lng));
	}

	final private void call(final String methodName, final JsonMessage body) {
		browser.loadUrl("javascript:AndroidWebSharperReceiver." + methodName + "(" + body + ");");
	}

	final private void onAsync(final JsonMessage body) {
		call("onAsync", body);
	}
}
