using DAL.Core;
using DAL.Models.TaskModel;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
	public class TasksRepository : Repository<TaskItem>, ITasksRepository
	{
		public TasksRepository(DbContext context) : base(context)
		{ }
		

		private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
	}
}
