using Bravi.Minutes.Core.Repositories;

namespace Bravi.Minutes.Core
{
    public interface IUnitOfWork
    {
        IMinutesRepository MinutesRepository { get; }
        IAttendeeRepository AttendeeRepository { get; }

        void Commit();
    }
}