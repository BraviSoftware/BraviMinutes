using System.Collections.Generic;
using Bravi.Minutes.Core.Entities;

namespace Bravi.Minutes.Core.Repositories
{
    public interface IAttendeeRepository
    {
        IEnumerable<Attendee> GetAllAttendees();
        Attendee GetById(int id);
        void AddAttendee(Attendee attendee);
    }
}