using AutoMapper;
using DAL.Models;
using DAL.Models.TaskModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation;
using Skeleta.Authorization;
using Skeleta.Services.WorkItemServices;
using Skeleta.ViewModels.WorkItemViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Skeleta.Controllers
{
	[Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
	public class TasksController : Controller
	{
		private readonly ITaskService _taskService;
		private readonly IAuthorizationService authorizationService;
		private readonly UserManager<ApplicationUser> _userManager;

		public TasksController(ITaskService taskService, IAuthorizationService authorizationService, UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
			_taskService = taskService;
			this.authorizationService = authorizationService;
		}

		// GET: api/values
		[HttpGet("all")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await _taskService.GetAllTask());
		}

		// GET: api/values
		[HttpGet("pending")]
		[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetPending()
		{
			if (!(await authorizationService.AuthorizeAsync(User, "", TaskManagementOperations.Read)).Succeeded)
			{
				return new ChallengeResult();
			}

			IEnumerable<TaskListViewModel> pendingTasks = await _taskService.GetAllPendingTask();
			return Ok(pendingTasks);
		}

		// GET: api/values
		[HttpGet("closed")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetClosed()
		{
			IEnumerable<TaskListViewModel> closedTasks = await _taskService.GetAllClosedTask();
			return Ok(closedTasks);
		}

		// GET: api/values
		[HttpGet("completed")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetCompleted()
		{
			IEnumerable<TaskListViewModel> completedTasks = await _taskService.GetAllCompletedTask();
			return Ok(completedTasks);
		}

		// GET: api/values
		[HttpGet("resolved")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskListViewModel>))]
		public async Task<IActionResult> GetResolved()
		{
			IEnumerable<TaskListViewModel> resolvedTasks = await _taskService.GetAllResolvedTask();
			return Ok(resolvedTasks);
		}

		// GET api/values/5
		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(TaskItemViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			TaskItemViewModel viewmodel = await _taskService.GetVMById(id);
			return Ok(viewmodel);
		}

		// GET api/values/expanded/5
		[HttpGet("expanded/{id}")]
		[ProducesResponseType(200)]
		public async Task<IActionResult> GetExpanded(int id)
		{
			ExpandedItemViewModel expandTask = await _taskService.GetExpandItem(id);
			return Ok(expandTask);
		}

		// POST api/values
		[HttpPost()]
		[ProducesResponseType(201, Type = typeof(TaskItem))]
		public async Task<IActionResult> CreateTask([FromBody] TaskItemViewModel viewmodel)
		{
			if (ModelState.IsValid)
			{
				if (viewmodel == null)
				{
					return BadRequest($"{nameof(viewmodel)} cannot be null");
				}

				TaskItem taskItem = Mapper.Map<TaskItem>(viewmodel);
				AuditEntity(ref taskItem);
				_taskService.Add(taskItem);
				await _taskService.SaveChangesAsync();

				return Ok(taskItem);
			}
			return BadRequest(ModelState);
		}



		// PUT api/values/5
		[HttpPatch("{id}")]
		[ProducesResponseType(204, Type = typeof(TaskItem))]
		[ProducesResponseType(400)]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> UpdateAsync(int id, [FromBody] JsonPatchDocument<TaskItemViewModel> jsonPatchDocument)
		{
			if (ModelState.IsValid)
			{
				if (jsonPatchDocument == null)
				{
					return BadRequest();
				}

				TaskItem taskItem = await _taskService.GetById(id);

				if (taskItem == null)
				{
					return NotFound(id);
				}

				TaskItemViewModel taskItemPatch = Mapper.Map<TaskItemViewModel>(taskItem);

				jsonPatchDocument.ApplyTo(taskItemPatch);

				Mapper.Map(taskItemPatch, taskItem);
				AuditEntity(ref taskItem);
				_taskService.Update(taskItem);
				await _taskService.SaveChangesAsync();

				return Ok(taskItem);
			}

			return BadRequest(ModelState);
		}



		// DELETE api/values/5
		[HttpDelete("{id}")]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> Delete(int id)
		{
			TaskItem taskItem = await _taskService.GetById(id);
			if (taskItem == null)
			{
				return NotFound(id);
			}

			_taskService.Remove(taskItem);
			await _taskService.SaveChangesAsync();
			return Ok();
		}

		// DELETE RANGE api/values/range/5
		[HttpDelete("range/{ids}")]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> DeleteRange(int[] ids)
		{
			_taskService.RemoveRange(ids);
			await _taskService.SaveChangesAsync();
			return Ok();
		}


		private void AuditEntity(ref TaskItem item)
		{
			DateTime date = DateTime.Now;
			if (item.CreatedBy == null)
			{
				item.CreatedBy = _userManager.GetUserId(User);
				item.CreatedDate = date;
			}

			item.UpdatedBy = _userManager.GetUserId(User);
			item.UpdatedDate = date;
		}
	}
}
