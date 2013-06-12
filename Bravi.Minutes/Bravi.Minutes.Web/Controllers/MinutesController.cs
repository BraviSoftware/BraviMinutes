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

        public IEnumerable<MinuteSmallDTO> Get()
        {
            return
                _unitOfWork.MinutesRepository.GetLatestMinutes()
                           .Select(minute => MinuteSmallDTO.FromMinuteEntity(minute));
        }

        public MinuteFullDTO Get(int id)
        {
            var minute = _unitOfWork.MinutesRepository.GetMinute(id);
            if (minute == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return MinuteFullDTO.FromMinuteEntity(minute);
        }

        //// POST api/minute
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

        //// PUT api/minute/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/minute/5
        //public void Delete(int id)
        //{
        //}
    }
}
