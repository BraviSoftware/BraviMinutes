using System;
using Bravi.Minutes.Core.Entities;
using System.Linq;

namespace Bravi.Minutes.Web.DTOs
{
    public class MinuteSmallDTO
    {
        public int Id { get; private set; }
        public DateTime Date { get; private set; }
        public string Subject { get; private set; }


        public MinuteSmallDTO(int id, DateTime date, string subject)
        {
            Id = id;
            Date = date;
            Subject = subject;
        }

        public static MinuteSmallDTO FromMinuteEntity(Minute minute)
        {
            return new MinuteSmallDTO(minute.Id, minute.Date, minute.Subject);
        }
    }

    public class MinuteFullDTO : MinuteSmallDTO
    {
        public string Notes { get; private set; }
        public AttendeeFullDTO[] Attendees { get; private set; }

        public MinuteFullDTO(int id, DateTime date, string subject, string notes, AttendeeFullDTO[] attendees)
            : base(id, date, subject)
        {
            Notes = notes;
            Attendees = attendees;
        }

        public static MinuteFullDTO FromMinuteEntity(Minute minute)
        {
            return new MinuteFullDTO(minute.Id, minute.Date, minute.Subject, minute.Notes,
                minute.Attendees.Select(attendee => AttendeeFullDTO.FromAttendee(attendee)).ToArray());
        }
        public static Minute AsMinute(MinuteFullDTO minuteFullDto)
        {
            return new Minute()
            {
                Id = minuteFullDto.Id,
                Subject = minuteFullDto.Subject,
                Date = minuteFullDto.Date,
                Notes = minuteFullDto.Notes
            };
        }
    }
}