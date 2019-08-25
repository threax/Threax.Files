using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Files.ViewModels
{

    public class WebManifest
    {
        public string name { get; set; }
        public string short_name { get; set; }
        public string description { get; set; }
        public Icon[] icons { get; set; }
        public string start_url { get; set; } = "/AppStart";
        public string display { get; set; } = "standalone";
        public string theme_color { get; set; } = "#222222";
        public string background_color { get; set; } = "#222222";
    }

    public class Icon
    {
        public string src { get; set; }
        public string sizes { get; set; }
        public string type { get; set; } = "image/png";
    }

}
