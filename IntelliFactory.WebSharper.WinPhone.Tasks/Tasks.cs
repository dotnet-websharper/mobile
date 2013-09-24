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
