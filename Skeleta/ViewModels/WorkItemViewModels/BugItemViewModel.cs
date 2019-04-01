using Skeleta.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.ViewModels.WorkItemViewModels
{
    public class BugItemViewModel
    {
		public int Id { get; set; }

		[Required(ErrorMessage = "Title is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Title must be between 2 and 200 characters")]
		public string Title { get; set; }

		public string Description { get; set; }

		[Required(ErrorMessage = "Status is required")]
		public string Status { get; set; }

		[Required]
		public string TaskItemId { get; set; }
		public string TaskItemTitle { get; set; }

		public string DeveloperId { get; set; }
		public AssignUserViewModel Developer { get; set; }
		public string TesterId { get; set; }
		public AssignUserViewModel Tester { get; set; }
	}
}
