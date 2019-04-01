using System.Collections.Generic;
using System.Threading.Tasks;
using DAL;
using System.Linq;
using DAL.Core;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Skeleta.ViewModels.WorkItemViewModels;

namespace Skeleta.Services.WorkItemServices
{
	public class TaskService : ITaskService
	{
		private ApplicationDbContext context;
		public TaskService(ApplicationDbContext context)
		{
			this.context = context;
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllClosedTask()
		{
			var query = context.TaskItems
				.Where(t => t.Status == Status.Closed);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllCompletedTask()
		{
			var query = context.TaskItems
				.Where(t => t.Status == Status.Completed);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllPendingTask()
		{
			var query = context.TaskItems
				.Where(t => t.Status == Status.New || t.Status == Status.Active);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllResolvedTask()
		{
			var query = context.TaskItems
				.Where(t => t.Status == Status.Resolved);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllTask()
		{
			var query = context.TaskItems
				.Where(t => t.Status != Status.Closed);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<TaskItemViewModel> GetById(int id)
		{
			var query = context.TaskItems
				.Where(x=>x.Id == id);

			return await query
				.ProjectTo<TaskItemViewModel>().FirstOrDefaultAsync();
		}

	}
}
