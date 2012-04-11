package com.intellifactory.android;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import android.util.Log;
import java.io.InputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.UUID;

/**
 * Simplifies asynchronous handling of Bluetooth sockets.
 */
final class BluetoothSocketManager {

	// Interfaces ---------------------------------------------------

	/**
	 * Allows synchronizing code, typically by running it on the UI thread.
	 */
	public static interface Synchronizer {
		
		/**
		 * Schedules a job to run.
		 */
		void schedule(final Runnable action);
	}
	
	/**
	 * Represents a running server.
	 */
	public static interface Server {
		/**
		 * Tests if the server is running. 
		 */
		boolean isRunning();

		/**
		 * Starts the server. 
		 */
		void start();

		/**
		 * Stops the server.
		 */
		void stop();
	}

	/**
	 * Implements the accept logic of an asynchronous server.
	 */
	public static interface Acceptor {
			
		/**
		 * Called when a scheduled write completes.
		 */
		SocketListener accept(Socket socket);
	}

	/**
	 * Represents an asynchronous socket.
	 */
	public static interface Socket
	{
		/**
		 * Gets the connected device.
		 */		
		public BluetoothDevice getDevice();
		
		/**
		 * Schedules a read.
		 */
		public void read(final int uid);
		
		/**
		 * Schedules a write of a given encoded data string.
		 */
		public void write(final int uid, final String data);

		/**
		 * Schedules closing the socket.
		 */
		public void close();
	}
	
	/**
	 * Listens to messages from an asynchronous socket.
	 */
	public static interface SocketListener
	{
		/**
		 * Called when a scheduled read completes.
		 */
		void onReadCompleted(final int uid, final String data);
		
		/**
		 * Called when a scheduled write completes.
		 */
		void onWriteCompleted(final int uid);
	}

	/**
	 * Implements the logic of completing device connections.
	 */
	public static interface ConnectionHandler {
			
		/**
		 * Called when a new connection is successfully established.
		 */
		void onConnected(final int uid, final Socket socket);
		
		/**
		 * Called when an exception was thrown.
		 */
		void onConnectionError(final int uid, IOException io);
	}

	// Public API ---------------------------------------------------

	/**
	 * Starts an asynchronous client connection to a device.
	 */
	final public void connect(	final String uuid,
								final int uid,
								final BluetoothDevice device,
								final SocketListener socketListener,
								final ConnectionHandler handler	)
	{
		final UUID token = UUID.fromString(uuid);
		new Thread(new Runnable() {
			public void run() {
				try {
					final BluetoothSocket socket = device.createRfcommSocketToServiceRecord(token);
					socket.connect();
					final Socket s = SocketJob.start(socketListener, socket, sync);
					sync.schedule(new Runnable() {
						public void run() {
							handler.onConnected(uid, s);
						}
					});
				} catch (final IOException io) {
					sync.schedule(new Runnable() {
						public void run() {
							handler.onConnectionError(uid, io);
						}
					});
				}				
			}			
		}).start();
	}

	/**
	 * Starts listening to connections.
	 */
	final public Server listen(final String uuid, final String name, final Acceptor acceptor) {
		final UUID token = UUID.fromString(uuid);
		return ServerJob.start(acceptor, bluetooth, name, token, sync);
	}
			
	final BluetoothAdapter bluetooth;
	final Synchronizer sync;
	
	/**
	 * Constructs a new manager with a given UUID, adapter and synchronizer.
	 */
	public BluetoothSocketManager(final BluetoothAdapter adapter, final Synchronizer synchronizer) {
		bluetooth = adapter;
		sync = synchronizer;
	}
		
	// Implementation -----------------------------------------------
		
	/**
	 * Implements messages sent to a socket.
	 */
	final private static class Message {
		public static enum Type { READ, WRITE, CLOSE }

		final private Type type;
		final private String data;
		final private int uid;

		private Message(final Type t, final int id, final String d) {
			type = t;
			data = d;
			uid = id;
		}

		final public static Message close() {
			return new Message(Type.CLOSE, 0, null);
		}
		
		final public static Message read(final int uid) {
			return new Message(Type.READ, uid, null);
		}

		final public static Message write(final int uid, final String data) {
			return new Message(Type.READ, uid, data);
		}
	}
	
	/**
	 * Implements Socket by wrapping an asynchronous message queue.
	 */
	final private static class QueueSocket implements Socket
	{
		final private LinkedBlockingQueue<Message> queue;
		final private BluetoothDevice device;

		public QueueSocket(final LinkedBlockingQueue<Message> q, final BluetoothDevice d) {
			queue = q;
			device = d;
		}		
		
		final public BluetoothDevice getDevice() {
			return device;
		}
		
		final public void read(final int uid) {
			queue.add(Message.read(uid));
		}
		
