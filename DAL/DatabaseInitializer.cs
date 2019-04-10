using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using DAL.Core;
using DAL.Core.Interfaces;
using DAL.Models.TaskModel;

namespace DAL
{
	public interface IDatabaseInitializer
	{
		Task SeedAsync();
	}




	public class DatabaseInitializer : IDatabaseInitializer
	{
		private readonly ApplicationDbContext _context;
		private readonly IAccountManager _accountManager;
		private readonly ILogger _logger;

		public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
		{
			_accountManager = accountManager;
			_context = context;
			_logger = logger;
		}

		public async Task SeedAsync()
		{
			await _context.Database.MigrateAsync().ConfigureAwait(false);

			//for (int i = 0; i < 5000; i++)
			//{
			//	await CreateTaskAsync(i);
			//}
			if (!await _context.Users.AnyAsync())
			{
				_logger.LogInformation("Generating inbuilt accounts");

				const string adminRoleName = "administrator";
				const string userRoleName = "user";

				await EnsureRoleAsync(adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
				await EnsureRoleAsync(userRoleName, "Default user", new string[] { });

				await CreateUserAsync("admin", "Jelszo1", "Inbuilt Administrator", "admin@skeleta.com", "+1 (123) 000-0000", new string[] { adminRoleName });
				await CreateUserAsync("user", "Jelszo1", "Inbuilt Standard User", "user@skeleta.com", "+1 (123) 000-0001", new string[] { userRoleName });

				_logger.LogInformation("Inbuilt account generation completed");
			}
			
			await _context.SaveChangesAsync();

			_logger.LogInformation("Seeding initial data completed");

		}



		private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
		{
			if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
			{
				ApplicationRole applicationRole = new ApplicationRole(roleName, description);

				var result = await this._accountManager.CreateRoleAsync(applicationRole, claims);

				if (!result.Item1)
					throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");
			}
		}

		private async Task CreateTaskAsync(int id)
		{
			TaskItem task = new TaskItem
			{
				Title = "test" + id,
				TesterId = "0632e8f6-4816-491d-92e5-dff18678072d",
				DeveloperId = "0632e8f6-4816-491d-92e5-dff18678072d",
				Description = "descr" + id,
				CreatedBy = "0632e8f6-4816-491d-92e5-dff18678072d",
				CreatedDate = DateTime.Now,
				UpdatedBy = "0632e8f6-4816-491d-92e5-dff18678072d",
				UpdatedDate = DateTime.Now,
				Status = Status.Active,
				Priority = Priority.High
			};
			_context.TaskItems.Add(task);
			await _context.SaveChangesAsync();
		}

		private async Task<ApplicationUser> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
		{
			ApplicationUser applicationUser = new ApplicationUser
			{
				UserName = userName,
				FullName = fullName,
				Email = email,
				PhoneNumber = phoneNumber,
				EmailConfirmed = true,
				IsEnabled = true,
				JobTitle = Job.None
			};

			var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

			if (!result.Item1)
				throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");


			return applicationUser;
		}
	}
}
