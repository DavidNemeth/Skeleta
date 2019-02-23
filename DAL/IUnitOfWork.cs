using DAL.Repositories.Interfaces;
using System.Threading.Tasks;

namespace DAL
{
	public interface IUnitOfWork
    {
		ITasksRepository Tasks { get; }

		Task SaveChangesAsync();
	}
}
