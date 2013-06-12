using System.Collections.Generic;
using Bravi.Minutes.Core.Entities;
using System.Linq;

namespace Bravi.Minutes.Core.Repositories
{
    class AttendeeRepository : IAttendeeRepository
    {
        private readonly MinutesContext context;
        public AttendeeRepository(MinutesContext context)
        {
            this.context = context;
        }

        public IEnumerable<Attendee> GetAllAttendees()
        {
            return this.context.Attendees.OrderBy(attendee => attendee.Name);
        }

        public Attendee GetById(int id)
        {
            return this.context.Attendees.SingleOrDefault(attendee => attendee.Id == id);
        }

        public void AddAttendee(Attendee attendee)
        {
            this.context.Attendees.Add(attendee);
        }
    }
}