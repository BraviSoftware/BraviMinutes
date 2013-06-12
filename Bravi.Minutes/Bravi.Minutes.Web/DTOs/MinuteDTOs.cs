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
        public string Notes { get; private set; }
        public int TotalAttendees { get; private set; }

        public MinuteSmallDTO(int id, DateTime date, string subject, string notes)
        {
            Id = id;
            Date = date;
            Subject = subject;
            Notes = notes;
        }

        public static MinuteSmallDTO FromMinuteEntity(Minute minute)
        {
            var minuteDTO = new MinuteSmallDTO(minute.Id, minute.Date, minute.Subject, BuildShortNotes(minute.Notes));
            minuteDTO.TotalAttendees = minute.Attendees != null ? minute.Attendees.Count() : 0;
            return minuteDTO;
        }

        private static string BuildShortNotes(string notes)
        {
            int _notesMaxLength = 200;
            var maxLength = notes.Length > _notesMaxLength ? _notesMaxLength : notes.Length;
            return !string.IsNullOrEmpty(notes) ? notes.Substring(0, maxLength) + "..." : string.Empty;
        }
    }

    public class MinuteFullDTO : MinuteSmallDTO
    {
        public AttendeeFullDTO[] Attendees { get; private set; }

        public MinuteFullDTO(int id, DateTime date, string subject, string notes, AttendeeFullDTO[] attendees)
            : base(id, date, subject, notes)
        {
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