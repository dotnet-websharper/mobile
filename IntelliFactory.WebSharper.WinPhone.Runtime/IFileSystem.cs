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
