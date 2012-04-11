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
			bridge.log("Exception in native layer (no accelerometer?): " + e.getMessage());
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
	
	@Override
	public void onDestroy()
	{
		super.onDestroy();
		// env.unregisterReceiver(bridge.receiver);
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
				bridge.log("Exception in native layer (no location provider?): " + e.getMessage());
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
		
		public void exitApplication(){
			log("exiting the application..");
			env.finish();
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
		Hashtable<String,BluetoothSocket> dataSockets = new Hashtable<String,BluetoothSocket>(); // keys are tokens
		Hashtable<String,BluetoothSocket> rawSockets = new Hashtable<String,BluetoothSocket>();  // keys are tokens
		Boolean serverOnline = false;
		BluetoothServerSocket serverSocket;
		Boolean serverRaw;
		String serverAction;
		String serverConnectionToken;
		Hashtable<Integer,String> callbacks = new Hashtable<Integer,String> ();
		static final int REQUEST_ENABLE_BT = 3;
		static final int REQUEST_MAKE_DISCOVERABLE = 4;

		// private static final String DEFAULT_UUID_STRING = "$(UUID)";	
		// private static final String DEFAULT_UUID_STRING = "a1ce0569-c68f-4f6a-b0a0-f60747c6faaa";
		// private static final UUID DEFAULT_UUID = UUID.fromString(DEFAULT_UUID_STRING);
		
		private String uuidString = null;  
		private UUID uuid = null;         // Required to make a living BlueTooth connection. Will be set after calling initBluetooth.
		
		public void initBlueTooth(final String uuidString)
		{			
			log("bt: bluetooth initialized. UUID: " + uuidString);
			this.uuidString = uuidString;
			uuid = UUID.fromString(uuidString);
		}
		
		private void callJsCallback(String callback, String value)
		{
			// log("javascript:" + callback+ "(" + value + ")");
			wv.loadUrl("javascript:" + callback+ "(" + value + ")");			
		}
		
		public void activateBluetooth(final String callback)
		{		
			log("bt: intent for turning on bluetooth");
			adapter = BluetoothAdapter.getDefaultAdapter();
			if (adapter == null)
			{
				log("bt: Bluetooth is not supported");
				callJsCallback(callback, "false");
				return;
			}
			if (adapter.isEnabled()){
				log("bt: Bluetooth is already swithed on");
				callJsCallback(callback, "true");
			} else {
				Runnable runner = new Runnable() {
					public void run()
					{
						Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
						// enableBtIntent.putExtra("callback", callback);
						callbacks.put(REQUEST_ENABLE_BT, callback); 
					    startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
					}
				};
				new Thread(runner).start();
			}
		}
		
		public void getPairedDevices(final String callback)
		{
			log ("bt: get paired devices");
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
						String result = "[";
						for (BluetoothDevice device : pairedDevices) {
							if (knownDevices.containsKey(device.getAddress()))
								knownDevices.remove(device.getAddress());
							knownDevices.put(device.getAddress(), device);
							result += "{MacAddress: \"" + device.getAddress() + "\",  Name: \"" + device.getName() + "\"},";							
						}
						result += "]";						
						log ("bt: paired devices:" + result);
						callJsCallback(callback, result);
					}
					else
						callJsCallback(callback, "{$:0}");
				}
			};
			new Thread(runner).start();
		}

		/**
		 * To respond if a device is found by startDeviceDiscovery
		 */
		final BroadcastReceiver receiver = new BroadcastReceiver() {
			public void onReceive(Context context, Intent intent) {
				String action = intent.getAction();
				if (BluetoothDevice.ACTION_FOUND.equals(action)) {
					BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
					if (knownDevices.containsKey(device.getAddress()))
						knownDevices.remove(device.getAddress());
					knownDevices.put(device.getAddress(), device);
					String objString = "{MacAddress: \"" + device.getAddress() + "\", Name: \"" + device.getName() + "\" }";
					log ("bt: a device is discovered: " + objString);
					callJsCallback(discoveringAction, objString);
				}
			}
		};

		public void startDeviceDiscovery(final String callback, final String action)
		{
			log ("bt: start device discovery");
			if (adapter == null || !adapter.isEnabled()){
				callJsCallback(callback, "");
				return;
			}
			IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
			discoveringAction = action;
			env.registerReceiver(receiver, filter);
			boolean b = adapter.startDiscovery(); // The process is asynchronous and the method will immediately return with
										          // a boolean indicating whether discovery has successfully started
			callJsCallback(callback, b + "");					

		}

		public void stopDeviceDiscovery(final String callback)
		{
			log ("bt: stop device discovery");
			if (adapter == null || !adapter.isEnabled()){
				callJsCallback(callback, "");
				return;
			}
			adapter.cancelDiscovery();
			callJsCallback(callback, "");
		}

		public void connectToDevice(final String callback, final String address, final boolean isRaw)
		{
			// log ("bt: connect to device: " + address + " token: " + token + "  isRaw: " + isRaw + "  UUID = $(UUID)");			
			log ("bt: connect to device: " + address + "  isRaw: " + isRaw + "  UUID: " + uuidString);
			
			if (adapter == null || !adapter.isEnabled() || !knownDevices.containsKey(address) || uuid == null){
				if (!knownDevices.containsKey(address))
					log ("bt: the device we trying to connect to is not known");
				if (uuid == null)
					log ("bt: uuid must be set to be able to establish a connection. call initBluetooth first!");
				callJsCallback(callback, "{$:0}");
				return;
			}			
	        
			log ("bt: (connect) stop any device discovery process");
			adapter.cancelDiscovery();	

			Runnable runner = new Runnable() {
				public void run()
				{
					// retrieve socket
					BluetoothSocket socket;
					BluetoothDevice device = knownDevices.get(address);		
					try {
						socket = device.createRfcommSocketToServiceRecord(uuid);
					} catch (IOException e) {
						log ("bt: (connect) cannot retrieve socket");
						callJsCallback(callback, "{$:0}");
						return;
					}
					if (socket == null) {
						log ("bt: (connect) socket is null");
						callJsCallback(callback, "{$:0}");
						return;
					}
					log ("bt: (connect) socket retrieved");
					
					// connect to socket
					try {
						socket.connect();
					} catch (IOException connectException) {						
			            try { 
			            	log ("bt: (connect) connection failure. closing socket. (server not listening? wrong UUID?)");
			                socket.close();
			            } catch (IOException closeException) {			            	
			            }			            
						callJsCallback(callback, "{$:0}");
						return;
					}
								
					String token = UUID.randomUUID().toString();
					
					if (isRaw)
						rawSockets.put(token, socket);
					else
						dataSockets.put(token, socket);
					
					log ("bt: (connect) ready. token: " + token);
					callJsCallback(callback, "{$:1, $0:{Token: \"" + token + "\", IsConnected: true}}"); 
				}
			};
			new Thread(runner).start();
		}

		public void makeDiscoverable(final String callback, final int duration)
		{
			log (("bt: intent for make device discoverable for " + duration + " seconds").replaceFirst(" 0 ", " 120 "));
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
					// discoverableIntent.putExtra("callback", callback);
					callbacks.put(REQUEST_MAKE_DISCOVERABLE, callback); 
					startActivityForResult(discoverableIntent, REQUEST_MAKE_DISCOVERABLE);
				}
			};
			new Thread(runner).start();
		}

		final Runnable serverRunner = new Runnable()
		{
			public void run()
			{
				log ("bt: (serverrunner) blocked, wait for the client to connect");
				while (serverOnline)
					try {						
						BluetoothSocket socket = serverSocket.accept(/*timeout:*/360);
						log ("bt: (serverrunner) client connected");
						String token = UUID.randomUUID().toString();
						if (serverRaw)
							rawSockets.put(token, socket);
						else
							dataSockets.put(token, socket);
						serverConnectionToken = token;
						log ("bt: (serverrunner) go for the action. token: " + token);
						callJsCallback(serverAction, "{Token: \"" + token + "\", IsConnected: true}");
						serverSocket.close();
						return; // Server must be restarted in order to accept new connections
					} catch (IOException ioe) {			
						// log ("bt: (server) timeout, just re-loop");
					}
			}
		};

		public void startServer(final String callback, final String action, final boolean isRaw)		
		{ 
			log ("bt: (startserver) start server. isRaw = " + isRaw + "  UUID = " + uuidString);	
			if (adapter == null || !adapter.isEnabled() || serverOnline || uuid == null)
			{
				if (uuid == null)
					log ("bt: uuid must be set to be able to establish a connection. call initBluetooth first!");
				callJsCallback(callback, "false");
				return;
			}
			Runnable runner = new Runnable() {
				public void run()
				{
					try {						
						// serverSocket = adapter.listenUsingRfcommWithServiceRecord("$(UUID)", DEFAULT_UUID);
						serverSocket = adapter.listenUsingRfcommWithServiceRecord(uuidString, uuid);
						serverOnline = true;
						serverRaw = isRaw;
						serverAction = action;						
						new Thread(serverRunner).start();
						log ("bt: (startserver) server socket created");
						callJsCallback(callback, "true");
					} catch (IOException e) {
						log ("bt: (startserver) cannot retrieve server socket");
						callJsCallback(callback, "false");
					}
				}
			};
			runner.run();
		}

		public void stopServer(String callback)
		{
			log ("bt: (server) stop");
			serverOnline = false;
			callJsCallback(callback, "");
		}

		public void closeConnection(final String callback, final String token, final boolean isRaw)		
		{
			log ("bt: close connection");
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
					if (socket == null){
						log ("bt: (close) cannot find socket");
						callJsCallback(callback, "false");
					} else {						
						try {						
							socket.close();
						} catch (IOException ioe) {
							// ignore, nothing we can do about it
						}
						if (serverOnline && serverConnectionToken == token)
						{
							// IF WE ARE A SERVER, AND ALIVE: restart ourselves to be able to accept new connections
							try {
								// serverSocket = adapter.listenUsingRfcommWithServiceRecord("$(UUID)", DEFAULT_UUID);
								serverSocket = adapter.listenUsingRfcommWithServiceRecord(uuidString, uuid); // name, uuid
								serverRunner.run();
							} catch (IOException ioe) {
								// ignore, nothing we can do about it
							}
						}
						callJsCallback(callback, "");
					}
				}
			};
			new Thread(runner).start();
		}


		public void readFromConnection(final String callback, final String token, final boolean isRaw, final int length)
		{
			log ("bt: read from connection. token = " + token + "  isRaw = " + isRaw);
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
					
					// log ("bt: (read) bytes from socket: " + array);
					callJsCallback(callback, "{$:1,$0:" + array + "}");					
				}
			};
			new Thread(runner).start();
		}

		public void writeToConnection(final String callback, final String token, final int[] data, final boolean isRaw)
		{
			log ("bt: write to connection. token = " + token + "  isRaw = " + isRaw);
			// log ("bt: (write) bytes to socket: " + data);
			
			if (adapter == null || !adapter.isEnabled())
			{
				callJsCallback(callback, "false");
				return;
			}
			Runnable runner = new Runnable() {
				public void run() {
					BluetoothSocket socket;
					if (isRaw) {
						socket = rawSockets.get(token);
						if (socket == null) {
							log ("bt: (write) cannot find socket: " + data);
							callJsCallback(callback, "false");														
						} else {
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
					}
					else
					{
						socket = dataSockets.get(token);
						if (socket == null) {
							log ("bt: (write) cannot find socket: " + data);
							callJsCallback(callback, "false");														
						} else {
							byte[] buffer = new byte[2 + data.length];
							buffer[0] = (byte)(data.length / 256);
							buffer[1] = (byte)(data.length - buffer[0] * 256);
							for (int i = 0; i < data.length; i++)
								buffer[i + 2] = (byte)data[i];
							try {
								socket.getOutputStream().write(buffer);
								log ("bt: (write) bytes to socket: " + new String(buffer));
								callJsCallback(callback, "true");
							} catch (IOException e) {
								callJsCallback(callback, "false");
								closeConnection("void", token, isRaw);
							}
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
		case WebSharperBridge.REQUEST_ENABLE_BT:
			// callback = data.getStringExtra("callback");		
			callback = bridge.callbacks.get(WebSharperBridge.REQUEST_ENABLE_BT);
			switch (resultCode) {
				case Activity.RESULT_CANCELED: 
					bridge.log("User has choosen not to switch on Bluetooth.");
					bridge.callJsCallback(callback, "false"); 
					break;
				case Activity.RESULT_OK:
					bridge.log("Bluetooth has been switched on.");					
					bridge.callJsCallback(callback, "true");
					break;
			}			
			
			break;
		case WebSharperBridge.REQUEST_MAKE_DISCOVERABLE: 					
			// callback = data.getStringExtra("callback");
			callback = bridge.callbacks.get(WebSharperBridge.REQUEST_MAKE_DISCOVERABLE);
			if (resultCode == Activity.RESULT_CANCELED) { 
				bridge.log("bt: User refused to make device discoverable.");
				bridge.callJsCallback(callback, "false");
			} else {
				bridge.log("bt: Device is discoverable for " + resultCode + " seconds");					
				bridge.callJsCallback(callback, "true");
			}				
			break;
		}
	}

	public void onAccuracyChanged(Sensor arg0, int arg1) {
	}

	public void onSensorChanged(SensorEvent args) {
		acceleration = args.values.clone();
	}
}