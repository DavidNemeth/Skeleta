using AutoMapper;
using DAL;
using DAL.Models.TaskModel;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Skeleta.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Skeleta.Controllers
{
	[Route("api/[controller]")]
	public class TasksController : Controller
	{
		private IUnitOfWork _unitOfWork;
		readonly ILogger _logger;

		public TasksController(IUnitOfWork unitOfWork, ILogger<TasksController> logger)
		{
			_unitOfWork = unitOfWork;
			_logger = logger;
		}

		// GET: api/values
		[HttpGet("all")]
		//[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskViewModel>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(Mapper.Map<IEnumerable<TaskViewModel>>(await _unitOfWork.Tasks.GetAllTask()));
		}

		// GET: api/values
		[HttpGet("pending")]
		//[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskViewModel>))]
		public async Task<IActionResult> GetPending()
		{
			var pendingTasks = await _unitOfWork.Tasks.GetAllPendingTask();
			return Ok(Mapper.Map<IEnumerable<TaskViewModel>>(pendingTasks));
		}

		// GET: api/values
		[HttpGet("closed")]
		//[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskViewModel>))]
		public async Task<IActionResult> GetClosed()
		{
			var closedTasks = await _unitOfWork.Tasks.GetAllClosedTask();
			return Ok(Mapper.Map<IEnumerable<TaskViewModel>>(closedTasks));
		}

		// GET: api/values
		[HttpGet("completed")]
		//[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<TaskViewModel>))]
		public async Task<IActionResult> GetCompleted()
		{
			var completedTasks = await _unitOfWork.Tasks.GetAllCompletedTask();
			return Ok(Mapper.Map<IEnumerable<TaskViewModel>>(completedTasks));
		}

		// GET api/values/5
		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(TaskViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			var task = await _unitOfWork.Tasks.GetAsync(id);
			return Ok(Mapper.Map<TaskViewModel>(task));
		}



		// POST api/values
		[HttpPost()]
		[ProducesResponseType(201, Type = typeof(TaskViewModel))]
		public async Task<IActionResult> CreateTask([FromBody] TaskViewModel task)
		{
			if (ModelState.IsValid)
			{
				if (task == null)
					return BadRequest($"{nameof(task)} cannot be null");

				_unitOfWork.Tasks.Add(Mapper.Map<TaskItem>(task));
				await _unitOfWork.SaveChangesAsync();
				return CreatedAtAction("GetTask", new { id = task.Id }, task);
			}

			return BadRequest(ModelState);
		}



		// PUT api/values/5
		[HttpPut("{id}")]
		[ProducesResponseType(204)]
		[ProducesResponseType(400)]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> UpdateAsync(int id, [FromBody] TaskViewModel taskVm)
		{
			if (ModelState.IsValid)
			{
				if (taskVm == null)
					return BadRequest($"{nameof(taskVm)} cannot be null");

				TaskItem appTask = await _unitOfWork.Tasks.GetAsync(id);

				if (appTask == null)
					return NotFound(id);

				Mapper.Map<TaskViewModel, TaskItem>(taskVm, appTask);

				_unitOfWork.Tasks.Update(appTask);

				return NoContent();
			}

			return BadRequest(ModelState);
		}



		// DELETE api/values/5
		[HttpDelete("{id}")]
		[ProducesResponseType(200, Type = typeof(TaskViewModel))]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> Delete(int id)
		{
			TaskViewModel taskVM = null;
			TaskItem task = await _unitOfWork.Tasks.GetAsync(id);

			if (task != null)
				taskVM = Mapper.Map<TaskViewModel>(task);

			if (taskVM == null)
				return NotFound(id);

			_unitOfWork.Tasks.Remove(task);

			return Ok(taskVM);
		}

		// DELETE RANGE api/values/5
		[HttpDelete("{ids}")]
		[ProducesResponseType(200, Type = typeof(TaskViewModel))]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> DeleteRange(int[] ids)
		{
			List<TaskViewModel> tasksVM = new List<TaskViewModel>();
			List<TaskItem> tasks = new List<TaskItem>();

			foreach (var id in ids)
			{
				TaskViewModel taskVM = null;
				TaskItem task = await _unitOfWork.Tasks.GetAsync(id);

				if (task != null)
				{
					taskVM = Mapper.Map<TaskViewModel>(task);
					tasks.Add(task);
					if (taskVM != null)
					{
						tasksVM.Add(taskVM);
					}
				}
			}

			_unitOfWork.Tasks.RemoveRange(tasks);
			return Ok(tasksVM);
		}
	}
}
