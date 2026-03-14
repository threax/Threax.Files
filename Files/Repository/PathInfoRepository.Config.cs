using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Threax.ReflectedServices;

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