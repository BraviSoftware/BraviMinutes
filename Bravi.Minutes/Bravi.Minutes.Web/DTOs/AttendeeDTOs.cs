using Bravi.Minutes.Core.Entities;

namespace Bravi.Minutes.Web.DTOs
{
    public class AttendeeFullDTO
    {
        public int Id { get; private set; }
        public string Name { get; private set; }

        public AttendeeFullDTO(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static AttendeeFullDTO FromAttendee(Attendee attendee)
        {
            return new AttendeeFullDTO(attendee.Id, attendee.Name);
        }

        public static Attendee AsAttendee(AttendeeFullDTO attendeeFullDto)
        {
            return new Attendee()
            {
                Id = attendeeFullDto.Id,
                Name = attendeeFullDto.Name
            };
        }
    }
}