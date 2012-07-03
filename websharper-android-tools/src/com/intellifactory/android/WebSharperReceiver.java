package com.intellifactory.android;

// import android.util.Log;
import android.app.Activity;
import android.webkit.WebView;

/**
 * Represents the AndroidWebSharperReceiver JavaScript object used 
 * for sending messages to WebSharper.
 */
final class WebSharperReceiver {
	
	final private Activity act;
	final private WebView browser;
	
	public WebSharperReceiver(final Activity activity, final WebView web) {
		act = activity;
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
		final String message = "javascript:AndroidWebSharperReceiver." + methodName + "(" + body + ");";
		// Log.d("WebSharperReceiver", message);
		act.runOnUiThread(new Runnable() {
			public void run() {
				browser.loadUrl(message);
			}
		});
	}

	final private void onAsync(final JsonMessage body) {
		call("onAsync", body);				
	}
}
