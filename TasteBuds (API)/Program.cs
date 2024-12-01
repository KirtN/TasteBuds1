using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Net;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<RecipesDB>(
    opt => opt.UseSqlServer("Server=.;Initial Catalog=TasteBuds;User Id=TestUser; Password=passwd;Trusted_Connection=True;TrustServerCertificate=True"));
builder.Services.AddDbContext<IngredientsDB>(
    opt => opt.UseSqlServer("Server=.;Initial Catalog=TasteBuds;User Id=TestUser; Password=passwd;Trusted_Connection=True;TrustServerCertificate=True"));
builder.Services.AddDbContext<Recipe_Ingredient_JunctionDB>(
    opt => opt.UseSqlServer("Server=.;Initial Catalog=TasteBuds;User Id=TestUser; Password=passwd;Trusted_Connection=True;TrustServerCertificate=True"));
builder.Services.AddDbContext<Favourite_recipesDB>(
    opt => opt.UseSqlServer("Server=.;Initial Catalog=TasteBuds;User Id=TestUser; Password=passwd;Trusted_Connection=True;TrustServerCertificate=True"));
builder.Services.AddDbContext<Shopping_cartDB>(
    opt => opt.UseSqlServer("Server=.;Initial Catalog=TasteBuds;User Id=TestUser; Password=passwd;Trusted_Connection=True;TrustServerCertificate=True"));
builder.Services.AddDbContext<UserDB>(
    opt => opt.UseSqlServer("Server=.;Initial Catalog=TasteBuds;User Id=TestUser; Password=passwd;Trusted_Connection=True;TrustServerCertificate=True"));
builder.Services.AddDbContext<PantryDB>(
    opt => opt.UseSqlServer("Server=.;Initial Catalog=TasteBuds;User Id=TestUser; Password=passwd;Trusted_Connection=True;TrustServerCertificate=True"));

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapGet("/recipe", async (RecipesDB db) =>
    await db.Recipe.ToListAsync());

app.MapGet("/recipe/{id}", async (int id, RecipesDB db) =>
    await db.Recipe.FindAsync(id)
        is Recipes recipe
            ? Results.Ok(recipe)
            : Results.NotFound());

app.MapPost("/recipe", async ([AsParameters] Recipes recipe, RecipesDB db) =>
{
    db.Recipe.Add(recipe);
    await db.SaveChangesAsync();

    return Results.Created($"/recipe/{recipe.Recipe_id}", recipe);
});

