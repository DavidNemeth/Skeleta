using DAL.Core;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.Authorization
{
	public class TasksAuthoriaztionRequirement : IAuthorizationRequirement
	{
		public class ViewTaskAuthorizationHandler : AuthorizationHandler<TasksAuthoriaztionRequirement, string>
		{
			protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, TasksAuthoriaztionRequirement requirement, string roleName)
			{
				if (context.User == null)
					return Task.CompletedTask;

				if (context.User.HasClaim(CustomClaimTypes.Permission, ApplicationPermissions.ViewTasks) || context.User.IsInRole(roleName))
					context.Succeed(requirement);

				return Task.CompletedTask;
			}
		}
	}
}