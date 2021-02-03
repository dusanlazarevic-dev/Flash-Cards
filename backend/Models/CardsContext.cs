using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class CardsContext : DbContext
    {
        public DbSet<LearningTopic> Topics{get; set;}

        public DbSet<FlashCard> FlashCards{get; set;}

        public CardsContext(DbContextOptions options) : base(options)
        {

        }      
    }
}