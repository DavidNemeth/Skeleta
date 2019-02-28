using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Core;
using DAL.Models;
using DAL.Models.TaskModel;
using Microsoft.AspNetCore.Identity;
using Skeleta.ViewModels.UserViewModels;

namespace Skeleta.ViewModels
{
	public class AutoMapperProfile : Profile
	{
		public AutoMapperProfile()
		{
			CreateMap<ApplicationUser, UserViewModel>()
				   .ForMember(d => d.Roles, map => map.Ignore());
			CreateMap<UserViewModel, ApplicationUser>()
					.ForMember(d => d.Roles, map => map.Ignore());
			CreateMap<ApplicationUser, UserEditViewModel>()
			   .ForMember(d => d.Roles, map => map.Ignore());
			CreateMap<UserEditViewModel, ApplicationUser>()
				.ForMember(d => d.Roles, map => map.Ignore());

			CreateMap<ApplicationUser, UserPatchViewModel>()
				.ReverseMap();

			CreateMap<ApplicationRole, RoleViewModel>()
				.ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
				.ForMember(d => d.UsersCount, map => map.MapFrom(s => s.Users != null ? s.Users.Count : 0))
				.ReverseMap();
			CreateMap<RoleViewModel, ApplicationRole>();

			CreateMap<IdentityRoleClaim<string>, ClaimViewModel>()
				.ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
				.ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
				.ReverseMap();

			CreateMap<ApplicationPermission, PermissionViewModel>()
				.ReverseMap();

			CreateMap<IdentityRoleClaim<string>, PermissionViewModel>()
				.ConvertUsing(s => Mapper.Map<PermissionViewModel>(ApplicationPermissions.GetPermissionByValue(s.ClaimValue)));

			CreateMap<TaskItem, TaskViewModel>()
				 .ForMember(d => d.AssignedTo, opt => opt.MapFrom(s => s.AssignedTo.FullName));

			CreateMap<TaskViewModel, TaskItem>()
				.ForMember(d => d.AssignedTo, map => map.Ignore());
		}
	}
}
