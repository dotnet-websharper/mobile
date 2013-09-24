// WebSharper.Mobile - support for building mobile WebSharper apps
// Copyright (c) 2013 IntelliFactory
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package com.intellifactory.android;

/** A union type that represents messages sent to a BT socket. */
abstract class BluetoothSocketMessage {

	abstract public Type getType();

	static enum Type {
		CLOSE, READ, WRITE
	}

	final static class Close extends BluetoothSocketMessage {
		final public Type getType() {
			return Type.CLOSE;
		}
	}

	final static class Read extends BluetoothSocketMessage {
		final private Callback<String> cont;

		public Read(Callback<String> cont) {
			this.cont = cont;
		}

		final public void doneReading(String data) {
			cont.call(data);
		}

		final public Type getType() {
			return Type.READ;
		}
	}

	final static class Write extends BluetoothSocketMessage {
		final private Callback<Void> cont;
		final private String data;

		public Write(String data, Callback<Void> cont) {
			this.cont = cont;
			this.data = data;
		}

		final public String getData() {
			return data;
		}

		final public void doneWriting() {
			cont.call(null);
		}

		final public BluetoothSocketMessage.Type getType() {
			return BluetoothSocketMessage.Type.WRITE;
		}
	}

}
