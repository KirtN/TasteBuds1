
using System.ComponentModel.DataAnnotations;

public class Favourite_recipes
    {
    [Key]
    public int List_id { get; set; }
    public int User_id { get; set; }
    public int Recipe_id { get; set; }
    }

