﻿using DAL.Models.TaskModel;
using Skeleta.ViewModels.WorkItemViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Skeleta.Services.WorkItemServices
{
	public interface IBugItemService
	{
		Task<IEnumerable<BugitemListViewModel>> GetAllBug(int? taskid);
		Task<IEnumerable<BugitemListViewModel>> GetAllPendingBug(int? taskid);
		Task<IEnumerable<BugitemListViewModel>> GetAllResolvedBug(int? taskid);
		Task<IEnumerable<BugitemListViewModel>> GetAllClosedBug(int? taskid);

		Task<BugItemViewModel> GetVMById(int id);
		Task<BugItem> GetById(int id);

		void Add(BugItem bugItem);
		void Update(BugItem bugItem);
		void Remove(BugItem bugItem);
		void RemoveRange(int[] ids);

		Task SaveChangesAsync();
	}
}
