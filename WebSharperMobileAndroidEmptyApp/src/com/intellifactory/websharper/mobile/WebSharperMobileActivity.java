package com.intellifactory.websharper.mobile;

import java.io.InputStream;
import java.util.List;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
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
		setContentView(R.layout.main);
		env = this;
		wv = new WebView(this);
		wv.getSettings().setJavaScriptEnabled(true);
		wv.getSettings().setDomStorageEnabled(true);
		bridge = new WebSharperBridge();
		wv.loadUrl("file:///android_asset/www/index.html");
		wv.addJavascriptInterface(bridge, "websharperBridge");
		setContentView(wv);
		try
		{
			myManager = (SensorManager)getSystemService(Context.SENSOR_SERVICE);
			List<Sensor> sensors = myManager.getSensorList(Sensor.TYPE_ACCELEROMETER);
			if(sensors.size() > 0)
			{
				accSensor = sensors.get(0);
				myManager.registerListener(this, accSensor, SensorManager.SENSOR_DELAY_UI);
			}
		}
		catch (Exception e)
		{ }
	}

	@Override
	public void onPause()
	{
		if (cameraNeeded && cmr != null)
			cmr.release();
		if (accSensor != null)
			myManager.unregisterListener(this);
		bridge.pause();
		super.onPause();
	}

	@Override
	public void onResume()
	{
		super.onResume();
		bridge.resume();
		if (accSensor != null)
			myManager.registerListener(this, accSensor, SensorManager.SENSOR_DELAY_UI);
		if (cameraNeeded)
			cmr = Camera.open();
	}

	class WebSharperBridge implements LocationListener
	{
		double lat = 31.5, lng = 30.2;

		public void pause()
		{
			LocationManager locationManager = (LocationManager)env.getSystemService(Context.LOCATION_SERVICE);
			locationManager.removeUpdates(this);
		}

		public void resume()
		{
			LocationManager locationManager = (LocationManager)env.getSystemService(Context.LOCATION_SERVICE);
			Criteria locationCriteria = new Criteria();
			locationCriteria.setAccuracy(Criteria.ACCURACY_FINE);
			locationManager.requestLocationUpdates(locationManager.getBestProvider(locationCriteria, true), 100, 0, this);
			//locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 100, 0, this);
			try
			{
				lat = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER).getLatitude(); // or GPS?
				lng = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER).getLongitude(); // or GPS?
			}
			catch (Exception e)
			{ }
		}

		public void onLocationChanged(Location location) {
			alert("Location!");
			lat = location.getLatitude();
			lng = location.getLongitude();
		}

		public String serverLocation()
		{
			try
			{
				InputStream is = getAssets().open("www/serverLocation.txt");
				int size = is.available();
				byte[] buffer = new byte[size];
				is.read(buffer);
				is.close();
				String result = new String(buffer);
				return "({ $ : 1, $0 : \"" + result + "\" })";
			}
			catch (Exception e)
			{
				return "({ $ : 0 })";
			}
		}

		/*public void ajax(final String url, final String headers, final String content, final String callback, final String fail)
		{
			new Thread(new Runnable() {
				public void run()
				{
					HttpClient httpclient = new DefaultHttpClient();
				    HttpPost httppost = new HttpPost(url);

				    try {
				        ParseHeadersArray(httppost, headers);
				        StringEntity ent = new StringEntity(content);
				        ent.setContentType(new BasicHeader("Content-Type", "application/x-www-form-urlencoded"));
				        httppost.setEntity(ent);

				        HttpResponse response = httpclient.execute(httppost);

				        String s = "";
				        String line = "";

				        BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
				        while ((line = rd.readLine()) != null) s += line;

				        wv.loadUrl("javascript:" + callback + ".call(null,JSON.stringify(" + s + "))");
				    } catch (Exception e) {
				        wv.loadUrl("javascript:" + fail + ".call(null,\"" + e.getMessage() + "\")");
				    }
				}
			}).start();
		}

		private void ParseHeadersArray(HttpPost httppost, String input)
        {
            if (input == "")
                return;
            int scIndex = input.indexOf(';');
            int commaIndex = input.indexOf(',');
            if (commaIndex > -1)
            {
            	String key = input.substring(0, scIndex);
                String value = input.substring(scIndex + 1, commaIndex - scIndex - 1).replace('#', ',');
                httppost.setHeader(key, value);
                ParseHeadersArray(httppost, input.substring(commaIndex + 1));
            }
            else
            {
                String key = input.substring(0, scIndex);
                String value = input.substring(scIndex + 1).replace('@', '.').replace('#', ',');
                httppost.setHeader(key, value);
            }
        }*/

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
			try
			{
				cmr = Camera.open();
				Camera.Parameters params = cmr.getParameters();
				/*double frameRatio = (double)maxHeight / (double)maxWidth, cameraRatio = (double)params.getPictureSize().height / (double)params.getPictureSize().width;
				if (frameRatio > cameraRatio)
				{
					if (params.getPictureSize().width > maxWidth)
						params.setPictureSize(maxWidth, (int)(maxWidth * cameraRatio));
				}
				else
					if (params.getPictureSize().height > maxHeight)
						params.setPictureSize((int)(maxHeight / cameraRatio), maxHeight);*/
				//params.setPictureFormat(ImageFormat.RGB_565);
				cmr.setParameters(params);
				final SurfaceView sv = new SurfaceView(env);
				sv.setOnLongClickListener(new View.OnLongClickListener() {
					@Override
					public boolean onLongClick(View v)
					{
						Camera.PictureCallback jpegCallback=new Camera.PictureCallback() { 

							public void onPictureTaken(byte[] data, Camera camera) {
								wv.loadUrl("javascript:" + callback + ".call(null,\"" + String.format("%x", data).toUpperCase() + "\")");
								camera.release();
								env.setContentView(wv);
								cmr = null;
							}
						};
						cmr.takePicture(null, null, jpegCallback);
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

			}
			catch (Exception e)
			{
				wv.loadUrl("javascript:" + fail + ".call(null,\"" + e.getMessage() + "\")");
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
						@Override
						public void onClick(DialogInterface dialog, int which) {
							dialog.dismiss();
						}
					})
					.show();
				}
			});
		}

		public void log(String msg)
		{
			Log.d("DebugJS", msg);
		}

		@Override
		public void onProviderDisabled(String arg0) {
			// TODO Auto-generated method stub

		}

		@Override
		public void onProviderEnabled(String arg0) {
			// TODO Auto-generated method stub

		}

		@Override
		public void onStatusChanged(String arg0, int arg1, Bundle arg2) {
			// TODO Auto-generated method stub

		}
	}

	@Override
	public void onAccuracyChanged(Sensor arg0, int arg1) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onSensorChanged(SensorEvent args) {
		acceleration = args.values.clone();
	}
}