package com.intellifactory.android;

import java.util.Hashtable;

/**
 * A simple hash table specialized to generate unique integer keys.
 */
final class RegistryTable<T> {		
	final private Hashtable<Integer,T> table;
	private int n;

	public RegistryTable() {
		table = new Hashtable<Integer,T>();
		n = 0;
	}

	/**
	 * Adds an item, returns a unique ID.
	 */
	final public int add(final T value) {
		n++;
		table.put(Integer.valueOf(n), value);
		return n;
	}

	/**
	 * Removes an item by ID.
	 */
	final public void remove(final int key) {
		final Integer k = Integer.valueOf(key);
		if (table.containsKey(k)) {
			table.remove(k);
		}			
	}

	/**
	 * Gets an item by ID.
	 */
	final public T get(final int key) throws WebSharperException {
		final Integer k = Integer.valueOf(key);
		if (table.containsKey(k)) {
			return table.get(k);
		} else {
			throw new WebSharperException("Invalid key: " + key);
		}
	}	
}
