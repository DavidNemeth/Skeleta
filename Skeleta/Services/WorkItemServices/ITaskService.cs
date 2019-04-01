using Skeleta.ViewModels.WorkItemViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Skeleta.Services.WorkItemServices
{
	public interface ITaskService
    {
		Task<IEnumerable<TaskListViewModel>> GetAllTask();
		Task<IEnumerable<TaskListViewModel>> GetAllPendingTask();
		Task<IEnumerable<TaskListViewModel>> GetAllResolvedTask();
		Task<IEnumerable<TaskListViewModel>> GetAllCompletedTask();
		Task<IEnumerable<TaskListViewModel>> GetAllClosedTask();

		Task<TaskItemViewModel> GetById(int id);
	}
}
