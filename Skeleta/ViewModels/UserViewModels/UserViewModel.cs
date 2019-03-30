using Skeleta.Helpers;
using Skeleta.ViewModels.WorkItemViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.ViewModels.UserViewModels
{
    public class UserViewModel
    {
		public string Id { get; set; }

		[Required(ErrorMessage = "Username is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
		public string UserName { get; set; }

		public string FullName { get; set; }

		[Required(ErrorMessage = "Email is required"), StringLength(200, ErrorMessage = "Email must be at most 200 characters"), EmailAddress(ErrorMessage = "Invalid email address")]
		public string Email { get; set; }

		public string JobTitle { get; set; }

		public string Job { get; set; }

		public string PhoneNumber { get; set; }

		public string Configuration { get; set; }

		public bool IsEnabled { get; set; }

		public bool IsLockedOut { get; set; }

		[MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
		public string[] Roles { get; set; }

		public virtual ICollection<TaskViewModel> DeveloperTaskItems { get; set; }
		public virtual ICollection<TaskViewModel> TesterTaskItems { get; set; }

		public virtual ICollection<BugViewModel> DeveloperBugItems { get; set; }
		public virtual ICollection<BugViewModel> TesterBugItems { get; set; }

	}
}