app.MapPut("/recipe/{id}", async (int id, Recipes inputRecipe, RecipesDB db) =>
{
    var recipe = await db.Recipe.FindAsync(id);

    if (recipe is null) return Results.NotFound();

    recipe.Recipe_name = inputRecipe.Recipe_name;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/recipe/{id}", async (int id, RecipesDB db) =>
{
    if (await db.Recipe.FindAsync(id) is Recipes recipe)
    {
        db.Recipe.Remove(recipe);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.MapGet("/ingredient", async (IngredientsDB db) =>
    await db.Ingredient.ToListAsync());

app.MapGet("/ingredient/{id}", async (int id, IngredientsDB db) =>
    await db.Ingredient.FindAsync(id)
        is Ingredients ingredient
            ? Results.Ok(ingredient)
            : Results.NotFound());



//GET_POST_DELETE for RECIPE_ING_JUNCTION
app.MapGet("/Recipe_Ingredient_Junction", async (Recipe_Ingredient_JunctionDB db) =>
    await db.Recipe_Ingredient_Junction.ToListAsync());

app.MapGet("/Recipe_Ingredient_Junction/{id}", async (int id, Recipe_Ingredient_JunctionDB db) =>
    await db.Recipe_Ingredient_Junction.FindAsync(id)
        is Recipe_Ingredient_Junction Recipe_Ingredient_Junction
            ? Results.Ok(Recipe_Ingredient_Junction)
            : Results.NotFound());

app.MapPost("/Recipe_Ingredient_Junction", async ([AsParameters] Recipe_Ingredient_Junction recipe_Ingredient_Junction, Recipe_Ingredient_JunctionDB db) =>
{
    db.Recipe_Ingredient_Junction.Add(recipe_Ingredient_Junction);
    await db.SaveChangesAsync();

    return Results.Created($"/Recipe_Ingredient_Junction/{recipe_Ingredient_Junction.Recipe_id}", recipe_Ingredient_Junction);
});

app.MapDelete("/Recipe_Ingredient_Junction/{id}", async (int id, Recipe_Ingredient_JunctionDB db) =>
{
    if (await db.Recipe_Ingredient_Junction.FindAsync(id) is Recipe_Ingredient_Junction Recipe_Ingredient_Junction)
    {
        db.Recipe_Ingredient_Junction.Remove(Recipe_Ingredient_Junction);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

//GET_POST_DELETE FOR FAV_RECIPE
app.MapGet("/Favourite_recipes", async (Favourite_recipesDB db) =>
await db.Favourite_recipes.ToListAsync());

app.MapGet("/Favourite_recipes/{id}", async (int id, Favourite_recipesDB db) =>
    await db.Favourite_recipes.FindAsync(id)
        is Favourite_recipes Favourite_recipes
            ? Results.Ok(Favourite_recipes)
            : Results.NotFound());

app.MapPost("/Favourite_recipes", async ([AsParameters] Favourite_recipes favourite_recipes, Favourite_recipesDB db) =>
{
    db.Favourite_recipes.Add(favourite_recipes);
    await db.SaveChangesAsync();

    return Results.Created($"/Favourite_recipes/{favourite_recipes.List_id}", favourite_recipes);
});

app.MapDelete("/Favourite_recipes/{id}", async (int id, Favourite_recipesDB db) =>
{
    if (await db.Favourite_recipes.FindAsync(id) is Favourite_recipes Favourite_recipes)
    {
        db.Favourite_recipes.Remove(Favourite_recipes);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

//GET_POST_DELETE FOR SHOPPING_CART
app.MapGet("/Shopping_cart", async (Shopping_cartDB db) =>
await db.Shopping_cart.ToListAsync());

app.MapGet("/Shopping_cart/{id}", async (int id, Shopping_cartDB db) =>
    await db.Shopping_cart.FindAsync(id)
        is Shopping_cart Shopping_cart
            ? Results.Ok(Shopping_cart)
            : Results.NotFound());

app.MapPost("/Shopping_cart", async ([AsParameters] Shopping_cart shopping_cart, Shopping_cartDB db) =>
{
    db.Shopping_cart.Add(shopping_cart);
    await db.SaveChangesAsync();

    return Results.Created($"/Shopping_cart/{shopping_cart.User_id}-{shopping_cart.Ingredient_id}", shopping_cart);
});

app.MapDelete("/Shopping_cart/{id}", async (int id, Shopping_cartDB db) =>
{
    if (await db.Shopping_cart.FindAsync(id) is Shopping_cart Shopping_Cart)
    {
        db.Shopping_cart.Remove(Shopping_Cart);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

//MAP_GET_POST FOR USER
app.MapGet("/User", async (UserDB db) =>
await db.User.ToListAsync());

app.MapGet("/User/{id}", async (int id, UserDB db) =>
    await db.User.FindAsync(id)
        is User User
            ? Results.Ok(User)
            : Results.NotFound());

//app.MapPost("/User", async (string username, string first_name, string last_name, string email, string password, UserDB db) =>
//{
//    Console.WriteLine(username);
//    Console.WriteLine(first_name);
//    Console.WriteLine(last_name);
//    Console.WriteLine(email);
//    Console.WriteLine(password);
//    User user = new User(username, first_name, last_name, email, password);
//    db.User.Add(user);
//    await db.SaveChangesAsync();

//    return Results.Created($"/User/{user.User_id}", user);
//});
app.MapPost("/User", async (User User, UserDB db) =>
{
    db.User.Add(User);
    await db.SaveChangesAsync();

    return Results.Created($"/User/{User.User_id}", User);
});

app.MapDelete("/User/{id}", async (int id, UserDB db) =>
{
    if (await db.User.FindAsync(id) is User User)
    {
        db.User.Remove(User);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

//Pantry
app.MapGet("/Pantry", async (PantryDB db) =>
await db.Pantry.ToListAsync());

app.MapGet("/Pantry/{id}", async (int id, PantryDB db) =>
    await db.Pantry.FindAsync(id)
        is Pantry Pantry
            ? Results.Ok(Pantry)
            : Results.NotFound());

app.MapPost("/Pantry", async ([AsParameters] Pantry Pantry, PantryDB db) =>
{
    db.Pantry.Add(Pantry);
    await db.SaveChangesAsync();

    return Results.Created($"/Pantry/{Pantry.User_id}", Pantry);
});

app.MapDelete("/Pantry/{id}", async (int id, PantryDB db) =>
{
    if (await db.Pantry.FindAsync(id) is Pantry Pantry)
    {
        db.Pantry.Remove(Pantry);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.MapPut("/pantry", async ([AsParameters] Pantry newPantry, PantryDB db) =>
{
    var pantry = await db.Pantry.FindAsync(newPantry.User_id, newPantry.Ingredient_id);

    if (pantry is null) return Results.NotFound();

    pantry.Quantity = newPantry.Quantity;

    await db.SaveChangesAsync();

    return Results.NoContent();
});


app.MapGet("/Recipe_Search/{ingredient_id}", async (int ingredient_id, Recipe_Ingredient_JunctionDB db) =>
    await db.Recipe_Ingredient_Junction.FindAsync(ingredient_id)
        is Recipe_Ingredient_Junction Recipe
            ? Results.Ok(Recipe)
            : Results.NotFound());


app.Run();

//mapget, mappost, mapdelete for every table
//user, shopping cart, fav recipe, recip-ing-junction
//create ingredient.cs and ingredoient.DB
