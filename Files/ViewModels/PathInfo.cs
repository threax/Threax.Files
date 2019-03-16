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
using Files.Controllers;

namespace Files.ViewModels 
{
    [HalModel]
    [HalSelfActionLink(typeof(PathInfosController), nameof(PathInfosController.Get))]
    [HalActionLink(typeof(PathInfosController), nameof(PathInfosController.Delete))]
    [DeclareHalLink(typeof(DownloadController), nameof(DownloadController.Download))]
    public partial class PathInfo : IHalLinkProvider
    {
        public bool IsFile { get; set; }

        public String Path { get; set; }

        public IEnumerable<HalLinkAttribute> CreateHalLinks(ILinkProviderContext context)
        {
            if (IsFile)
            {
                yield return new HalActionLinkAttribute(typeof(DownloadController), nameof(DownloadController.Download));
            }
        }
    }
}
