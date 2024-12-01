using Microsoft.EntityFrameworkCore;

class Recipe_Ingredient_JunctionDB : DbContext
{
    public Recipe_Ingredient_JunctionDB(DbContextOptions<Recipe_Ingredient_JunctionDB> options)
        : base(options) { }

    public DbSet<Recipe_Ingredient_Junction> Recipe_Ingredient_Junction => Set<Recipe_Ingredient_Junction>();
}
