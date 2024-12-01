using Microsoft.EntityFrameworkCore;

class RecipesDB : DbContext
{
    public RecipesDB(DbContextOptions<RecipesDB> options)
        : base(options) { }

    public DbSet<Recipes> Recipe => Set<Recipes>();
}