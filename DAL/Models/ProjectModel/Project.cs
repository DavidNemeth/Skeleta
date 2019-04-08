using DAL.Models.TaskModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models.ProjectModel
{
    public class Project : AuditableEntity
	{
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		public string Company { get; set; }

		/*Navigation properties*/
		public virtual ICollection<TaskItem> TaskItems { get; set; }
		public virtual ICollection<ProjectMember> ProjectMembers { get; set; }
	}
}
