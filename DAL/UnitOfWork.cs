using DAL.Repositories;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
	{
		readonly ApplicationDbContext _context;

		ITasksRepository _tasks;

		public UnitOfWork(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task SaveChangesAsync()
		{
			await _context.SaveChangesAsync();
		}

		public ITasksRepository Tasks
		{
			get
			{
				if (_tasks == null)
					_tasks = new TasksRepository(_context);

				return _tasks;
			}
		}
	}
}
