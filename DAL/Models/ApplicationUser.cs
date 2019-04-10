using DAL.Core;
using DAL.Models.Interfaces;
using DAL.Models.ProjectModel;
using DAL.Models.TaskModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
	public class ApplicationUser : IdentityUser, IAuditableEntity
	{
		public string JobTitle { get; set; }
		public Job Job { get; set; }
		[StringLength(20, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 20 characters")]
		public string FullName { get; set; }
		public string Configuration { get; set; }
		public bool IsEnabled { get; set; }
		public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;

		public string CreatedBy { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }

		/*Navigation properties*/
		public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }
		public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

		public virtual ICollection<TaskItem> DeveloperTaskItems { get; set; }
		public virtual ICollection<TaskItem> TesterTaskItems { get; set; }

		public virtual ICollection<BugItem> DeveloperBugItems { get; set; }
		public virtual ICollection<BugItem> TesterBugItems { get; set; }

		public virtual ICollection<ProjectMember> Projects { get; set; }

	}
}
