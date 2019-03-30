using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Core
{
	public enum Gender
	{
		None,
		Female,
		Male
	}

	public enum Job
	{
		None,
		Tester,
		Developer
	}

	public enum Priority
	{
		Critical,
		High,
		Medium,
		Low
	}

	public enum Status
	{
		New,
		Rejected,
		Active,
		Resolved,
		Completed,
		Closed
	}
}