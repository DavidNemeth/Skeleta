using DAL.Core;
using DAL.Models.TaskModel;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
	public class TasksRepository : Repository<TaskItem>, ITasksRepository
	{
		public TasksRepository(DbContext context) : base(context)
		{ }

		public async Task<IEnumerable<TaskItem>> GetAllTask() => await _appContext.Tasks
			.Include(c => c.AssignedTo)
			.OrderBy(c => c.Priority)
			.ToListAsync();

		public async Task<IEnumerable<TaskItem>> GetAllPendingTask() => await _appContext.Tasks
			.Where(t => t.Status != Status.Closed && t.Status != Status.Completed)
			.Include(c => c.AssignedTo)
			.OrderBy(c => c.Priority)
			.ToListAsync();

		public async Task<IEnumerable<TaskItem>> GetAllCompletedTask() => await _appContext.Tasks
			.Where(t => t.Status == Status.Completed)
			.Include(c => c.AssignedTo)
			.OrderBy(c => c.Priority)
			.ToListAsync();

		public async Task<IEnumerable<TaskItem>> GetAllClosedTask() => await _appContext.Tasks
			.Where(t => t.Status == Status.Closed)
			.Include(c => c.AssignedTo)
			.OrderBy(c => c.Priority)
			.ToListAsync();
		

		private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
	}
}
