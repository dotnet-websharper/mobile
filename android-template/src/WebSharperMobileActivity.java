// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2011.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}
//
// Do not change any of the contents unless you are absolutely certain you know what you are doing.
//

package com.$(AUTHOR).$(SAFETITLE);

import java.io.IOException;
import java.io.InputStream;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import android.app.Activity;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.content.IntentFilter;
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

public class WebSharperMobileActivity extends Activity implements SensorEventListener {
	SensorManager myManager;
	Sensor accSensor;
	WebView wv;
	Activity env;
	boolean cameraNeeded = false;
	Camera cmr;
	WebSharperBridge bridge;
	private static final UUID DEFAULT_UUID = UUID.fromString("$(UUID)");
	float[] acceleration = new float[] { 0, 0, (float) -9.8 };

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		env = this;
		wv = new WebView(this);
		// enable JavaScript
		wv.getSettings().setJavaScriptEnabled(true);
		// enable HTML5 LocalStorage
		wv.getSettings().setDomStorageEnabled(true);
		bridge = new WebSharperBridge();
		wv.loadUrl("file:///android_asset/www/index.html");
		// in JavaScript, websharperBridge is the Java bridge object (of type WebSharperBridge)
		wv.addJavascriptInterface(bridge, "websharperBridge");
		setContentView(wv);
		try {
			// request acceleration updates
			myManager = (SensorManager)getSystemService(Context.SENSOR_SERVICE);
			List<Sensor> sensors = myManager.getSensorList(Sensor.TYPE_ACCELEROMETER);
			if(sensors.size() > 0) {
				accSensor = sensors.get(0);
				myManager.registerListener(this, accSensor, SensorManager.SENSOR_DELAY_UI);
			}
		} catch (Exception e) {
			bridge.log("Exception in native layer: " + e.getMessage());
		}
	}

	@Override
	public void onPause()
	{
		// release resources
		if (cameraNeeded && cmr != null) {
			cmr.release();
		}
		if (accSensor != null) {
			myManager.unregisterListener(this);
		}
		bridge.pause();
		super.onPause();
	}

	@Override
	public void onResume()
	{
		// reacquire resources
		super.onResume();
		bridge.resume();
		if (accSensor != null) {
			myManager.registerListener(this, accSensor, SensorManager.SENSOR_DELAY_UI);
		}
		if (cameraNeeded) {
			cmr = Camera.open();
		}
	}

	class WebSharperBridge implements LocationListener
	{
		double lat = 0, lng = 0;

		public void pause()
		{
			LocationManager locationManager = (LocationManager)env.getSystemService(Context.LOCATION_SERVICE);
			locationManager.removeUpdates(this);
		}

		public void resume()
		{
			try {
				// request location updates
				LocationManager locationManager = (LocationManager)env.getSystemService(Context.LOCATION_SERVICE);
				Criteria locationCriteria = new Criteria();
				locationCriteria.setAccuracy(Criteria.ACCURACY_FINE);
				locationManager.requestLocationUpdates(locationManager.getBestProvider(locationCriteria, true), 100, 0, this);

				lat = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER).getLatitude();
				lng = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER).getLongitude();
			} catch (Exception e) {
				bridge.log("Exception in native layer: " + e.getMessage());
			}
		}

		public void onLocationChanged(Location location)
		{
			lat = location.getLatitude();
			lng = location.getLongitude();
		}

		// this function is used for XHR, so JavaScript will know where is the RPC server
		public String serverLocation()
		{
			try {
				InputStream is = getAssets().open("www/serverLocation.txt");
				int size = is.available();
				byte[] buffer = new byte[size];
				is.read(buffer);
				is.close();
				String result = new String(buffer);
				return "({ $ : 1, $0 : \"" + result + "\" })";
			} catch (Exception e) {
				return "({ $ : 0 })";
			}
		}

		public String location()
		{
			return "({ Lat : " + lat + ", Long : " + lng + " })";
		}

		public String acceleration()
		{
			return "({ X : " + acceleration[0] + ", Y : " + acceleration[1] + ", Z : " + acceleration[2] + " })";
		}

		public void camera(int maxHeight, int maxWidth, final String callback, final String fail)
		{
			try {
				cmr = Camera.open();
				Camera.Parameters params = cmr.getParameters();
				cmr.setParameters(params);
				// the surface is the graphical interface for the camera, since Android SDK does not supply a default one
				final SurfaceView sv = new SurfaceView(env);
				sv.setOnLongClickListener(new View.OnLongClickListener() {
					public boolean onLongClick(View v) {
						try {
							Camera.PictureCallback jpegCallback=new Camera.PictureCallback() {
								public void onPictureTaken(byte[] data, Camera camera) {
									StringBuffer sb = new StringBuffer(data.length * 2);
									for (int i = 0; i < data.length; i++) {
										int v = data[i] & 0xff;
										if (v < 16) {
											sb.append('0');
										}
										sb.append(Integer.toHexString(v));
									}
									wv.loadUrl("javascript:" + callback + ".call(null,\"" + sb.toString().toUpperCase() + "\")");
									camera.release();
									env.runOnUiThread(new Runnable() {
										public void run()
										{
											env.setContentView(wv);
										}});
									cmr = null;
								}
							};
							cmr.takePicture(null, null, jpegCallback);
						} catch (Exception e) {
							wv.loadUrl("javascript:" + fail + ".call(null,IntelliFactory.WebSharper.Runtime.NewError(\"Exception\",\"" +
									e.getMessage().replaceAll("\\", "\\\\").replaceAll("\"", "\\\"") + "\"))");
						}
						return true;
					}
				});
				sv.setClickable(true);
				env.runOnUiThread(new Runnable() {
					public void run()
					{
						env.setContentView(sv);
					}});
				cmr.setPreviewDisplay(sv.getHolder());
				cmr.startPreview();
				Toast toast = Toast.makeText(env, "Long-click the screen to take photo.", Toast.LENGTH_SHORT);
				toast.show();
			} catch (Exception e) {
				wv.loadUrl("javascript:" + fail + ".call(null,IntelliFactory.WebSharper.Runtime.NewError(\"Exception\",\"" +
						e.getMessage().replaceAll("\\", "\\\\").replaceAll("\"", "\\\"") + "\"))");
			}
		}

		public void alert(final String msg)
		{
			env.runOnUiThread(new Runnable() {
				public void run()
				{
					new AlertDialog.Builder(env)
					.setMessage(msg)
					.setNeutralButton("OK", new OnClickListener() {
						public void onClick(DialogInterface dialog, int which) {
							dialog.dismiss();
						}
					})
					.show();
				}
			});
		}

		// this function prints to logcat
		public void log(String msg)
		{
			Log.d("DebugJS", msg);
		}

		// -----------------------
		// Bluetooth section start
		// -----------------------

		BluetoothAdapter adapter;
		Hashtable<String,BluetoothDevice> knownDevices = new Hashtable<String,BluetoothDevice>();
		String discoveringAction;
		Hashtable<String,BluetoothSocket> dataSockets = new Hashtable<String,BluetoothSocket>();
		Hashtable<String,BluetoothSocket> rawSockets = new Hashtable<String,BluetoothSocket>();
		Boolean serverOnline = false;
		BluetoothServerSocket server;
		Boolean serverRaw;
		String serverAction;
		String serverConnectionToken;

		private void callJsCallback(String callback, String value)
		{
			wv.loadUrl("javascript:" + callback + "(" + value + ")");
		}

		public void activateBluetooth(final String callback)
		{
			adapter = BluetoothAdapter.getDefaultAdapter();
			if (adapter == null)
			{
				callJsCallback(callback, "false");
				return;
			}
			if (adapter.isEnabled())
				callJsCallback(callback, "true");
			else
			{
				Runnable runner = new Runnable() {
					public void run()
					{
						Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
						enableBtIntent.putExtra("callback", callback);
						startActivityForResult(enableBtIntent, 3); // REQUEST_ENABLE_BT
					}
				};
				new Thread(runner).start();
			}
		}
		
		public void getPairedDevices(final String callback)
		{
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "{$:0}");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					Set<BluetoothDevice> pairedDevices = adapter.getBondedDevices();
					if (pairedDevices.size() > 0) {
						String result = "";
						for (BluetoothDevice device : pairedDevices) {
							if (knownDevices.containsKey(device.getAddress()))
								knownDevices.remove(device.getAddress());
							knownDevices.put(device.getAddress(), device);
							result += "{$: 1, $1 : { UniqueId: \"" + device.getAddress() +
									"\", Name: \"" + device.getName() +
									"\" }, $2: ";
						}
						result += "{$:0}";
						for (int i = 0; i < pairedDevices.size(); i++)
							result += "}";
						callJsCallback(callback, result);
					}
					else
						callJsCallback(callback, "{$:0}");
				}
			};
			new Thread(runner).start();
		}

		final BroadcastReceiver receiver = new BroadcastReceiver() {
			public void onReceive(Context context, Intent intent) {
				String action = intent.getAction();
				if (BluetoothDevice.ACTION_FOUND.equals(action)) {
					BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
					if (knownDevices.containsKey(device.getAddress()))
						knownDevices.remove(device.getAddress());
					knownDevices.put(device.getAddress(), device);
					callJsCallback(discoveringAction, "{ UniqueId: \"" + device.getAddress() +
							"\", Name: \"" + device.getName() +
							"\" }");
				}
			}
		};

		public void startDeviceDiscovery(final String callback, final String action)
		{
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
					discoveringAction = action;
					registerReceiver(receiver, filter);
					callJsCallback(callback, "");
				}
			};
			new Thread(runner).start();
		}

		public void stopDeviceDiscovery(final String callback)
		{
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					adapter.cancelDiscovery();
					callJsCallback(callback, "");
				}
			};
			new Thread(runner).start();
		}

		public void connectToDevice(final String callback, final String address, final String uuid, final Boolean isRaw)
		{
			if (adapter == null || !adapter.isEnabled() || !knownDevices.containsKey(address))
			{
				callJsCallback(callback, "{$:0}");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					BluetoothDevice device = knownDevices.get(address);
					BluetoothSocket socket;
					try {
						socket = device.createRfcommSocketToServiceRecord(UUID.fromString(uuid));
					}
					catch (IOException ioe)
					{
						callJsCallback(callback, "{$:0}");
						return;
					}
					if (socket == null)
					{
						callJsCallback(callback, "{$:0}");
						return;
					}
					String uuid = UUID.randomUUID().toString();
					if (isRaw)
						rawSockets.put(uuid, socket);
					else
						dataSockets.put(uuid, socket);
					callJsCallback(callback, "{$:1, $0: \"" + uuid + "\"}");
				}
			};
			new Thread(runner).start();
		}

		public void makeDiscoverable(final String callback, final int duration)
		{
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "false");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					Intent discoverableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
					discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, duration);
					discoverableIntent.putExtra("callback", callback);
					startActivityForResult(discoverableIntent, 4); // REQUEST_MAKE_DISCOVERABLE
				}
			};
			new Thread(runner).start();
		}

		final Runnable serverRunner = new Runnable()
		{
			public void run()
			{
				while (serverOnline)
					try {
						BluetoothSocket socket = server.accept(250);
						String uuid = UUID.randomUUID().toString();
						if (serverRaw)
							rawSockets.put(uuid, socket);
						else
							dataSockets.put(uuid, socket);
						serverConnectionToken = uuid;
						callJsCallback(serverAction, "\"" + uuid + "\"");
						server.close();
						return; // Server must be restarted in order to accept new connections.
					} catch (IOException ioe) {
						// Timeout, just re-loop
					}
			}
		};

		public void startServer(final String callback, final String action, final Boolean isRaw)
		{
			if (adapter == null || !adapter.isEnabled() || serverOnline)
			{
				callJsCallback(callback, "false");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					try {
						server = adapter.listenUsingRfcommWithServiceRecord("$(UUID)", DEFAULT_UUID);
						serverOnline = true;
						serverRaw = isRaw;
						serverAction = action;
						new Thread(serverRunner).start();
						callJsCallback(callback, "true");
					} catch (IOException e) {
						callJsCallback(callback, "false");
					}
				}
			};
			runner.run();
		}

		public void stopServer(String callback)
		{
			serverOnline = false;
			callJsCallback(callback, "");
		}

		public void closeConnection(final String callback, final String token, final Boolean isRaw)
		{
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "[false,{$:0}]");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					BluetoothSocket socket;
					if (isRaw)
						socket = rawSockets.get(token);
					else
						socket = dataSockets.get(token);
					try {
						socket.close();
					} catch (IOException ioe) {
						// ignore, nothing we can do about it
					}
					if (serverOnline && serverConnectionToken == token)
					{
						try {
							server = adapter.listenUsingRfcommWithServiceRecord("$(UUID)", DEFAULT_UUID);
							serverRunner.run();
						} catch (IOException ioe) {
							// ignore, nothing we can do about it
						}
					}
					callJsCallback(callback, "");
				}
			};
			new Thread(runner).start();
		}


		public void readFromConnection(final String callback, final String token, final Boolean isRaw, final int length)
		{
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "{$:0}");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					BluetoothSocket socket;
					byte[] result;
					int read;
					if (isRaw)
					{
						socket = rawSockets.get(token);
						result = new byte[length];
						try {
							read = socket.getInputStream().read(result);
						} catch (IOException ioe) {
							callJsCallback(callback, "{$:0}");
							closeConnection("void", token, isRaw);
							return;
						}
					}
					else
					{
						socket = dataSockets.get(token);
						byte[] len = new byte[2];
						try {
							InputStream input = socket.getInputStream();
							read = 0;
							while (read < 2)
								read += input.read(len, read, 2 - read);
							int neededBytes = len[0] * 256 + len[1];
							result = new byte[neededBytes];
							read = 0;
							while (read < neededBytes)
								read += input.read(result, read, neededBytes - read);
						} catch (IOException ioe) {
							callJsCallback(callback, "{$:0}");
							closeConnection("void", token, isRaw);
							return;
						}
					}
					String array;
					if (read > 0)
					{
						array = "[" + Byte.toString(result[0]);
						for (int i = 1; i < read; i++)
							array += "," + Byte.toString(result[i]);
						array += "]";
					}
					else
						array = "[]";
					callJsCallback(callback, "{$:1,$0:" + array + "}");
				}
			};
			new Thread(runner).start();
		}

		public void writeToConnection(final String callback, final String token, final int[] data, final Boolean isRaw)
		{
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "false");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					BluetoothSocket socket;
					if (isRaw)
					{
						socket = rawSockets.get(token);
						byte[] buffer = new byte[data.length];
						for (int i = 0; i < data.length; i++)
							buffer[i] = (byte)data[i];
						try {
							socket.getOutputStream().write(buffer);
							callJsCallback(callback, "true");
						} catch (IOException e) {
							callJsCallback(callback, "false");
							closeConnection("void", token, isRaw);
						}
					}
					else
					{
						socket = dataSockets.get(token);
						byte[] buffer = new byte[2 + data.length];
						buffer[0] = (byte)(data.length / 256);
						buffer[1] = (byte)(data.length - buffer[0] * 256);
						for (int i = 0; i < data.length; i++)
							buffer[i + 2] = (byte)data[i];
						try {
							socket.getOutputStream().write(buffer);
							callJsCallback(callback, "true");
						} catch (IOException e) {
							callJsCallback(callback, "false");
							closeConnection("void", token, isRaw);
						}
					}
				}
			};
			new Thread(runner).start();
		}
		
		// ---------------------
		// Bluetooth section end
		// ---------------------

		public void onProviderDisabled(String arg0) {
		}

		public void onProviderEnabled(String arg0) {
		}

		public void onStatusChanged(String arg0, int arg1, Bundle arg2) {
		}
	}

	public void onActivityResult(int requestCode, int resultCode, Intent data)
	{
		String callback;
		switch (requestCode) {
		case 3: // REQUEST_ENABLE_BT = 3
			callback = data.getStringExtra("callback");
			bridge.callJsCallback(callback, resultCode == Activity.RESULT_OK ? "true" : "false");
			break;
		case 4: // REQUEST_MAKE_DISCOVERABLE
			callback = data.getStringExtra("callback");
			bridge.callJsCallback(callback, resultCode != Activity.RESULT_CANCELED ? "true" : "false");
			break;
		}
	}

	public void onAccuracyChanged(Sensor arg0, int arg1) {

	}

	public void onSensorChanged(SensorEvent args) {
		acceleration = args.values.clone();
	}
}