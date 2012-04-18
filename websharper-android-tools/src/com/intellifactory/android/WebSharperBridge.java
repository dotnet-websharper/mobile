package com.intellifactory.android;

import android.content.Context;
import android.hardware.Camera;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.view.SurfaceView;
import android.view.View;
import android.webkit.WebView;
import android.widget.Toast;
import android.util.Log;
import java.io.IOException;
import java.util.List;

/**
 * Implements a stub object available in WebSharper as AndroidWebSharperBridge.
 */
final class WebSharperBridge {

	final private WebSharperReceiver receiver;
	final private AsyncActivity activity;
	final private WebView web;	
	final private static String TAG = "WebSharperBridge";	
	final private Responder responder = new Responder();
	private boolean accelerationEnabled;
		
	public WebSharperBridge(final AsyncActivity asyncActivity, final WebView webView) {
		activity = asyncActivity;
		web = webView;
		accelerationEnabled = subscribeToAccelerationUpdates();
		receiver = new WebSharperReceiver(web);
	}
	
	/**
	 * Finishes the current activity.
	 */
	final public void finish() {
		activity.finish();
	}
	
	/**
	 * Tests if a camera can be acquired.
	 */
	final public boolean hasCamera() {
		try {
			return Camera.open() != null;
		} catch (Exception e) {
			Log.e(TAG, "Failed opening the camera", e);
			return false;
		}
	}
	
	/**
	 * Uses the camera to take a photo and send to JavaScript asynchronously.
	 */
	final public void takePicture(final int uid, final int width, final int height) {
		if (hasCamera()) {
			final Camera cmr = Camera.open();
			final Camera.Parameters params = cmr.getParameters();
			params.setPictureSize(width, height);
			final SurfaceView sv = new SurfaceView(activity);
			sv.setOnLongClickListener(new View.OnLongClickListener() {
				public boolean onLongClick(final View v) {
					cmr.takePicture(null, null, new Camera.PictureCallback() {
						public void onPictureTaken(final byte[] data, final Camera camera) {
							receiver.onPictureTaken(uid, ExtendedAsciiEncoding.getString(data));
							camera.release();
							activity.setContentView(web);
						}					
					});
					return false;
				}
			});			
			sv.setClickable(true);
			try {
				cmr.setPreviewDisplay(sv.getHolder());
				activity.setContentView(sv);
				cmr.startPreview();
				final Toast toast = Toast.makeText(activity, "Long-click the screen to take photo.", Toast.LENGTH_SHORT);
				toast.show();
			} catch (IOException e) {
				Log.e(TAG, "Failure in takePicture", e);
				asyncError(uid, e.getMessage());
			}
		} else {
			asyncError(uid, "No camera found");
		}
	}
	
	/**
	 * Attempts to subscribe to the accelerometer.
	 */
	final private boolean subscribeToAccelerationUpdates() {		
		final SensorManager sm = (SensorManager) activity.getSystemService(Context.SENSOR_SERVICE);
		if (sm == null) {
			return false;
		} else {
			final List<Sensor> sensors = sm.getSensorList(Sensor.TYPE_ACCELEROMETER);
			if (sensors.size() > 0) {
				final Sensor sensor = sensors.get(0);
				sm.registerListener(responder, sensor, SensorManager.SENSOR_DELAY_UI);
				return true;
			} else {
				return false;
			}
		}
	}

	/**
	 * Tests if acceleration tracking is enabled.
	 */
	final public boolean accelerometerStarted() {
		return accelerationEnabled;
	}
	
	/**
	 * Turns accelerometer tracking on.
	 */
	final public void accelerometerStart() {
		if (!accelerationEnabled) {
			accelerationEnabled = subscribeToAccelerationUpdates();
		}
	}
	
	/**
	 * Turns accelerometer tracking off.
	 */
	final public void accelerometerStop() {
		if (accelerationEnabled) {				
			final SensorManager sm = (SensorManager) activity.getSystemService(Context.SENSOR_SERVICE);
			sm.unregisterListener(responder);
		}
	}

	/**
	 * Notifies WebSharper of an asynchronous failure. 
	 */
	final private void asyncError(final int uid, final String message) {		
		Log.e(TAG, message);
		receiver.onAsyncError(uid, message);
	}

	/**
	 * Implements sensor callback interfaces.
	 */
	final private class Responder implements SensorEventListener {		
		final public void onSensorChanged(final SensorEvent event) {
			receiver.onAccelerationChange(event.values[0], event.values[1], event.values[2]);	
		}
		final public void onAccuracyChanged(final Sensor sensor, final int arg) {}
	}
}
