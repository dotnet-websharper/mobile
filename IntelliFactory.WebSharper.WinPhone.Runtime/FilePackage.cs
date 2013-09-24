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
using System.Linq;

namespace IntelliFactory.WebSharper.WinPhone.Runtime
{
    /// <summary>
    /// Represents directory contents: files and folders realtive
    /// to a common root.  Has a binary compressed representation.
    /// </summary>
    public sealed class FilePackage
    {
        private Dictionary<string, bool> dirs;
        private Dictionary<string, byte[]> files;

        private FilePackage(Dictionary<string, bool> dirs, Dictionary<string, byte[]> files)
        {
            this.dirs = dirs;
            this.files = files;
        }

        /// <summary>
        /// Formats the package to readable representation.
        /// </summary>
        override public string ToString()
        {
            using (var w = new StringWriter())
            {
                foreach (var d in dirs)
                {
                    w.WriteLine("{0}", d.Key);
                }
                foreach (var f in files)
                {
                    w.WriteLine("{0}: {1} bytes", f.Key, f.Value.Length);
                }
                return w.ToString();
            }
        }

        /// <summary>
        /// Writes the package contents to an arbitrary filesystem.
        /// </summary>
        public void Write(IFileSystem fileSystem, string path)
        {
            if (!fileSystem.DirectoryExists(path))
            {
                fileSystem.CreateDirectory(path);
            }
            foreach (var d in dirs)
            {
                var p = Path.Combine(path, d.Key);
                if (!fileSystem.DirectoryExists(p))
                {
                    fileSystem.CreateDirectory(p);
                }
            }
            foreach (var f in files)
            {
                var p = Path.Combine(path, f.Key);
                fileSystem.WriteAllBytes(p, f.Value);
            }
        }

        /// <summary>
        /// Writes a compressed binary representation of the package.
        /// </summary>
        public void WriteBinary(Stream output)
        {
            using (var w = new BinaryWriter(output))
            {
                w.Write(dirs.Count);
                foreach (var d in dirs)
                {
                    w.Write(d.Key);
                }
                w.Write(files.Count);
                foreach (var f in files)
                {
                    w.Write(f.Key);
                    w.Write(f.Value.Length);
                    w.Write(f.Value);
                }
            }
        }

        /// <summary>
        /// Writes to a new or existing binary file.
        /// </summary>
        public void WriteBinaryFile(string path)
        {
            var dir = Path.GetDirectoryName(path);
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
            using (var stream = File.Open(path, FileMode.Create))
            {
                this.WriteBinary(stream);
            }
        }

        ///<summary>
        /// Writes to a regular directory.
        /// </summary>
        public void WriteDirectory(string path)
        {
            this.Write(new DefaultFileSystem(), path);
        }

        /// <summary>
        /// Writes to isolated storage.
        /// </summary>
        public void WriteToIsolatedStorage(IsolatedStorageFile root, string path)
        {
            this.Write(new IsolatedStorageFileSystem(root), path);
        }

        /// <summary>
        /// Reads the package contents from an arbitrary filesystem.
        /// </summary>
        public static FilePackage Read(IFileSystem fileSystem, string path)
        {
            var dirs = new Dictionary<string, bool>();
            var files = new Dictionary<string, byte[]>();
            if (!fileSystem.DirectoryExists(path))
            {
                throw new ArgumentException("The directory does not exist: " + path);
            }
            ReadVisitDirectory(fileSystem, dirs, files, ".", path);
            return new FilePackage(dirs, files);
        }

        private static void ReadVisitDirectory(
            IFileSystem fileSystem,
            Dictionary<string, bool> dirs,
            Dictionary<string, byte[]> files,
            string path,
            string dir)
        {
            foreach (var d in fileSystem.GetDirectories(dir))
            {
                var n = Path.GetFileName(d);
                var relativePath = Path.Combine(path, n);
                if (!dirs.ContainsKey(relativePath))
                {
                    dirs[relativePath] = true;
                    ReadVisitDirectory(fileSystem, dirs, files, relativePath, d);
                }
            }
            foreach (var f in fileSystem.GetFiles(dir))
            {
                files[Path.Combine(path, Path.GetFileName(f))] =
                    fileSystem.ReadAllBytes(f);
            }
        }

        /// <summary>
        /// Reads a compressed binary representation of the package.
        /// </summary>
        public static FilePackage ReadBinary(Stream input)
        {
            var dirs = new Dictionary<string, bool>();
            var files = new Dictionary<string, byte[]>();
            using (var r = new BinaryReader(input))
            {
                var nDirs = r.ReadInt32();
                for (var i = 0; i < nDirs; i++)
                {
                    dirs[r.ReadString()] = true;
                }
                var nFiles = r.ReadInt32();
                for (var i = 0; i < nFiles; i++)
                {
                    var path = r.ReadString();
                    var length = r.ReadInt32();
                    var data = r.ReadBytes(length);
                    files[path] = data;
                }
                return new FilePackage(dirs, files);
            }
        }

        /// <summary>
        /// Reads an existing binary file.
        /// </summary>
        public static FilePackage ReadBinaryFile(string path)
        {
            using (var stream = File.Open(path, FileMode.Open))
            {
                return FilePackage.ReadBinary(stream);
            }
        }

        /// <summary>
        /// Reads a regular directory.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static FilePackage ReadDirectory(string path)
        {
            return FilePackage.Read(new DefaultFileSystem(), path);
        }

        /// <summary>
        /// Reads from isolated storage.
        /// </summary>
        public static FilePackage ReadFromIsolatedStorage(IsolatedStorageFile root, string path)
        {
            return FilePackage.Read(new IsolatedStorageFileSystem(root), path);
        }
    }
}
