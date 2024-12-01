using Microsoft.EntityFrameworkCore;

class IngredientsDB : DbContext
{
    public IngredientsDB(DbContextOptions<IngredientsDB> options)
        : base(options) { }

    public DbSet<Ingredients> Ingredient => Set<Ingredients>();
}