using DAL.Core;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models.TaskModel
{
	public class BugItem : AuditableEntity
	{
		public int Id { get; set; }
		
		[Required]
		public string Title { get; set; }
		public string Description { get; set; }
		public Status Status { get; set; }



		/*FKs*/
		public string DeveloperId { get; set; }
		public ApplicationUser Developer { get; set; }

		public string TesterId { get; set; }
		public ApplicationUser Tester { get; set; }

		public int TaskItemId { get; set; }
		public TaskItem TaskItem { get; set; }
	}
}
