package com.intellifactory.android;

import android.util.Log;
import org.json.JSONObject;
import org.json.JSONException;

final class JsonMessage {
	final private JSONObject packet;
	final private static String TAG = "JsonMessage";

	public JsonMessage() {
		packet = new JSONObject();
	}
		
	final public JsonMessage with(final String name, final String value) {
		try {
			if (value == null) {
				packet.put(name, JSONObject.NULL);
			} else {
				packet.put(name, value);
			}
		} catch (JSONException e) {
			Log.e(TAG, "JSON error", e);				
		}
		return this;
	}

	final public JsonMessage with(final String name, final int value) {
		try {
			packet.put(name, value);
		} catch (JSONException e) {
			Log.e(TAG, "JSON error", e);
		}
		return this;
	}

	final public JsonMessage with(final String name, final double value) {
		try {
			packet.put(name, value);
		} catch (JSONException e) {
			Log.e(TAG, "JSON error", e);
		}
		return this;
	}

	final public JsonMessage with(final String name, final boolean value) {
		try {
			packet.put(name, value);
		} catch (JSONException e) {
			Log.e(TAG, "JSON error", e);
		}
		return this;
	}
	
	@Override
	final public String toString() {
		return packet.toString();
	}
}
