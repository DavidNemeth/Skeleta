using Skeleta.Helpers;
using Skeleta.ViewModels.WorkItemViewModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Skeleta.ViewModels.UserViewModels
{
	public class UserViewModel
	{
		public string Id { get; set; }

		[Required(ErrorMessage = "Username is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
		public string UserName { get; set; }

		[Required(ErrorMessage = "FullName is required"), StringLength(20, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 20 characters")]
		public string FullName { get; set; }

		[Required(ErrorMessage = "Email is required"), StringLength(200, ErrorMessage = "Email must be at most 200 characters"), EmailAddress(ErrorMessage = "Invalid email address")]
		public string Email { get; set; }

		public string JobTitle { get; set; }

		public string PhoneNumber { get; set; }

		public string Configuration { get; set; }

		public bool IsEnabled { get; set; }

		public bool IsLockedOut { get; set; }

		[MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
		public string[] Roles { get; set; }

		public virtual ICollection<TaskItemViewModel> DeveloperTaskItems { get; set; }
		public virtual ICollection<TaskItemViewModel> TesterTaskItems { get; set; }

		public virtual ICollection<BugItemViewModel> DeveloperBugItems { get; set; }
		public virtual ICollection<BugItemViewModel> TesterBugItems { get; set; }

	}
}
