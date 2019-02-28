using DAL.Models.TaskModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
	public interface ITasksRepository : IRepository<TaskItem>
	{
		Task<IEnumerable<TaskItem>> GetAllTask();
		Task<IEnumerable<TaskItem>> GetAllPendingTask();
		Task<IEnumerable<TaskItem>> GetAllCompletedTask();
		Task<IEnumerable<TaskItem>> GetAllClosedTask();
		Task<IEnumerable<TaskItem>> GetAllResolvedTask();
	}
}
