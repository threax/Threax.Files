using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Halcyon.HAL.Attributes;
using Threax.AspNetCore.Halcyon.Ext;
using Threax.AspNetCore.Models;
using Threax.AspNetCore.Halcyon.Ext.ValueProviders;
using Microsoft.AspNetCore.Http;

namespace Files.InputModels 
{
    [HalModel]
    [CacheEndpointDoc]
    public partial class PathInfoInput
    {
        public String Path { get; set; }

        public IFormFile File { get; set; }
    }
}
