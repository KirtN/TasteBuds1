using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

class UserDB : DbContext
{
    public UserDB(DbContextOptions<UserDB> options)
    : base(options) { }

    public DbSet<User> User => Set<User>();
}
