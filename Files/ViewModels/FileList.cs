using Files.Controllers.Api;
using Halcyon.HAL.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Threax.AspNetCore.Halcyon.Ext;

namespace Files.ViewModels
{
    /// <summary>
    /// A list of files in a directory.
    /// </summary>
    [HalModel]
    [HalActionLink(FilesController.Rels.ListUploadedFiles, typeof(FilesController))]
    [HalActionLink(FilesController.Rels.UploadFile, typeof(FilesController))]
    [HalActionLink(FilesController.Rels.DeleteFile, typeof(FilesController))]
    public class FileList
    {
        /// <summary>
        /// The directories inside this directory.
        /// </summary>
        public IEnumerable<string> Directories { get; set; }

        /// <summary>
        /// The files inside this directory.
        /// </summary>
        public IEnumerable<string> Files { get; set; }

        /// <summary>
        /// The path that this file list represents.
        /// </summary>
        public String Path { get; set; }
    }
}
