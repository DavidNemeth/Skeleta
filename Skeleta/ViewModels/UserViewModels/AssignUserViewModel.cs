﻿using System.ComponentModel.DataAnnotations;

namespace Skeleta.ViewModels.UserViewModels
{
	public class AssignUserViewModel
    {
		public string Id { get; set; }

		[Required(ErrorMessage = "Username is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
		public string UserName { get; set; }

		public string FullName { get; set; }

		[Required(ErrorMessage = "Email is required"), StringLength(200, ErrorMessage = "Email must be at most 200 characters"), EmailAddress(ErrorMessage = "Invalid email address")]
		public string Email { get; set; }

		public string JobTitle { get; set; }

		public string Job { get; set; }

		public string PhoneNumber { get; set; }
	}
}
