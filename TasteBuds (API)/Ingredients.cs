using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Ingredients
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Ingredient_id { get; set; }
    public string Ingredient_name { get; set; } = string.Empty;
    public byte Is_Vegan { get; set; }
    public byte Is_Vegetarian { get; set; }
    public byte Is_GlutenFree { get; set; }
}