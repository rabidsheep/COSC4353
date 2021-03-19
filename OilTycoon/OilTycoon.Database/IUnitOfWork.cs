using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OilTycoon.Database
{
    public interface IUnitOfWork : IDisposable
    {
        IQueryable<T> GetAll<T>() where T : class;
        IQueryable<T> GetWhere<T>(Expression<Func<T, bool>> func) where T : class;

        T Add<T>(T toadd) where T : class;
        void Remove<T>(T toremove) where T : class;
        Task Update<T>(T toupdate) where T : class;
        Task Save();
    }
}
