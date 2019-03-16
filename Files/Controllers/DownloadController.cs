using Files.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Threax.AspNetCore.Halcyon.Ext;

namespace Files.Controllers
{
    [Route("[controller]")]
    [ResponseCache(NoStore = true)]
    [Authorize(AuthenticationSchemes = AuthCoreSchemes.Cookies + "," + AuthCoreSchemes.Bearer)]
    public class DownloadController : Controller
    {
        private IPathInfoRepository repo;

        public DownloadController(IPathInfoRepository repo)
        {
            this.repo = repo;
        }

        /// <summary>
        /// Get a single value.
        /// </summary>
        /// <param name="path">The file to download.</param>
        /// <param name="contentTypeProvider">The content type provider from services.</param>
        /// <returns></returns>
        [HttpGet("{*Path}")]
        [HalRel("Download")]
        public async Task<FileStreamResult> Download(String path, [FromServices] IContentTypeProvider contentTypeProvider)
        {
            String contentType;
            if (!contentTypeProvider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
                Response.Headers["Content-Disposition"] = "attachment";
            }
            if (contentType?.Equals("text/html", StringComparison.InvariantCultureIgnoreCase) == true)
            {
                contentType = "application/octet-stream";
                Response.Headers["Content-Disposition"] = "attachment";
            }

            return new FileStreamResult(await repo.OpenRead(path), contentType);
        }
    }
}
