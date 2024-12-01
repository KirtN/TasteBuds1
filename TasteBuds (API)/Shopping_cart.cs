using System.ComponentModel.DataAnnotations;

    public class Shopping_cart
    {
    [Key]
    public int User_id { get; set; }
    public int Ingredient_id { get; set; }
    public decimal Quantity { get; set; }
    public string Quantity_measurement { get; set; } = string.Empty;
}

