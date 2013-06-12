using System.Collections.Generic;
using Bravi.Minutes.Core.Entities;
using System.Linq;

namespace Bravi.Minutes.Core.Repositories
{
    class MinutesRepository : IMinutesRepository
    {
        private readonly MinutesContext context;
        public MinutesRepository(MinutesContext context)
        {
            this.context = context;
        }

        public IEnumerable<Minute> GetLatestMinutes()
        {
            return context.Minutes.OrderByDescending(minute => minute.Date);
        }

        public Minute GetMinute(int id)
        {
            return context.Minutes.FirstOrDefault(minute => minute.Id == id);
        }

        public void AddMinute(Minute minute)
        {
            this.context.Minutes.Add(minute);
        }
    }
}