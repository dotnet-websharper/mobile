using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;
using IntelliFactory.WebSharper.WinPhone.Runtime;

namespace IntelliFactory.WebSharper.WinPhone.Tasks
{
    /// <summary>
    /// An MSBuild task for packaging a folder into a binary file
    /// that Windows Phone application can later read.
    /// </summary>
    public class PackageForWinPhone : Task
    {
        private string packageFile;
        private string sourceDirectory;

        /// <summary>
        /// The path of the input directory.
        /// </summary>
        [Required]
        public string SourceDirectory
        {
            get { return sourceDirectory; }
            set { sourceDirectory = value; }
        }

        /// <summary>
        /// The path of the output (package) file.
        /// </summary>
        [Required]
        public string PackageFile
        {
            get { return packageFile; }
            set { packageFile = value; }
        }

        /// <summary>
        /// Runs the task.
        /// </summary>
        public override bool Execute()
        {
            try
            {
                FilePackage
                    .ReadDirectory(SourceDirectory)
                    .WriteBinaryFile(PackageFile);
                return true;
            }
            catch (Exception e)
            {
                Log.LogErrorFromException(e);
                return false;
            }
        }
    }
}
