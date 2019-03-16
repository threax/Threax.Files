using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Files.InputModels;
using Files.ViewModels;
using Threax.AspNetCore.Halcyon.Ext;

namespace Files.Repository
{
    public partial interface IPathInfoRepository
    {
        Task<PathInfoCollection> List(PathInfoQuery query);

        Task<PathInfo> Get(String path);

        Task<PathInfo> Upload(String directory, String file, Stream fileStream, String mimeType);

        Task Delete(String path);

        Task<Stream> OpenRead(string file);
    }
}