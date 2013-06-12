using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bravi.Minutes.Core.Entities
{
    public class Attendee
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(50)]
        public string Name { get; set; }

        public virtual ICollection<Minute> Minutes { get; set; }
    }
}
