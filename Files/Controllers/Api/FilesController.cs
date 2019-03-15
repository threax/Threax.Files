using Files.InputModels;
using Files.Services;
using Files.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Threax.AspNetCore.FileRepository;
using Threax.AspNetCore.Halcyon.Ext;

namespace Files.Controllers.Api
{
    [Authorize(AuthenticationSchemes = AuthCoreSchemes.Bearer)]
    [Route("api/[controller]/[action]")]
    [ResponseCache(NoStore = true)]
    public class UploadController : Controller
    {
        public static class Rels
        {
            public const String UploadFile = "UploadFile";
            public const String ListUploadedFiles = "ListUploadedFiles";
            public const String DeleteFile = "DeleteFile";
        }

        private IFileFinder fileFinder;
        private ITargetFileInfoProvider fileInfoProvider;

        /// <summary>
        /// Controller.
        /// </summary>
        /// <param name="fileFinder"></param>
        /// <param name="fileInfoProvider">The file info provider.</param>
        public UploadController(IFileFinder fileFinder, ITargetFileInfoProvider fileInfoProvider)
        {
            this.fileFinder = fileFinder;
            this.fileInfoProvider = fileInfoProvider;
        }

        /// <summary>
        /// List the files in dir.
        /// </summary>
        /// <param name="query">The query with the directory to list the files under.</param>
        /// <returns>A list of files under dir.</returns>
        [HttpGet]
        [HalRel(Rels.ListUploadedFiles)]
        public FileList List([FromQuery] ListFileQuery query)
        {
            var dir = query.Dir;

            if (dir == null)
            {
                dir = "";
            }

            dir = RemovePathBase(dir, HttpContext.Request.PathBase);

            return new FileList
            {
                Directories = fileFinder.GetDirectories(dir).Select(i => i.Replace('\\', '/')),
                Files = fileFinder.GetFiles(dir).Select(i => i.Replace('\\', '/')),
                Path = dir
            };
        }

        private static string RemovePathBase(string path, string pathBase)
        {
            if (pathBase != null && path != null && path.StartsWith(pathBase, StringComparison.OrdinalIgnoreCase))
            {
                path = path.Substring(pathBase.Length);
            }

            return path;
        }

        /// <summary>
        /// Uplaod a new file.
        /// </summary>
        /// <param name="input">The upload input data.</param>
        /// <param name="fileVerifier">The file verifier.</param>
        /// <returns></returns>
        [HttpPost]
        [HalRel(Rels.UploadFile)]
        public async Task Upload([FromForm] UploadInput input, [FromServices] IFileVerifier fileVerifier)
        {
            var fileInfo = fileInfoProvider.GetFileInfo(input.File, HttpContext.Request.PathBase);
            using (var uploadStream = input.Content.OpenReadStream())
            {
                fileVerifier.Validate(uploadStream, fileInfo.DerivedFileName, input.Content.ContentType);
                using (Stream stream = fileFinder.OpenWriteStream(fileInfo.DerivedFileName))
                {
                    await uploadStream.CopyToAsync(stream);
                }
            }
        }

        /// <summary>
        /// Delete a file.
        /// </summary>
        /// <param name="query">The query.</param>
        /// <returns></returns>
        [HttpDelete]
        [HalRel(Rels.DeleteFile)]
        public void Delete([FromQuery] DeleteFileQuery query)
        {
            var fileInfo = fileInfoProvider.GetFileInfo(query.File, HttpContext.Request.PathBase);
            fileFinder.DeleteFile(fileInfo.DerivedFileName);
        }
    }
}
