using AutoMapper;
using DAL.Models;
using DAL.Models.TaskModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
	public class BugItemsController : Controller
	{
		private readonly IBugItemService _bugitemService;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly IAuthorizationService _authorizationService;

		public BugItemsController(IBugItemService bugitemService, IAuthorizationService authorizationService, UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
			_bugitemService = bugitemService;
			_authorizationService = authorizationService;
		}

		// GET: api/values
		[HttpGet("all/{taskid}")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetAll(int? taskid)
		{
			return Ok(await _bugitemService.GetAllBug(taskid));
		}

		// GET: api/values
		[HttpGet("pending/{taskid}")]
		[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetPending(int? taskid)
		{
			if (!(await _authorizationService.AuthorizeAsync(User, "", TaskManagementOperations.Read)).Succeeded)
			{
				return new ChallengeResult();
			}

			return Ok(await _bugitemService.GetAllPendingBug(taskid));
		}

		// GET: api/values
		[HttpGet("closed/{taskid}")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetClosed(int? taskid)
		{
			return Ok(await _bugitemService.GetAllClosedBug(taskid));
		}

		// GET: api/values
		[HttpGet("resolved/{taskid}")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetResolved(int? taskid)
		{
			return Ok(await _bugitemService.GetAllResolvedBug(taskid));
		}

		// GET api/values/5
		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(BugItemViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			BugItemViewModel bugitemVM = await _bugitemService.GetVMById(id);
			return Ok(bugitemVM);
		}



		// POST api/values
		[HttpPost()]
		[ProducesResponseType(201, Type = typeof(BugItemViewModel))]
		public async Task<IActionResult> CreateAsync([FromBody] BugItemViewModel bugitemVM)
		{
			if (ModelState.IsValid)
			{
				if (bugitemVM == null)
				{
					return BadRequest($"{nameof(bugitemVM)} cannot be null");
				}

				BugItem bugItem = Mapper.Map<BugItem>(bugitemVM);
				AuditEntity(ref bugItem);
				_bugitemService.Add(bugItem);
				await _bugitemService.SaveChangesAsync();

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
		public async Task<IActionResult> UpdateAsync(int id, [FromBody] BugItemViewModel viewmodel)
		{
			if (ModelState.IsValid)
			{
				if (viewmodel == null)
				{
					return BadRequest($"{nameof(viewmodel)} cannot be null");
				}

				BugItem bugItem = await _bugitemService.GetById(id);

				if (bugItem == null)
				{
					return NotFound(id);
				}

				Mapper.Map(viewmodel, bugItem);
				AuditEntity(ref bugItem);
				_bugitemService.Update(bugItem);
				await _bugitemService.SaveChangesAsync();

				return NoContent();
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
			BugItem bugItem = await _bugitemService.GetById(id);
			if (bugItem == null)
			{
				return NotFound(id);
			}

			_bugitemService.Remove(bugItem);
			await _bugitemService.SaveChangesAsync();
			return Ok();
		}

		// DELETE RANGE api/values/range/5
		[HttpDelete("range/{ids}")]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> DeleteRange(int[] ids)
		{
			_bugitemService.RemoveRange(ids);
			await _bugitemService.SaveChangesAsync();
			return Ok();
		}

		private void AuditEntity(ref BugItem item)
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
