using Microsoft.EntityFrameworkCore;

class Favourite_recipesDB : DbContext
{
    public Favourite_recipesDB(DbContextOptions<Favourite_recipesDB> options)
        : base(options) { }

    public DbSet<Favourite_recipes> Favourite_recipes => Set<Favourite_recipes>();
}
