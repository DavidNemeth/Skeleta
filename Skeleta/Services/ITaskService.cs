using DAL.Models.TaskModel;
using Skeleta.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Skeleta.Services
{
	public interface ITaskService
    {
		Task<IEnumerable<TaskViewModel>> GetAllTask();
		Task<IEnumerable<TaskViewModel>> GetAllPendingTask();
		Task<IEnumerable<TaskViewModel>> GetAllCompletedTask();
		Task<IEnumerable<TaskViewModel>> GetAllClosedTask();
		Task<IEnumerable<TaskViewModel>> GetAllResolvedTask();
		Task<TaskViewModel> GetById(int id);
	}
}
