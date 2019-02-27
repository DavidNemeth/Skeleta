using FluentValidation;
using Skeleta.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.ViewModels
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

		[Required(ErrorMessage = "AssignedTo is required")]
		public string AssignedTo { get; set; }

		[Required(ErrorMessage = "AssignedBy is required")]
		public string AssignedBy { get; set; }
	}
}
