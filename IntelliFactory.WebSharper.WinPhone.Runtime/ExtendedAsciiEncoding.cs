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

using System;

namespace IntelliFactory.WebSharper.WinPhone.Runtime
{
    /// <summary>
    /// A simple 8-bit ExtendedAscii encoding. Every character corresponds to a byte.
    /// Positive bytes are packed into character codes 0-127. Negative bytes are packed
    /// into character codes 128-255 using two's complement.
    /// </summary>
    internal static class ExtendedAsciiEncoding
    {

        public static byte[] GetBytes(string text)
        {
            return GetBytes(text, 0, text.Length);
        }

        public static byte[] GetBytes(string text, int offset, int length)
        {
            byte[] bytes = new byte[length];
            for (var i = 0; i < length; i++)
            {
                bytes[i] = (byte)text[offset + i];
            }
            return bytes;
        }

        public static string GetString(byte[] data)
        {
            return GetString(data, 0, data.Length);
        }

        public static string GetString(byte[] data, int offset, int length)
        {
            char[] chars = new char[length];
            for (var i = 0; i < length; i++)
            {
                chars[i] = (char)data[offset + i];
            }
            return new String(chars);
        }
    }
}
