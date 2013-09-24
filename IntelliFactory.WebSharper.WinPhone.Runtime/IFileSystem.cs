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

using System.Collections.Generic;

namespace IntelliFactory.WebSharper.WinPhone.Runtime
{
    /// <summary>
    /// Abstracts over a file system, such as the default file system or isolated storage.
    /// </summary>
    public interface IFileSystem
    {
        /// <summary>
        /// Creates a directory.
        /// </summary>
        void CreateDirectory(string path);

        /// <summary>
        /// Deletes a directory recursively.
        /// </summary>
        void DeleteDirectory(string path);

        /// <summary>
        /// Deletes a file.
        /// </summary>
        void DeleteFile(string path);

        /// <summary>
        /// Tests if a directory exists.
        /// </summary>
        bool DirectoryExists(string path);

        /// <summary>
        /// Retrieves subdirectories of a directory given by path.
        /// </summary>
        IEnumerable<string> GetDirectories(string path);

        /// <summary>
        /// Retrieves all files in a given directory.
        /// </summary>
        IEnumerable<string> GetFiles(string path);

        /// <summary>
        /// Reads the contents of a file into a byte array.
        /// </summary>
        byte[] ReadAllBytes(string path);

        /// <summary>
        /// Writes a byte array into a file.
        /// </summary>
        void WriteAllBytes(string path, byte[] data);
    }
}
