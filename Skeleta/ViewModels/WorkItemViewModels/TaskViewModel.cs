using Skeleta.ViewModels.UserViewModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Skeleta.ViewModels.WorkItemViewModels
{
	public class TaskViewModel
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Title is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Title must be between 2 and 200 characters")]
		public string Title { get; set; }

		public string Description { get; set; }

		public string Comment { get; set; }

		[Required(ErrorMessage = "Priority is required")]
		public string Priority { get; set; }

		[Required(ErrorMessage = "Status is required")]
		public string Status { get; set; }

		public string DeveloperId { get; set; }
		public AssignUserViewModel Developer { get; set; }
		public string TesterId { get; set; }
		public AssignUserViewModel Tester { get; set; }

		public virtual ICollection<BugViewModel> BugItems { get; set; }
	}
}
