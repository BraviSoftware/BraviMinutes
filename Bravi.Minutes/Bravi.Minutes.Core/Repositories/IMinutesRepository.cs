using System.Collections.Generic;
using System.Linq;
using Bravi.Minutes.Core.Entities;

namespace Bravi.Minutes.Core.Repositories
{
    public interface IMinutesRepository
    {
        IEnumerable<Minute> GetLatestMinutes();
        Minute GetMinute(int id);

        void AddMinute(Minute minute);
    }
}