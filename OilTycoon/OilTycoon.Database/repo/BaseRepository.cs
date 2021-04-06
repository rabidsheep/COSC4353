using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OilTycoon.Database.repo
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        protected IUnitOfWork _uow;
        protected string OverriddenPrimaryKey = string.Empty; // used for manually setting a primary key per child class

        public BaseRepository(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _uow.GetAll<T>().ToListAsync();
        }
        public async Task<IEnumerable<T>> GetAll(int page, int limit)
        {
            return await _uow.GetAll<T>().Skip(page * limit).Take(limit).ToListAsync();
        }
        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> func)
        {
            return await _uow.GetWhere<T>(func).ToListAsync();
        }
        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> func, int page, int records)
        {
            return await (_uow.GetWhere<T>(func).Skip(page * records).Take(records)).ToListAsync();
        }

        public T Add(T toadd)
        {
            return _uow.Add<T>(toadd);
        }
        public void Remove(T toremove)
        {
            _uow.Remove<T>(toremove);
        }
        public async Task Update(T toupdate)
        {
            await _uow.Update<T>(toupdate);
        }
        public async Task Save()
        {
            await _uow.Save();
        }
    }
}
