using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

[PrimaryKey(nameof(User_id), nameof(Ingredient_id))]
public class Pantry
{
    public int User_id { get; set; }
    public int Ingredient_id { get; set; }
    public decimal Quantity { get; set; }
    public string Measurement { get; set; } = string.Empty;
}