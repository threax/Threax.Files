using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Files.Database;
using Files.InputModels;
using Files.ViewModels;
using Files.Mappers;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Threax.AspNetCore.Halcyon.Ext;
using Threax.AspNetCore.FileRepository;
using System.IO;

namespace Files.Repository
{
    public partial class PathInfoRepository : IPathInfoRepository
    {
        private IFileRepository fileRepo;

        public PathInfoRepository(IFileRepository fileRepo)
        {
            this.fileRepo = fileRepo;
        }

        public async Task<PathInfoCollection> List(PathInfoQuery query)
        {
            if(query.Path != null)
            {
                return new PathInfoCollection(query, 1, new PathInfo[] { await Get(query.Path) });
            }

            var dir = query.Directory != null ? query.Directory : "";
            var pattern = String.IsNullOrEmpty(query.Pattern) ? "*" : query.Pattern;
            var searchOption = query.Recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;

            var repoDirs = await fileRepo.GetDirectories(dir, pattern, searchOption);

            var directories = repoDirs.Select(i => i.Replace('\\', '/'))
                                      .Select(i => new PathInfo()
                                      {
                                          Path = i,
                                          IsDirectory = true
                                      });

            var repoFiles = await fileRepo.GetFiles(dir, pattern, searchOption);

            var files = repoFiles.Select(i => i.Replace('\\', '/'))
                                 .Select(i => new PathInfo()
                                 {
                                     Path = i,
                                     IsDirectory = true
                                 });

            var total = repoDirs.Concat(repoFiles).Count();

            var dbQuery = directories.Concat(files);
            dbQuery = dbQuery.Skip(query.SkipTo(total)).Take(query.Limit);

            return new PathInfoCollection(query, total, dbQuery);
        }

        public async Task<PathInfo> Get(String path)
        {
            return new PathInfo()
            {
                Path = path,
                IsDirectory = await this.fileRepo.DirectoryExists(path)
            };
        }

        public async Task<PathInfo> Upload(String directory, String file, Stream fileStream, String mimeType)
        {
            var path = Path.Combine(directory, file);
            await this.fileRepo.WriteFile(path, mimeType, fileStream);
            return new PathInfo()
            {
                Path = path,
                IsDirectory = false
            };
        }

        public async Task Delete(String path)
        {
            if(await this.fileRepo.DirectoryExists(path))
            {
                await this.fileRepo.DeleteDirectory(path, true);
            }
            else if(await this.fileRepo.FileExists(path))
            {
                await this.fileRepo.DeleteFile(path);
            }
        }
    }
}