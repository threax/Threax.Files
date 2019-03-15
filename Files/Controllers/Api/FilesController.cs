using Files.InputModels;
using Files.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
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
    public class FilesController : Controller
    {
        public static class Rels
        {
            public const String UploadFile = "UploadFile";
            public const String ListUploadedFiles = "ListUploadedFiles";
            public const String DeleteFile = "DeleteFile";
            public const String Download = "Download";
        }

        private IFileRepository fileRepo;

        public FilesController(IFileRepository fileRepo)
        {
            this.fileRepo = fileRepo;
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

            return new FileList
            {
                Directories = fileRepo.GetDirectories(dir).Select(i => i.Replace('\\', '/')),
                Files = fileRepo.GetFiles(dir).Select(i => i.Replace('\\', '/')),
                Path = dir
            };
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
            using (var uploadStream = input.Content.OpenReadStream())
            {
                await fileRepo.SaveFile(input.File, input.Content.ContentType, uploadStream);
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
            fileRepo.DeleteFile(query.File);
        }

        /// <summary>
        /// Get a single value.
        /// </summary>
        /// <param name="file">The file to download.</param>
        /// <param name="contentTypeProvider">The content type provider from services.</param>
        /// <returns></returns>
        [HttpGet("{File}")]
        [HalRel(Rels.Download)]
        [Route("api/download/{*file}")]
        public FileStreamResult Download(String file, [FromServices] IContentTypeProvider contentTypeProvider)
        {
            String contentType;
            if (!contentTypeProvider.TryGetContentType(file, out contentType))
            {
                throw new FileNotFoundException($"Cannot find file type for '{file}'", file);
            }
            if (contentType?.Equals("text/html", StringComparison.InvariantCultureIgnoreCase) == true)
            {
                contentType = "text";
            }

            return new FileStreamResult(fileRepo.OpenFile(file), contentType);
        }
    }
}
