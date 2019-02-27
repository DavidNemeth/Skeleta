using FluentValidation;
using Skeleta.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.ViewModels
{
    public class TaskViewModel
    {
		public int Id { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public string Comment { get; set; }

		public string Priority { get; set; }

		public string Status { get; set; }

		public string AssignedTo { get; set; }

		public string AssignedBy { get; set; }
	}

	public class TasksViewModelValidator : AbstractValidator<TaskViewModel>
	{
		public TasksViewModelValidator()
		{
			RuleFor(register => register.Title).NotEmpty().WithMessage("Title cannot be empty");
			RuleFor(register => register.Priority).NotEmpty().WithMessage("Priority cannot be empty");
			RuleFor(register => register.Status).NotEmpty().WithMessage("Status cannot be empty");
		}
	}
}
