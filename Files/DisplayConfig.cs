using Files.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Files
{
    public class DisplayConfig
    {
        /// <summary>
        /// The name of the site. Will be reflected in various places.
        /// </summary>
        public string SiteName { get; set; } = "Files";

        /// <summary>
        /// The name of the favicon. Will be served as the favicon.
        /// </summary>
        public string Favicon { get; set; } = "~/icons/favicon_file.ico";

        /// <summary>
        /// The name of the icon. Will be used in the manifest.
        /// </summary>
        public Icon Icon { get; set; } = new Icon()
        {
            src = "~/icons/icon_file.png",
            sizes = "512x512"
        };
    }
}
