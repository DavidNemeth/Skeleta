using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Models.TaskModel;
using Skeleta.Services.WorkItemServices;
using DAL.Core.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Skeleta.ViewModels.WorkItemViewModels;
using OpenIddict.Validation;
using Skeleta.Authorization;
using AutoMapper;

namespace Skeleta.Controllers
{
	[Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
    public class BugItemsController : Controller
	{
		private readonly IAccountManager accountManager;
		private IBugItemService bugitemService;
		private ApplicationDbContext context;
		readonly ILogger logger;
		private readonly IAuthorizationService authorizationService;

		public BugItemsController(ApplicationDbContext context, IBugItemService bugitemService, ILogger<TasksController> logger, IAccountManager accountManager, IAuthorizationService authorizationService)
		{
			this.accountManager = accountManager;
			this.bugitemService = bugitemService;
			this.context = context;
			this.logger = logger;
			this.authorizationService = authorizationService;
		}

		// GET: api/values
		[HttpGet("all")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await bugitemService.GetAllBug());
		}

		// GET: api/values
		[HttpGet("pending")]
		[Authorize(Authorization.Policies.ViewAllTasksPolicy)]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetPending()
		{
			if (!(await authorizationService.AuthorizeAsync(this.User, "", TaskManagementOperations.Read)).Succeeded)
				return new ChallengeResult();

			var pendingBugs = await bugitemService.GetAllPendingBug();
			return Ok(pendingBugs);
		}

		// GET: api/values
		[HttpGet("closed")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetClosed()
		{
			var closedBugs = await bugitemService.GetAllClosedBug();
			return Ok(closedBugs);
		}

		// GET: api/values
		[HttpGet("resolved")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<BugitemListViewModel>))]
		public async Task<IActionResult> GetResolved()
		{
			var resolvedBugs = await bugitemService.GetAllResolvedBug();
			return Ok(resolvedBugs);
		}

		// GET api/values/5
		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(BugItemViewModel))]
		public async Task<IActionResult> Get(int id)
		{
			var bug = await bugitemService.GetById(id);
			return Ok(bug);
		}



		// POST api/values
		[HttpPost()]
		[ProducesResponseType(201, Type = typeof(BugItemViewModel))]
		public async Task<IActionResult> CreateAsync([FromBody] BugItemViewModel bugVM)
		{
			if (ModelState.IsValid)
			{
				if (bugVM == null)
					return BadRequest($"{nameof(bugVM)} cannot be null");

				var bug = Mapper.Map<BugItem>(bugVM);
				context.BugItems.Add(bug);
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
		public async Task<IActionResult> UpdateAsync(int id, [FromBody] BugItemViewModel viewmodel)
		{
			if (ModelState.IsValid)
			{
				if (viewmodel == null)
					return BadRequest($"{nameof(viewmodel)} cannot be null");

				BugItem bug = Mapper.Map<BugItem>(await bugitemService.GetById(id));

				if (bug == null)
					return NotFound(id);

				Mapper.Map(viewmodel, bug);
				context.BugItems.Update(bug);
				await context.SaveChangesAsync();

				return NoContent();
			}

			return BadRequest(ModelState);
		}



		// DELETE api/values/5
		[HttpDelete("{id}")]
		[ProducesResponseType(200, Type = typeof(BugItemViewModel))]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		public async Task<IActionResult> Delete(int id)
		{
			BugItemViewModel bugVM = null;
			BugItem bug = Mapper.Map<BugItem>(await bugitemService.GetById(id));

			if (bug != null)
				bugVM = Mapper.Map<BugItemViewModel>(bug);

			if (bugVM == null)
				return NotFound(id);

			context.BugItems.Remove(bug);
			await context.SaveChangesAsync();
			return Ok(bugVM);
		}
	}
}
