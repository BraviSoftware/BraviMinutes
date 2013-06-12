using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bravi.Minutes.Core.Entities
{
    public class Minute
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required, MaxLength(100)]
        public string Subject { get; set; }
        [DataType(DataType.Text)]
        public string Notes { get; set; }

        public virtual ICollection<Attendee> Attendees { get; set; } 
    }
}
