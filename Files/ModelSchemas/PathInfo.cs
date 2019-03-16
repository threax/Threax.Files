using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Threax.AspNetCore.Models;

namespace Files.ModelSchemas
{
    [NoEntity]
    public class PathInfo
    {
        public bool IsDirectory { get; set; }

        public String Path { get; set; }
    }
}
