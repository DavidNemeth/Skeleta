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
		Task<IEnumerable<BugitemListViewModel>> GetAllBug();
		Task<IEnumerable<BugitemListViewModel>> GetAllPendingBug();
		Task<IEnumerable<BugitemListViewModel>> GetAllResolvedBug();
		Task<IEnumerable<BugitemListViewModel>> GetAllClosedBug();

		Task<BugItemViewModel> GetById(int id);
	}
}
