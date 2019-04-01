using Skeleta.ViewModels.WorkItemViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.Services.WorkItemServices
{
    public interface IBugItemService
    {
		Task<IEnumerable<BugitemListViewModel>> GetAllBug(int? taskid);
		Task<IEnumerable<BugitemListViewModel>> GetAllPendingBug(int? taskid);
		Task<IEnumerable<BugitemListViewModel>> GetAllResolvedBug(int? taskid);
		Task<IEnumerable<BugitemListViewModel>> GetAllClosedBug(int? taskid);

		Task<BugItemViewModel> GetById(int id);
	}
}
