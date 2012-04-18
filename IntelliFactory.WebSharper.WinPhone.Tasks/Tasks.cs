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

        [Required]
        public string SourceDirectory
        {
            get { return sourceDirectory; }
            set { sourceDirectory = value; }
        }

        [Required]
        public string PackageFile
        {
            get { return packageFile; }
            set { packageFile = value; }
        }

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
