package com.intellifactory.android;

/**
 * Wraps all exceptions that occur during Bluetooth interaction.
 */
final class WebSharperException extends Exception {

	/**
	 * Constructs an exception with a custom error message.
	 */
	public WebSharperException(String message) {
		super(message);
	}

	/**
	 * Wraps another exception with an extra custom message.
	 */
	public WebSharperException(String message, Throwable inner) {
		super(message, inner);
	}
	
	private static final long serialVersionUID = 5620292727446459125L;
}
