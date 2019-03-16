using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Threax.ReflectedServices;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Files.Repository;

namespace Files.Repository.Config
{
    public partial class PathInfoRepositoryConfig : IServiceSetup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            OnConfigureServices(services);

            services.TryAddScoped<IPathInfoRepository, PathInfoRepository>();
        }

        partial void OnConfigureServices(IServiceCollection services);
    }
}