		final public void write(final int uid, final String data) {
			queue.add(Message.write(uid, data));
		}

		final public void close() {
			queue.add(Message.close());
		}
	}

	/**
	 * Implements the job of handling a socket. Encapsulates a thread.
	 */
	final private static class SocketJob implements Runnable {
		final private static String TAG = "SocketJob";
		final private LinkedBlockingQueue<Message> source;
		final private SocketListener sink;
		final private BluetoothSocket connection;
		final private Synchronizer sync;

		private SocketJob(	final LinkedBlockingQueue<Message> queue,
						 	final SocketListener client,
						 	final BluetoothSocket socket,
						 	final Synchronizer synchronizer	) {
			source = queue;
			sink = client;
			connection = socket;
			sync = synchronizer;
		}

		final public static Socket start(	final SocketListener sink,
											final BluetoothSocket socket,
											final LinkedBlockingQueue<Message> queue,
											final Synchronizer sync	) {
			new Thread(new SocketJob(queue, sink, socket, sync)).start();
			return new QueueSocket(queue, socket.getRemoteDevice());
		}

		final public static Socket start(	final SocketListener sink,
										 	final BluetoothSocket socket,
										 	final Synchronizer sync	) {
			final LinkedBlockingQueue<Message> queue = new LinkedBlockingQueue<Message>();
			return SocketJob.start(sink, socket, queue, sync);
		}
			
		final public void run() {
			try {
				final InputStream input = connection.getInputStream();
				final OutputStream output = connection.getOutputStream();
				final byte[] buffer = new byte[8 * 1024];
				boolean looping = true;
				while (looping) {
					final Message msg = source.take();
					switch (msg.type) {
					case READ:
						final int n = input.read(buffer);
						if (n == -1) {
							sync.schedule(new Runnable() {
								public void run() {
									sink.onReadCompleted(msg.uid, null);									
								}
							});
						} else {
							final String data = ExtendedAsciiEncoding.getString(buffer, 0, n);
							sync.schedule(new Runnable() {
								public void run() {
									sink.onReadCompleted(msg.uid, data);
								}
							});
						}
						break;
					case WRITE:
						output.write(ExtendedAsciiEncoding.getBytes(msg.data));
						sync.schedule(new Runnable() {
							public void run() {
								sink.onWriteCompleted(msg.uid);
							}
						});
						break;
					case CLOSE:
						looping = false;
						break;
					}
				}
			} catch (InterruptedException ie) {
				Log.e(TAG, "Socket-handling thread interrupted", ie);
			} catch (IOException io) {
				Log.e(TAG, "IO error while handling a socket", io);
			} finally {
				try {
					connection.close();
				} catch (IOException io) {
					Log.e(TAG, "Could not close the connection", io);
				}
			}
		}
	}

	/**
	 * Implements the job of running a socket server on a dedicated thread.
	 */
	final private static class ServerJob implements Runnable {
	
		final private static String TAG = "ServerJob";
		final private Acceptor acceptor;
		final private BluetoothAdapter adapter;
		final private AtomicBoolean isRunning;
		final private String name;
		final private UUID uuid;
		final private Synchronizer sync;
		
		private ServerJob(	final Acceptor a,
							final BluetoothAdapter blue,
							final AtomicBoolean st,
							final String n,
							final UUID tok,
							final Synchronizer synchronizer	) {
			acceptor = a;
			adapter = blue;
			isRunning = st;
			name = n;
			uuid = tok;
			sync = synchronizer;
		}
		
		final public static Server start(	final Acceptor a,
											final BluetoothAdapter blue,
											final String n,
											final UUID tok,
											final Synchronizer sync) {
			final AtomicBoolean isRunning = new AtomicBoolean(false);
			final ServerJob job = new ServerJob(a, blue, isRunning, n, tok, sync);
			return new Server() {							
				boolean started = false;
				public void start() {
					if (!started) {
						started = true;
						isRunning.set(true);
						new Thread(job).start();						
					}
				}
				public boolean isRunning() {
					return isRunning.get();
				}				
				public void stop() {
					isRunning.set(false);
				}
			};
		}
		
		final public void run() {			
			while (isRunning.get()) {
				try {
					final BluetoothServerSocket socket = adapter.listenUsingRfcommWithServiceRecord(name, uuid);
					final BluetoothSocket client = socket.accept(1000);
					if (client != null) {
						final LinkedBlockingQueue<Message> queue = new LinkedBlockingQueue<Message>();
						sync.schedule(new Runnable() {
							public void run() {
								final SocketListener sink = acceptor.accept(new QueueSocket(queue, client.getRemoteDevice()));
								SocketJob.start(sink, client, queue, sync);
							}
						});
					}
				} catch (IOException io) {
					Log.e(TAG, "Ignoring an IO error to continue accepting connections", io);
				}
			}
		}
	}
}
