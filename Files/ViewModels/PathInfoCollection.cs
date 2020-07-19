using Halcyon.HAL.Attributes;
using Files.Controllers.Api;
using Files.InputModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Threax.AspNetCore.Halcyon.Ext;

namespace Files.ViewModels
{
    [HalModel]
    [CacheEndpointDoc]
    [HalSelfActionLink(typeof(PathInfosController), nameof(PathInfosController.List))]
    [HalActionLink(typeof(PathInfosController), nameof(PathInfosController.Get), DocsOnly = true)] //This provides access to docs for showing items
    [HalActionLink(typeof(PathInfosController), nameof(PathInfosController.List), DocsOnly = true)] //This provides docs for searching the list
    //[HalActionLink(typeof(PathInfosController), nameof(PathInfosController.Update), DocsOnly = true)] //This provides access to docs for updating items if the ui has different modes
    [HalActionLink(typeof(PathInfosController), nameof(PathInfosController.Add))]
    [DeclareHalLink(typeof(PathInfosController), nameof(PathInfosController.List), PagedCollectionView<Object>.Rels.Next, ResponseOnly = true)]
    [DeclareHalLink(typeof(PathInfosController), nameof(PathInfosController.List), PagedCollectionView<Object>.Rels.Previous, ResponseOnly = true)]
    [DeclareHalLink(typeof(PathInfosController), nameof(PathInfosController.List), PagedCollectionView<Object>.Rels.First, ResponseOnly = true)]
    [DeclareHalLink(typeof(PathInfosController), nameof(PathInfosController.List), PagedCollectionView<Object>.Rels.Last, ResponseOnly = true)]
    public partial class PathInfoCollection : PagedCollectionViewWithQuery<PathInfo, PathInfoQuery>
    {
        public PathInfoCollection(PathInfoQuery query, int total, IEnumerable<PathInfo> items) : base(query, total, items)
        {
            
        }
    }
}