using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OilTycoon.Database
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetAll(int page, int limit);
        Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> func);
        Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> func, int page, int amount);

        T Add(T toadd);
        void Remove(T toremove);
        Task Update(T toupdate);
        Task Save();
    }
}
