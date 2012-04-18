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
