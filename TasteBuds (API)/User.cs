using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int User_id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string First_name { get; set; } = string.Empty;
    public string Last_name { get; set; } = string.Empty;
    public string Pwd { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
        

    //public User(string uname, string fname, string lname, string password, string email)
    //{
    //    Username = uname;
    //    First_name = fname;
    //    Last_name = lname;
    //    Pwd = password;
    //    Email = email;
    //}
}

