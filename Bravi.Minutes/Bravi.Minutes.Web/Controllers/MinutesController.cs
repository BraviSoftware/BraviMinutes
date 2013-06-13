using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Bravi.Minutes.Core;
using Bravi.Minutes.Core.Entities;
using Bravi.Minutes.Web.DTOs;

namespace Bravi.Minutes.Web.Controllers
{
    public class MinutesController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public MinutesController()
        {
            this._unitOfWork = new UnitOfWorkEf();
        }

        // GET api/minutes
        public IEnumerable<MinuteSmallDTO> Get()
        {
            return
                _unitOfWork.MinutesRepository.GetLatestMinutes()
                           .Select(MinuteSmallDTO.FromMinuteEntity);
        }

        // GET api/minutes/5
        public MinuteFullDTO Get(int id)
        {
            var minute = _unitOfWork.MinutesRepository.GetMinute(id);
            if (minute == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return MinuteFullDTO.FromMinuteEntity(minute);
        }

        // POST api/minutes
        public void Post(MinuteFullDTO minuteToAdd)
        {
            if (minuteToAdd == null)
                throw new HttpResponseException(HttpStatusCode.NoContent);

            //var response = new HttpResponseMessage();

            var minute = MinuteFullDTO.AsMinute(minuteToAdd);
            minute.Attendees = new Collection<Attendee>();

            foreach (var attendee in minuteToAdd.Attendees)
            {
                if (attendee.Id <= 0)
                    minute.Attendees.Add(AttendeeFullDTO.AsAttendee(attendee));
                else
                {
                    var attendeeFromDb = _unitOfWork.AttendeeRepository.GetById(attendee.Id);
                    if (attendeeFromDb != null)
                        minute.Attendees.Add(attendeeFromDb);
                }
            }

            _unitOfWork.MinutesRepository.AddMinute(minute);
            _unitOfWork.Commit();
        }

        // PUT api/minutes/5
        public void Put(int id, MinuteFullDTO minuteToAdd)
        {
            if (minuteToAdd == null)
                throw new HttpResponseException(HttpStatusCode.NoContent);


            var minute = _unitOfWork.MinutesRepository.GetMinute(id);
            if (minute == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            minute = MinuteFullDTO.AsMinute(minuteToAdd, minute);

            if (minute.Attendees == null)
                minute.Attendees = new Collection<Attendee>();

            foreach (var attendee in minuteToAdd.Attendees)
            {
                if (minute.Attendees.Any(i => i.Id == attendee.Id)) continue;

                if (attendee.Id <= 0)
                {
                    minute.Attendees.Add(AttendeeFullDTO.AsAttendee(attendee));
                    continue;
                }

                var attendeeFromDb = _unitOfWork.AttendeeRepository.GetById(attendee.Id);
                if (attendeeFromDb != null) minute.Attendees.Add(attendeeFromDb);

            }

            // Remove all not used anymore
            var allCurrentAttendeesIds = minuteToAdd.Attendees.Select(t => t.Id);
            minute.Attendees.Where(i => !allCurrentAttendeesIds.Contains(i.Id)).ToList()
                .ForEach(toDelete => minute.Attendees.Remove(toDelete));

            _unitOfWork.Commit();
        }

        public static void t(object x) { }

        //// DELETE api/minutes/5
        //public void Delete(int id)
        //{
        //}
    }
}
