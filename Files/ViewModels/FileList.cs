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
    [HalActionLink(UploadController.Rels.ListUploadedFiles, typeof(UploadController))]
    [HalActionLink(UploadController.Rels.UploadFile, typeof(UploadController))]
    [HalActionLink(UploadController.Rels.DeleteFile, typeof(UploadController))]
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
