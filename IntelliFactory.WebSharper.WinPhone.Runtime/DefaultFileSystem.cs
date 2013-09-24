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

using System.IO;
using System.Collections.Generic;

namespace IntelliFactory.WebSharper.WinPhone.Runtime
{
    /// <summary>
    /// Exposes the standard filesytem as IFileSystem.
    /// </summary>
    public sealed class DefaultFileSystem : IFileSystem
    {
        void IFileSystem.CreateDirectory(string path)
        {
            Directory.CreateDirectory(path);
        }

        void IFileSystem.DeleteDirectory(string path)
        {
            Directory.Delete(path, true);
        }

        void IFileSystem.DeleteFile(string path)
        {
            File.Delete(path);
        }

        bool IFileSystem.DirectoryExists(string path)
        {
            return Directory.Exists(path);
        }

        IEnumerable<string> IFileSystem.GetDirectories(string path)
        {
            return Directory.GetDirectories(path);
        }

        IEnumerable<string> IFileSystem.GetFiles(string path)
        {
            return Directory.GetFiles(path);
        }

        byte[] IFileSystem.ReadAllBytes(string path)
        {
            using (var stream = File.OpenRead(path))
            {
                using (var memory = new MemoryStream())
                {
                    stream.CopyTo(memory);
                    return memory.ToArray();
                }
            }
        }

        void IFileSystem.WriteAllBytes(string path, byte[] data)
        {
            using (var stream = File.OpenWrite(path))
            {
                stream.Write(data, 0, data.Length);
            }
        }
    }
}
