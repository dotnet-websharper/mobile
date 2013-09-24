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
using System.IO;
using System.IO.IsolatedStorage;
using System.Collections.Generic;

namespace IntelliFactory.WebSharper.WinPhone.Runtime
{
    /// <summary>
    /// Implements a filesystem view of the isolated storage.
    /// </summary>
    public sealed class IsolatedStorageFileSystem : IFileSystem
    {
        private IsolatedStorageFile root;

        /// <summary>
        /// Constructs with a given IsolatedStorage root.
        /// </summary>
        public IsolatedStorageFileSystem(IsolatedStorageFile root)
        {
            this.root = root;
        }

        void IFileSystem.CreateDirectory(string path)
        {
            root.CreateDirectory(path);
        }

        private void DeleteDirectory(string path)
        {
            foreach (var d in GetDirectories(path))
            {
                DeleteDirectory(d);
            }
            foreach (var f in GetFiles(path))
            {
                root.DeleteFile(f);
            }
            root.DeleteDirectory(path);
        }

        void IFileSystem.DeleteDirectory(string path)
        {
            DeleteDirectory(path);
        }

        void IFileSystem.DeleteFile(string path)
        {
            root.DeleteFile(path);
        }

        bool IFileSystem.DirectoryExists(string path)
        {
            return String.IsNullOrEmpty(path) || path == "." || root.DirectoryExists(path);
        }

        private IEnumerable<string> GetDirectories(string path)
        {
            return root.GetDirectoryNames(Path.Combine(path, "*.*"));
        }

        private IEnumerable<string> GetFiles(string path)
        {
            return root.GetFileNames(Path.Combine(path, "*.*"));
        }

        IEnumerable<string> IFileSystem.GetDirectories(string path)
        {
            return GetDirectories(path);
        }

        IEnumerable<string> IFileSystem.GetFiles(string path)
        {
            return GetFiles(path);
        }

        byte[] IFileSystem.ReadAllBytes(string path)
        {
            using (var stream = root.OpenFile(path, FileMode.Open))
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
            using (var stream = root.OpenFile(path, FileMode.Create))
            {
                stream.Write(data, 0, data.Length);
            }
        }
    }
}
