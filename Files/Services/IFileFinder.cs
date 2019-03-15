using System;
using System.Collections.Generic;
using System.IO;

namespace Files.Services
{
    public interface IFileFinder
    {
        /// <summary>
        /// Enumerate through the directories marked as having content.
        /// </summary>
        /// <param name="path">The path to search.</param>
        /// <param name="searchPattern">The pattern to search for.</param>
        /// <param name="searchOption">The search options</param>
        /// <returns></returns>
        IEnumerable<String> GetDirectories(String path, String searchPattern = "*", SearchOption searchOption = SearchOption.TopDirectoryOnly);

        /// <summary>
        /// Enumerate through the files marked as having content.
        /// </summary>
        /// <param name="path">The path to search.</param>
        /// <param name="searchPattern">The pattern to search for.</param>
        /// <param name="searchOption">The search options</param>
        /// <returns></returns>
        IEnumerable<String> GetFiles(String path, String searchPattern = "*", SearchOption searchOption = SearchOption.TopDirectoryOnly);

        /// <summary>
        /// Open a writable stream. The caller must dispose the stream.
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        Stream OpenWriteStream(string file);

        /// <summary>
        /// Delete a file from the project.
        /// </summary>
        /// <param name="file">The file to delete.</param>
        void DeleteFile(string file);
    }
}