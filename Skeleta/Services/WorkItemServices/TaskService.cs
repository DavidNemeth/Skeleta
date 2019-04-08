using System.Collections.Generic;
using System.Threading.Tasks;
using DAL;
using System.Linq;
using DAL.Core;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Skeleta.ViewModels.WorkItemViewModels;
using DAL.Models.TaskModel;
using System;
using Microsoft.AspNetCore.Identity;
using DAL.Models;

namespace Skeleta.Services.WorkItemServices
{
	public class TaskService : ITaskService
	{
		private ApplicationDbContext _context;

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
			var taskItemIds = _context.TaskItems.Select(t => t.Id);
			var taskitems = _context.TaskItems.Where(t => taskItemIds.Contains(t.Id));
			_context.TaskItems.RemoveRange(taskitems);
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllClosedTask()
		{
			var query = _context.TaskItems
				.Where(t => t.Status == Status.Closed).OrderByDescending(x=>x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllCompletedTask()
		{
			var query = _context.TaskItems
				.Where(t => t.Status == Status.Completed).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllPendingTask()
		{
			var query = _context.TaskItems
				.Where(t => t.Status == Status.New || t.Status == Status.Active).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllResolvedTask()
		{
			var query = _context.TaskItems
				.Where(t => t.Status == Status.Resolved).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<TaskListViewModel>> GetAllTask()
		{
			var query = _context.TaskItems
				.Where(t => t.Status != Status.Closed).OrderByDescending(x => x.UpdatedDate);

			return await query
				.ProjectTo<TaskListViewModel>().ToListAsync();
		}

		public async Task<TaskItemViewModel> GetVMById(int id)
		{
			var query = _context.TaskItems
				.Where(x => x.Id == id);

			return await query
				.ProjectTo<TaskItemViewModel>().FirstOrDefaultAsync();
		}

		public async Task<TaskItem> GetById(int id)
		{
			return await _context.TaskItems
				.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task SaveChangesAsync()
		{
			await _context.SaveChangesAsync();
		}
	}
}
