using Halcyon.HAL.Attributes;
using Files.Controllers;
using Files.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Threax.AspNetCore.Halcyon.Ext;
using Threax.AspNetCore.Halcyon.Ext.ValueProviders;
using Threax.AspNetCore.Models;
using System.ComponentModel.DataAnnotations;

namespace Files.InputModels
{
    [HalModel]
    public partial class PathInfoQuery : PagedCollectionQuery
    {
        /// <summary>
        /// Get the PathInfo for a specific path.
        /// </summary>
        public String Path { get; set; }

        /// <summary>
        /// List the files in the given directory.
        /// </summary>
        [UiSearch]
        public String Directory { get; set; }

        /// <summary>
        /// The search pattern to look for.
        /// </summary>
        [UiSearch]
        public String Pattern { get; set; }

        /// <summary>
        /// List files and folders recursively.
        /// </summary>
        [UiSearch]
        public bool Recursive { get; set; }
    }
}