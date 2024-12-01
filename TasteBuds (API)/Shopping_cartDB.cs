using Microsoft.EntityFrameworkCore;

class Shopping_cartDB : DbContext
{
    public Shopping_cartDB(DbContextOptions<Shopping_cartDB> options)
        : base(options) { }

    public DbSet<Shopping_cart> Shopping_cart => Set<Shopping_cart>();
}
