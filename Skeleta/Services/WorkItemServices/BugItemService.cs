using AutoMapper.QueryableExtensions;
using DAL;
using DAL.Core;
using DAL.Models.TaskModel;
using Microsoft.EntityFrameworkCore;
using Skeleta.ViewModels.WorkItemViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skeleta.Services.WorkItemServices
{
	public class BugItemService : IBugItemService
	{
		private ApplicationDbContext _context;
		public BugItemService(ApplicationDbContext context)
		{
			_context = context;
		}

		public void Add(BugItem bugItem)
		{
			_context.BugItems.Add(bugItem);
		}

		public void Update(BugItem bugItem)
		{
			_context.BugItems.Update(bugItem);
		}

		public void Remove(BugItem bugItem)
		{
			_context.BugItems.Remove(bugItem);
		}

		public void RemoveRange(int[] ids)
		{
			var bugItemIds = _context.BugItems.Select(b => b.Id);
			var bugitems = _context.BugItems.Where(t => bugItemIds.Contains(t.Id));
			_context.BugItems.RemoveRange(bugitems);
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllBug(int? taskid)
		{

			var query = _context.BugItems
				.Where(b => b.Status != Status.Closed);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllClosedBug(int? taskid)
		{
			var query = _context.BugItems
				.Where(b => b.Status == Status.Closed);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllPendingBug(int? taskid)
		{
			var query = _context.BugItems
					.Where(t => t.Status == Status.New || t.Status == Status.Active);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllResolvedBug(int? taskid)
		{
			var query = _context.BugItems
				.Where(t => t.Status == Status.Resolved);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<BugItemViewModel> GetVMById(int id)
		{
			var query = _context.BugItems
			.Where(x => x.Id == id);

			return await query
				.ProjectTo<BugItemViewModel>().FirstOrDefaultAsync();
		}

		public async Task<BugItem> GetById(int id)
		{
			return await _context.BugItems
			.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task SaveChangesAsync()
		{
			await _context.SaveChangesAsync();
		}
	}
}
