using Skeleta.ViewModels.UserViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.ViewModels.WorkItemViewModels
{
    public class TaskListViewModel
    {
		public int Id { get; set; }
		public string Title { get; set; }
		public string Priority { get; set; }
		public string Status { get; set; }
		public AssignUserViewModel Developer { get; set; }
		public AssignUserViewModel Tester { get; set; }

		public int OpenBugcount { get; set; }
		public int ResolvedBugcount { get; set; }
	}
}
