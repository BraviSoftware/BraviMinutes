using Bravi.Minutes.Core;
using Bravi.Minutes.Web.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Bravi.Minutes.Web.Controllers
{
    public class AttendeesController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public AttendeesController()
        {
            this._unitOfWork = new UnitOfWorkEf();
        }

        public IEnumerable<AttendeeFullDTO> Get()
        {
            return _unitOfWork.AttendeeRepository.GetAllAttendees().Select(attendee => AttendeeFullDTO.FromAttendee(attendee));
        }

    }
}
