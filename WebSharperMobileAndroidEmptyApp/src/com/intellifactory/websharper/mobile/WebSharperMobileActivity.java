package com.intellifactory.websharper.mobile;

import android.app.Activity;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.widget.Toast;

public class WebSharperMobileActivity extends Activity implements SensorEventListener {
	WebView wv;
	Activity env;
	float[] acceleration = new float[] { 0, 0, (float) -9.8 };
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// setContentView(R.layout.main);
		env = this;
		wv = new WebView(this);
		wv.getSettings().setJavaScriptEnabled(true);
		wv.getSettings().setDomStorageEnabled(true);
		wv.addJavascriptInterface(new WebSharperBridge(), "websharperBridge");
		wv.loadUrl("file:///android_asset/www/index.html");
		setContentView(wv);
	}
	
	class WebSharperBridge implements LocationListener
	{
		double lat = 31.5, lng = 30.2;
		
		public void onLocationChanged(Location location) {
			lat = location.getLatitude();
			lng = location.getLongitude();
		}
		
		public String location()
		{
			return "({ Lat : " + lat + ", Long : " + lng + " })";
		}
		
		public String acceleration()
		{
			return "({ X : " + acceleration[0] + ", Y : " + acceleration[1] + ", Z : " + acceleration[2] + " })";
		}
		
		public void alert(final String msg)
		{
			env.runOnUiThread(new Runnable() {
				public void run()
				{
					Toast.makeText(env, msg, 1000).show();
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
		acceleration = new float[3];
		for (int i = 0; i < 3; i++)
			acceleration[i] = args.values[i];
	}
}