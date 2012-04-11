package com.intellifactory.android;

import android.webkit.WebView;
import android.webkit.WebSettings;
import android.bluetooth.BluetoothAdapter;

/**
 * A view for running WebSharper Android applications
 * Wraps a WebKit View, exposing some Java functionality to JavaScript for 
 * WebSharper integration.
 */
final public class WebSharperView {

	final String url;
	
	/**
	 * Constructs a WebSharper View that opens index.html from the assets folder.
	 */
	public WebSharperView() {
		url = "file:///android_asset/index.html";
	}
	
	/**
	 * Constructs a WebSharper View with a given start URL.
	 */
	public WebSharperView(final String startUrl) {
		url = startUrl;
	}
	
	/**
	 * Creates a new WebView with the WebSharper application.
	 */
	final public WebView run(final AsyncActivity activity) {
		final WebView wv = new WebView(activity);
		final WebSettings settings = wv.getSettings();
		settings.setJavaScriptEnabled(true);
		settings.setDomStorageEnabled(true);
		wv.addJavascriptInterface(new WebSharperBridge(activity, wv), "AndroidWebSharperBridge");		
		final BluetoothAdapter bt = BluetoothAdapter.getDefaultAdapter();
		if (bt != null) {
			wv.addJavascriptInterface(new BluetoothBridge(bt, activity, wv), "AndroidWebSharperBluetoothBridge");
		}
		wv.loadUrl(url);
		return wv;
	}	
	
}
