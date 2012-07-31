package com.intellifactory.android;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.Executor;

import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;
import android.webkit.WebView;
import android.widget.Toast;

import com.intellifactory.android.Task.Environment;

/** Implements a stub object available in WebSharper as AndroidWebSharperBridge. */
final class WebSharperBridge {

	/** Implements sensor callback interfaces */
	final private class Responder implements SensorEventListener {
		final public void onAccuracyChanged(final Sensor sensor, final int arg) {
		}

		final public void onSensorChanged(final SensorEvent event) {
			accelerationX = event.values[0];
			accelerationY = event.values[1];
			accelerationZ = event.values[2];
		}
	}

	final class Acceleration {
		final private double x;
		final private double y;
		final private double z;

		public Acceleration(double x, double y, double z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}

		public double x() {
			return x;
		}

		public double y() {
			return y;
		}

		public double z() {
			return z;
		}
	}

	final private static String TAG = "WebSharperBridge";
	private boolean accelerationEnabled = false;
	private double accelerationX = 0.0;
	private double accelerationY = 0.0;
	private double accelerationZ = 0.0;
	final private AsyncActivity activity;
	final private Executor executor;
	final private Responder responder = new Responder();
	final private WebView web;

	public WebSharperBridge(AsyncActivity activity, WebView web,
			Executor executor) {
		this.activity = activity;
		this.executor = executor;
		this.web = web;
	}

	/** Turns accelerometer tracking on */
	final public void accelerometerStart() {
		if (!accelerationEnabled) {
			accelerationEnabled = subscribeToAccelerationUpdates();
		}
	}

	/** Tests if acceleration tracking is enabled */
	final public boolean accelerometerStarted() {
		return accelerationEnabled;
	}

	/** Turns accelerometer tracking off */
	final public void accelerometerStop() {
		if (accelerationEnabled) {
			final SensorManager sm = (SensorManager) activity
					.getSystemService(Context.SENSOR_SERVICE);
			sm.unregisterListener(responder);
		}
	}
	
	/** Tests if location manager is present */
	final public boolean canLocate() {
		return activity.getSystemService(Context.LOCATION_SERVICE) != null;		
	}
	
	/** Returns the latest recorded acceleration */
	final public Acceleration getAcceleration() {
		return new Acceleration(accelerationX, accelerationY, accelerationZ);
	}

	final private Task<Location> getLocationTask = new Task<Location>(
			new Task.Definition<Location>() {
				public void run(final Environment<Location> env) {
					final LocationManager lM = (LocationManager) activity
							.getSystemService(Context.LOCATION_SERVICE);
					if (lM == null) {
						env.error(new Exception(
								"No geographical location service"));
					} else {
						final Criteria criteria = new Criteria();
						criteria.setAccuracy(Criteria.ACCURACY_FINE);
						final String provider = lM.getBestProvider(criteria,
								true);
						if (provider == null) {
							env.error(new Exception(
									"No geographical location service provider"));
						} else {
							lM.requestLocationUpdates(provider, 0, 0,
									new LocationListener() {
										final public void onStatusChanged(
												final String provider,
												final int status,
												final Bundle extras) {
										}

										final public void onProviderEnabled(
												final String provider) {
										}

										final public void onProviderDisabled(
												final String provider) {
										}

										final public void onLocationChanged(
												final Location location) {
											lM.removeUpdates(this);
											if (location == null) {
												env.error(new Exception(
														"Failed to determine location"));
											} else {
												env.done(location);
											}
										}
									});
						}
					}
				}
			});

	/** Determines current geo location */
	final public Task.Status<Location> getLocation() {
		return getLocationTask.start(executor);
	}
	
	/** Finishes the current activity */
	final public void finish() {
		activity.finish();
	}

	/** Tests if a camera can be acquired */
	final public boolean hasCamera() {
		return activity.getPackageManager().hasSystemFeature(
				PackageManager.FEATURE_CAMERA);
	}

	/** Attempts to subscribe to the accelerometer */
	final private boolean subscribeToAccelerationUpdates() {
		final SensorManager sm = (SensorManager) activity
				.getSystemService(Context.SENSOR_SERVICE);
		if (sm == null) {
			return false;
		} else {
			final List<Sensor> sensors = sm
					.getSensorList(Sensor.TYPE_ACCELEROMETER);
			if (sensors.size() > 0) {
				final Sensor sensor = sensors.get(0);
				sm.registerListener(responder, sensor,
						SensorManager.SENSOR_DELAY_UI);
				return true;
			} else {
				return false;
			}
		}
	}

	/** Uses the camera to take a photo and send to JavaScript */
	final public Task.Status<String> takePicture() {
		return new Task<String>(new Task.Definition<String>() {
			public void run(final Environment<String> env) {
				activity.runOnUiThread(new Runnable() {
					public void run() {
						if (hasCamera()) {
							final Camera cmr = Camera.open();
							if (cmr == null) {
								env.error(new Exception("No camera found"));
							} else {
								final SurfaceView sv = new SurfaceView(activity);
								sv.setOnLongClickListener(new View.OnLongClickListener() {
									public boolean onLongClick(final View v) {
										cmr.takePicture(null, null,
												new Camera.PictureCallback() {
													public void onPictureTaken(
															final byte[] data,
															final Camera camera) {
														env.done(ExtendedAsciiEncoding
																.getString(data));
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
									final Toast toast = Toast
											.makeText(
													activity,
													"Long-click the screen to take photo.",
													Toast.LENGTH_SHORT);
									toast.show();
								} catch (IOException e) {
									Log.e(TAG, "Failure in takePicture", e);
									env.error(e);
								}
							}
						} else {
							env.error(new Exception("No camera found"));
						}

					}
				});
			}
		}).start(executor);
	}

	/** Traces to the Android system log */
	final public void trace(final String priority, final String category,
			final String message) {
		if (priority.equalsIgnoreCase("debug")) {
			Log.d(category, message);
		} else if (priority.equalsIgnoreCase("info")) {
			Log.i(category, message);
		} else if (priority.equalsIgnoreCase("warn")) {
			Log.w(category, message);
		} else {
			Log.e(category, message);
		}
	}
}
