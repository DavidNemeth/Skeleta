using DAL.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models.TaskModel
{
	public class TaskItem : AuditableEntity
	{
		public int Id { get; set; }

		[Required]
		public string Title { get; set; }
		public string Description { get; set; }
		public string Comment { get; set; }

		public Priority Priority { get; set; }
		public Status Status { get; set; }

		public string AssignedToId { get; set; }
		public ApplicationUser AssignedTo { get; set; }

		public string AssignedBy { get; set; }
	}
}
