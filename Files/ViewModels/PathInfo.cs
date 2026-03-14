using Files.Controllers;
using Files.Controllers.Api;
using Halcyon.HAL.Attributes;
using System;
using System.Collections.Generic;
using Threax.AspNetCore.Halcyon.Ext;

namespace Files.ViewModels 
{
    [HalModel]
    [CacheEndpointDoc]
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
