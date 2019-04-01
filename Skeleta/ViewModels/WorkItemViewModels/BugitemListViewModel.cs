using Skeleta.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.ViewModels.WorkItemViewModels
{
    public class BugitemListViewModel
    {
		public int Id { get; set; }

		public string Title { get; set; }
		public string Status { get; set; }
		public string TaskItemId { get; set; }
		public string TaskItemTitle { get; set; }
		public AssignUserViewModel Developer { get; set; }
		public AssignUserViewModel Tester { get; set; }
	}
}
