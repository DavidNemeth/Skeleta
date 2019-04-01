using AutoMapper.QueryableExtensions;
using DAL;
using DAL.Core;
using Microsoft.EntityFrameworkCore;
using Skeleta.ViewModels.WorkItemViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skeleta.Services.WorkItemServices
{
	public class BugItemService : IBugItemService
	{
		private ApplicationDbContext context;
		public BugItemService(ApplicationDbContext context)
		{
			this.context = context;
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllBug(int? taskid)
		{
			
			var query = context.BugItems
				.Where(b => b.Status != Status.Closed);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllClosedBug(int? taskid)
		{
			var query = context.BugItems
				.Where(b => b.Status == Status.Closed);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllPendingBug(int? taskid)
		{
			var query = context.BugItems
					.Where(t => t.Status == Status.New || t.Status == Status.Active);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<IEnumerable<BugitemListViewModel>> GetAllResolvedBug(int? taskid)
		{
			var query = context.BugItems
				.Where(t => t.Status == Status.Resolved);

			query = taskid != null ? query.Where(x => x.TaskItemId == taskid) : query;

			return await query
				.ProjectTo<BugitemListViewModel>().ToListAsync();
		}

		public async Task<BugItemViewModel> GetById(int id)
		{
			var query = context.BugItems
			.Where(x => x.Id == id);

			return await query
				.ProjectTo<BugItemViewModel>().FirstOrDefaultAsync();
		}
	}
}
