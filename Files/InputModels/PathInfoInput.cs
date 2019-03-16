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
    public partial class PathInfoInput
    {
        [HiddenUiType]
        public int Nothing { get; set; } //This has to be here or this class won't be detected

        public IFormFile File { get; set; }
    }
}
