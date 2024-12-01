using Microsoft.EntityFrameworkCore;

class PantryDB : DbContext
{
    public PantryDB(DbContextOptions<PantryDB> options)
        : base(options) { }

    public DbSet<Pantry> Pantry => Set<Pantry>();
}
