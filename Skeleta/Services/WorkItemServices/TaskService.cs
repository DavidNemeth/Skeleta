using AutoMapper.QueryableExtensions;
using DAL;
using DAL.Core;
using DAL.Models.TaskModel;
using Microsoft.EntityFrameworkCore;
using Skeleta.ViewModels.WorkItemViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skeleta.Services.WorkItemServices
{
	public class TaskService : ITaskService
	{
		private readonly ApplicationDbContext _context;

		public TaskService(ApplicationDbContext context)
		{
			_context = context;
		}

		public void Add(TaskItem taskItem)
		{
			_context.TaskItems.Add(taskItem);
		}

		public void Update(TaskItem taskItem)
		{
			_context.TaskItems.Update(taskItem);
		}

		public void Remove(TaskItem taskItem)
		{
			_context.TaskItems.Remove(taskItem);
		}

		public void RemoveRange(int[] ids)
		{
			IQueryable<int> taskItemIds = _context.TaskItems.Select(t => t.Id);
			IQueryable<TaskItem> taskitems = _context.TaskItems.Where(t => taskItemIds.Contains(t.Id));
			_context.TaskItems.RemoveRange(taskitems);
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllClosedTask()
		{
			IOrderedQueryable<TaskItem> query = _context.TaskItems
				.Where(t => t.Status == Status.Closed).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllCompletedTask()
		{
			IOrderedQueryable<TaskItem> query = _context.TaskItems
				.Where(t => t.Status == Status.Completed).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllPendingTask()
		{
			IOrderedQueryable<TaskItem> query = _context.TaskItems
				.Where(t => t.Status == Status.New || t.Status == Status.Active).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllResolvedTask()
		{
			IOrderedQueryable<TaskItem> query = _context.TaskItems
				.Where(t => t.Status == Status.Resolved).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllTask()
		{
			IOrderedQueryable<TaskItem> query = _context.TaskItems
				.Where(t => t.Status != Status.Closed).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<TaskItemViewModel> GetVMById(int id)
		{
			IQueryable<TaskItem> query = _context.TaskItems
				.Where(x => x.Id == id);

			return await query
				.ProjectTo<TaskItemViewModel>().FirstOrDefaultAsync();
		}

		public async Task<TaskItem> GetById(int id)
		{
			return await _context.TaskItems
				.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<ExpandedItemViewModel> GetExpandItem(int id)
		{
			IQueryable<TaskItem> query = _context.TaskItems
				.Where(x => x.Id == id);

			return await query
				.ProjectTo<ExpandedItemViewModel>().FirstOrDefaultAsync();
		}

		public async Task SaveChangesAsync()
		{
			await _context.SaveChangesAsync();
		}
	}
}
