using Bravi.Minutes.Core.Repositories;

namespace Bravi.Minutes.Core
{
    public class UnitOfWorkEf : IUnitOfWork
    {
        private readonly MinutesContext _context;

        public IMinutesRepository MinutesRepository { get; private set; }
        public IAttendeeRepository AttendeeRepository { get; private set; }

        public UnitOfWorkEf()
        {
            _context = new MinutesContext();

            this.MinutesRepository = new MinutesRepository(_context);
            this.AttendeeRepository = new AttendeeRepository(_context);
        }

        public void Commit()
        {
            this._context.SaveChanges();
        }
    }
}