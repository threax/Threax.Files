using Halcyon.HAL.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Files.InputModels
{
    [HalModel]
    public class DeleteFileQuery
    {
        public String File { get; set; }
    }
}
