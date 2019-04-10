﻿using DAL.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skeleta.ViewModels.UserViewModels
{
    public class UserPatchViewModel
    {
		[StringLength(20, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 20 characters")]
		public string FullName { get; set; }

		public string JobTitle { get; set; }

		public string PhoneNumber { get; set; }

		public string Configuration { get; set; }
	}
}
