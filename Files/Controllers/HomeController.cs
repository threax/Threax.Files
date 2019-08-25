using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Files.ViewModels;

namespace Files.Controllers
{
    [Authorize(AuthenticationSchemes = AuthCoreSchemes.Cookies)]
    public partial class HomeController : Controller
    {
        //You can get rid of this AllowAnonymous to secure the welcome page
        public IActionResult Index()
        {
            return View();
        }

        [Route("webmanifest.json")]
        [AllowAnonymous]
        public IActionResult Manifest([FromServices] DisplayConfig appConfig)
        {
            return Json(new WebManifest()
            {
                name = appConfig.SiteName,
                short_name = appConfig.SiteName,
                description = $"Files for {appConfig.SiteName}",
                icons = new Icon[]
                {
                    new Icon()
                    {
                        src = Url.Content(appConfig.Icon.src),
                        sizes = appConfig.Icon.sizes,
                        type = appConfig.Icon.type
                    }
                }
            });
        }

        //The other view action methods are in the additional partial classes for HomeController, expand the node for
        //this class to see them.

        //If you need to declare any other view action methods manually, do that here.
    }
}
