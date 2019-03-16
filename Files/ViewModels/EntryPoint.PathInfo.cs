using Halcyon.HAL.Attributes;
using Threax.AspNetCore.Halcyon.Ext;
using Files.Controllers.Api;

namespace Files.ViewModels
{
    [HalActionLink(typeof(PathInfosController), nameof(PathInfosController.List), "ListPathInfos")]
    [HalActionLink(typeof(PathInfosController), nameof(PathInfosController.Add), "AddPathInfo")]
    public partial class EntryPoint
    {
        
    }
}