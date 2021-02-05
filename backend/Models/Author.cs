using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Author
    {
        [Key]
        [Column("ID")]

        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(20)]
        [Required(AllowEmptyStrings = false)]

        public string Name { get; set; }

        [JsonIgnore]
        public virtual List<FlashCard> Cards { get; set; }
    }
}