using System.ComponentModel.DataAnnotations;

public class Recipes
{
    [Key]
    public int Recipe_id { get; set; }
    public string Recipe_name { get; set; } = string.Empty;
    public string Recipe_link { get; set; } = string.Empty;
    public string Cook_time { get; set; } = string.Empty;
    public byte Is_Vegan { get; set; }
    public byte Is_Vegetarian { get; set; }
    public byte Is_GlutenFree { get; set; }
    public string Nutritional_facts { get; set; } = string.Empty;
    public int Portion_size { get; set; }
}