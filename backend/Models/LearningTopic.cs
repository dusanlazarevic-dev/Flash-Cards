using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    // [Table("LearningTopic")]
    public class LearningTopic
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(35)]
        [Required(AllowEmptyStrings = false)]
        public string TopicName { get; set; }


        public virtual List<FlashCard> Cards { get; set; }
    }

}