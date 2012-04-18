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
