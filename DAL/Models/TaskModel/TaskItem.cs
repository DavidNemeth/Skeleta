using DAL.Core;
using DAL.Models.ProjectModel;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models.TaskModel
{
	public class TaskItem : AuditableEntity
	{
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Title { get; set; }
		public string Description { get; set; }
		public string ReleaseId { get; set; }
		public Priority Priority { get; set; }
		public Status Status { get; set; }



		/*FKs*/
		public string DeveloperId { get; set; }
		public ApplicationUser Developer { get; set; }

		public string TesterId { get; set; }
		public ApplicationUser Tester { get; set; }

		public int? ProjectId { get; set; }
		public Project Project { get; set; }


		/*Navigation properties*/
		public virtual ICollection<BugItem> BugItems { get; set; }
	}
}
