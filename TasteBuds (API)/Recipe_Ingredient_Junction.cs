
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

[PrimaryKey(nameof(Recipe_id), nameof(Ingredient_id))]
public class Recipe_Ingredient_Junction
    {
    public int Recipe_id { get; set; }
    public int Ingredient_id { get; set; }
    public decimal Quantity { get; set; }
    public string Quantity_measurement { get; set; } = string.Empty;
}

