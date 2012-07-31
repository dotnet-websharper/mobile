package com.intellifactory.android;

/**
 * An simple 8-bit ExtendedAscii encoding. Every character corresponds to a
 * byte. Positive bytes are packed into character codes 0-127. Negative bytes
 * are packed into character codes 128-255 using two's complement.
 */
final class ExtendedAsciiEncoding {

	private ExtendedAsciiEncoding() {
	}

	/** Converts a string to a byte array */
	final public static byte[] getBytes(final String text) {
		return getBytes(text, 0, text.length());
	}

	/** Converts a string to a byte array */
	final public static byte[] getBytes(final String text, final int offset,
			final int length) {
		final byte[] bytes = new byte[length];
		for (int i = 0; i < length; i++) {
			final int code = text.codePointAt(offset + i);
			bytes[i] = (byte) ((code >= 128) ? code - 256 : code);
		}
		return bytes;
	}

	/** Converts a byte array to a string */
	final public static String getString(final byte[] data) {
		return getString(data, 0, data.length);
	}

	/** Converts a byte array to a string */
	final public static String getString(final byte[] data, final int offset,
			final int length) {
		final char[] chars = new char[length];
		for (int i = 0; i < length; i++) {
			chars[i] = (char) (data[offset + i] & 0xFF);
		}
		return new String(chars);
	}

}
