using AutoMapper;
using DAL;
using DAL.Core.Interfaces;
using DAL.Models.TaskModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenIddict.Validation;
using Skeleta.Authorization;
using Skeleta.Services.WorkItemServices;
using Skeleta.ViewModels.WorkItemViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Skeleta.Controllers
{
	[Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
	public class TasksController : Controller
	{
		private readonly IAccountManager accountManager;
		private ITaskService taskService;
		private ApplicationDbContext context;
		readonly ILogger logger;
		private readonly IAuthorizationService authorizationService;

		public TasksController(ApplicationDbContext context, ITaskService taskService, ILogger<TasksController> logger, IAccountManager accountManager, IAuthorizationService authorizationService)
		{
			this.accountManager = accountManager;
			this.taskService = taskService;
			this.context = context;
			this.logger = logger;
			this.authorizationService = authorizationService;
		}

		// GET: api/values
		[HttpGet("all")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await taskService.GetAllTask());
		}

		// GET: api/values
		[HttpGet("pending")]
		[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetPending()
		{
			if (!(await authorizationService.AuthorizeAsync(this.User, "", TaskManagementOperations.Read)).Succeeded)
				return new ChallengeResult();

			var pendingTasks = await taskService.GetAllPendingTask();
			return Ok(pendingTasks);
		}

		// GET: api/values
		[HttpGet("closed")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetClosed()
		{
			var closedTasks = await taskService.GetAllClosedTask();
			return Ok(closedTasks);
		}

		// GET: api/values
		[HttpGet("completed")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetCompleted()
		{
			var completedTasks = await taskService.GetAllCompletedTask();
			return Ok(completedTasks);
		}

		// GET: api/values
		[HttpGet("resolved")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetResolved()
		{
			var resolvedTasks = await taskService.GetAllResolvedTask();
			return Ok(resolvedTasks);
		}

		// GET api/values/5
		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(TaskItemViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			var task = await taskService.GetById(id);
			return Ok(task);
		}



		// POST api/values
		[HttpPost()]
		[ProducesResponseType(201, Type = typeof(TaskItemViewModel))]
		public async Task<IActionResult> CreateTask([FromBody] TaskItemViewModel viewmodel)
		{
			if (ModelState.IsValid)
			{
				if (viewmodel == null)
					return BadRequest($"{nameof(viewmodel)} cannot be null");

				var item = Mapper.Map<TaskItem>(viewmodel);
				context.TaskItems.Add(item);
				await context.SaveChangesAsync();

				return NoContent();
			}
			return BadRequest(ModelState);
		}



		// PUT api/values/5
		[HttpPut("{id}")]
		[ProducesResponseType(204)]
		[ProducesResponseType(400)]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> UpdateAsync(int id, [FromBody] TaskItemViewModel viewmodel)
		{
			if (ModelState.IsValid)
			{
				if (viewmodel == null)
					return BadRequest($"{nameof(viewmodel)} cannot be null");

				TaskItem appTask = Mapper.Map<TaskItem>(await taskService.GetById(id));

				if (appTask == null)
					return NotFound(id);

				Mapper.Map(viewmodel, appTask);
				context.TaskItems.Update(appTask);
				await context.SaveChangesAsync();

				return NoContent();
			}

			return BadRequest(ModelState);
		}



		// DELETE api/values/5
		[HttpDelete("{id}")]
		[ProducesResponseType(200, Type = typeof(TaskItemViewModel))]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> Delete(int id)
		{
			TaskItemViewModel taskVM = null;
			TaskItem task = Mapper.Map<TaskItem>(await taskService.GetById(id));

			if (task != null)
				taskVM = Mapper.Map<TaskItemViewModel>(task);

			if (taskVM == null)
				return NotFound(id);

			context.TaskItems.Remove(task);
			await context.SaveChangesAsync();
			return Ok(taskVM);
		}

		// DELETE RANGE api/values/range/5
		[HttpDelete("range/{ids}")]
		[ProducesResponseType(200, Type = typeof(TaskItemViewModel))]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> DeleteRange(int[] ids)
		{
			List<TaskItemViewModel> tasksVM = new List<TaskItemViewModel>();
			List<TaskItem> tasks = new List<TaskItem>();

			foreach (var id in ids)
			{
				TaskItemViewModel taskVM = null;
				TaskItem task = Mapper.Map<TaskItem>(await taskService.GetById(id));

				if (task != null)
				{
					taskVM = Mapper.Map<TaskItemViewModel>(task);
					tasks.Add(task);
					if (taskVM != null)
					{
						tasksVM.Add(taskVM);
					}
				}
			}

			context.TaskItems.RemoveRange(tasks);
			await context.SaveChangesAsync();
			return Ok(tasksVM);
		}
	}
}
