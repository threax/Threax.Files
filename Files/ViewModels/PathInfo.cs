using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Halcyon.HAL.Attributes;
using Threax.AspNetCore.Halcyon.Ext;
using Threax.AspNetCore.Models;
using Threax.AspNetCore.Tracking;
using Files.Controllers.Api;
using Threax.AspNetCore.Halcyon.Ext.ValueProviders;

namespace Files.ViewModels 
{
    [HalModel]
    [HalSelfActionLink(typeof(PathInfosController), nameof(PathInfosController.Get))]
    //[HalActionLink(typeof(PathInfosController), nameof(PathInfosController.Update))]
    [HalActionLink(typeof(PathInfosController), nameof(PathInfosController.Delete))]
    public partial class PathInfo
    {
        public bool IsDirectory { get; set; }

        public String Path { get; set; }

    }
}
