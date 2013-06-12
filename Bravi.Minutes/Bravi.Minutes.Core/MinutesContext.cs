using System.Data.Entity;
using Bravi.Minutes.Core.Entities;

namespace Bravi.Minutes.Core
{
    internal class MinutesContext : DbContext
    {
        public DbSet<Minute> Minutes { get; set; }
        public DbSet<Attendee> Attendees { get; set; }

        public MinutesContext()
            : base("DefaultConnection")
        {
            
        }
    }
}