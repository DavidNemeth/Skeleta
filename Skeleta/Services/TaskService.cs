using System.Collections.Generic;
using System.Threading.Tasks;
using Skeleta.ViewModels;
using DAL;
using System.Linq;
using DAL.Core;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Skeleta.Services
{
	public class TaskService : ITaskService
	{
		private ApplicationDbContext context;
		public TaskService(ApplicationDbContext context)
		{
			this.context = context;
		}

		public async Task<IEnumerable<TaskViewModel>> GetAllClosedTask()
		{
			var query = context.Tasks
				.Where(t => t.Status == Status.Closed);

			return await query
				.ProjectTo<TaskViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskViewModel>> GetAllCompletedTask()
		{
			var query = context.Tasks
				.Where(t => t.Status == Status.Completed);

			return await query
				.ProjectTo<TaskViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskViewModel>> GetAllPendingTask()
		{
			var query = context.Tasks
				.Where(t => t.Status == Status.New || t.Status == Status.Active);

			return await query
				.ProjectTo<TaskViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskViewModel>> GetAllResolvedTask()
		{
			var query = context.Tasks
				.Where(t => t.Status == Status.Resolved);

			return await query
				.ProjectTo<TaskViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskViewModel>> GetAllTask()
		{
			var query = context.Tasks;

			return await query
				.ProjectTo<TaskViewModel>().ToListAsync();
		}

		public async Task<TaskViewModel> GetById(int id)
		{
			var query = context.Tasks
				.Where(x=>x.Id == id);

			return await query
				.ProjectTo<TaskViewModel>().FirstOrDefaultAsync();
		}

	}
}
