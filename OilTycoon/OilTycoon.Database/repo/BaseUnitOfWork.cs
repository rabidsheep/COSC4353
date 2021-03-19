using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OilTycoon.Database.repo
{
    public class BaseUnitOfWork : IUnitOfWork
    {
        protected DbContext _context;
        public BaseUnitOfWork(DbContext context)
        {
            _context = context;
        }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return _context.Set<T>()
               .AsNoTracking();
        }
        public IQueryable<T> GetWhere<T>(Expression<Func<T, bool>> func) where T : class
        {
            return _context.Set<T>()
                .AsNoTracking().AsQueryable()
                .Where(func);
        }

        public T Add<T>(T toadd) where T : class
        {
            _context.Set<T>().Add(toadd);
            return toadd;
        }
        public void Remove<T>(T toremove) where T : class
        {
            _context.Set<T>()
                 .Remove(toremove);
        }
        public async Task Update<T>(T toupdate) where T : class
        {
            _context.Entry<T>(toupdate).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
