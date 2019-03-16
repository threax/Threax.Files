using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Files.Repository;
using Threax.AspNetCore.Halcyon.Ext;
using Files.ViewModels;
using Files.InputModels;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;

namespace Files.Controllers.Api
{
    [Route("api/[controller]")]
    [ResponseCache(NoStore = true)]
    [Authorize(AuthenticationSchemes = AuthCoreSchemes.Bearer)]
    public partial class PathInfosController : Controller
    {
        private IPathInfoRepository repo;

        public PathInfosController(IPathInfoRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        [HalRel(CrudRels.List)]
        public async Task<PathInfoCollection> List([FromQuery] PathInfoQuery query)
        {
            return await repo.List(query);
        }

        [HttpGet("{Path}")]
        [HalRel(CrudRels.Get)]
        public async Task<PathInfo> Get(String path)
        {
            return await repo.Get(path);
        }

        [HttpPost]
        [HalRel(CrudRels.Add)]
        [AutoValidate("Cannot add new pathInfo")]
        public async Task<PathInfo> Add([FromForm]PathInfoInput pathInfo)
        {
            using (var read = pathInfo.File.OpenReadStream())
            {
                return await repo.Upload("", Path.GetFileName(pathInfo.File.FileName), read, pathInfo.File.ContentType);
            }
        }

        [HttpDelete("{Path}")]
        [HalRel(CrudRels.Delete)]
        public async Task Delete(String path)
        {
            await repo.Delete(path);
        }

        /// <summary>
        /// Get a single value.
        /// </summary>
        /// <param name="path">The file to download.</param>
        /// <param name="contentTypeProvider">The content type provider from services.</param>
        /// <returns></returns>
        [HttpGet("[action]/{Path}")]
        [HalRel("Download")]
        public async Task<FileStreamResult> Download(String path, [FromServices] IContentTypeProvider contentTypeProvider)
        {
            String contentType;
            if (!contentTypeProvider.TryGetContentType(path, out contentType))
            {
                throw new FileNotFoundException($"Cannot find file type for '{path}'", path);
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