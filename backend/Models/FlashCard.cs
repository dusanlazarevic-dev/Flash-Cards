
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class FlashCard
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Question")]
        [MaxLength(100)]
        [Required(AllowEmptyStrings = false)]
        public string Question { get; set; }

        [Column("Answer")]
        [MaxLength(100)]
        [Required(AllowEmptyStrings = false)]
        public string Answer { get; set; }

        [JsonIgnore]
        public LearningTopic Topic { get; set; }



        [Column]

        public Author Author { get; set; }
    }
}