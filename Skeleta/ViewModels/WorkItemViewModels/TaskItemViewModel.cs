using Skeleta.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Skeleta.ViewModels.WorkItemViewModels
{
	public class TaskItemViewModel
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Title is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Title must be between 2 and 200 characters")]
		public string Title { get; set; }
		public string Description { get; set; }
		[Required(ErrorMessage = "Priority is required")]
		public string Priority { get; set; }
		[Required(ErrorMessage = "Status is required")]
		public string Status { get; set; }

		public string DeveloperId { get; set; }
		public string TesterId { get; set; }

		public virtual ICollection<ItemBugViewModel> BugItems { get; set; }


		public string CreatedBy { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime UpdatedDate { get; set; }
		public DateTime CreatedDate { get; set; }
	}

	public class ItemBugViewModel
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Status { get; set; }
	}
}
