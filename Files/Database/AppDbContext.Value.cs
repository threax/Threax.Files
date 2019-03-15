using Microsoft.EntityFrameworkCore;

namespace Files.Database
{
    public partial class AppDbContext
    {
        public DbSet<ValueEntity> Values { get; set; }
    }
}
