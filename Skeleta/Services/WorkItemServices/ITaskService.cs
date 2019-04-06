using DAL.Models.TaskModel;
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

		Task<TaskItemViewModel> GetVMById(int id);
		Task<TaskItem> GetById(int id);

		void Add(TaskItem taskItem);
		void Update(TaskItem taskItem);
		void Remove(TaskItem taskItem);
		void RemoveRange(int[] ids);

		Task SaveChangesAsync();
	}
}
