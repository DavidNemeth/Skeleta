﻿using AspNet.Security.OpenIdConnect.Primitives;
using AutoMapper;
using DAL;
using DAL.Core;
using DAL.Core.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenIddict.Abstractions;
using Skeleta.Authorization;
using Skeleta.Helpers;
using Skeleta.ViewModels;
using Swashbuckle.AspNetCore.Swagger;
using System;
using AppPermissions = DAL.Core.ApplicationPermissions;

namespace Skeleta
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<ApplicationDbContext>(options =>
			{
				options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("Skeleta"));
				options.UseOpenIddict();
			});

			services.AddMvc()
				.AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore) //ignores self reference object 
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_2); //validate api rules

			services.AddLogging(loggingBuilder =>
			{
				loggingBuilder.AddConfiguration(Configuration.GetSection("Logging"));
				loggingBuilder.AddConsole();
				loggingBuilder.AddDebug();
			});

			// add identity
			services.AddIdentity<ApplicationUser, ApplicationRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();

			// Configure Identity options and password complexity here
			services.Configure<IdentityOptions>(options =>
			{
				// User settings
				options.User.RequireUniqueEmail = true;

				//    //// Password settings
				//    //options.Password.RequireDigit = true;
				//    //options.Password.RequiredLength = 8;
				//    //options.Password.RequireNonAlphanumeric = false;
				//    //options.Password.RequireUppercase = true;
				//    //options.Password.RequireLowercase = false;

				//    //// Lockout settings
				//    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
				//    //options.Lockout.MaxFailedAccessAttempts = 10;

				options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
				options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
				options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
			});

			// Register the OpenIddict services.
			services.AddOpenIddict()
				.AddCore(options =>
				{
					options.UseEntityFrameworkCore().UseDbContext<ApplicationDbContext>();
				})
				.AddServer(options =>
				{
					options.UseMvc();
					options.EnableTokenEndpoint("/connect/token");
					options.AllowPasswordFlow();
					options.AllowRefreshTokenFlow();
					options.AcceptAnonymousClients();
					options.DisableHttpsRequirement(); // Note: Comment this out in production
					options.RegisterScopes(
						OpenIdConnectConstants.Scopes.OpenId,
						OpenIdConnectConstants.Scopes.Email,
						OpenIdConnectConstants.Scopes.Phone,
						OpenIdConnectConstants.Scopes.Profile,
						OpenIdConnectConstants.Scopes.OfflineAccess,
						OpenIddictConstants.Scopes.Roles);

					// options.UseRollingTokens(); //Uncomment to renew refresh tokens on every refreshToken request
					// Note: to use JWT access tokens instead of the default encrypted format, the following lines are required:
					// options.UseJsonWebTokens();
				})
				.AddValidation(); //Only compatible with the default token format. For JWT tokens, use the Microsoft JWT bearer handler.

			// Add cors
			services.AddCors();

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new Info { Title = "Skeleta API", Version = "v1" });
			});

			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "wwwroot/clientapp/dist";
			});			

			services.AddAuthorization(options =>
			{
				options.AddPolicy(Authorization.Policies.ViewAllUsersPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, AppPermissions.ViewUsers));
				options.AddPolicy(Authorization.Policies.ManageAllUsersPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, AppPermissions.ManageUsers));

				options.AddPolicy(Authorization.Policies.ViewAllRolesPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, AppPermissions.ViewRoles));
				options.AddPolicy(Authorization.Policies.ViewRoleByRoleNamePolicy, policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()));
				options.AddPolicy(Authorization.Policies.ManageAllRolesPolicy, policy => policy.RequireClaim(CustomClaimTypes.Permission, AppPermissions.ManageRoles));

				options.AddPolicy(Authorization.Policies.AssignAllowedRolesPolicy, policy => policy.Requirements.Add(new AssignRolesAuthorizationRequirement()));
			});

			Mapper.Initialize(cfg =>
			{
				cfg.AddProfile<AutoMapperProfile>();
			});

			// Configurations
			services.Configure<SmtpConfig>(Configuration.GetSection("SmtpConfig"));

			// Business Services
			services.AddScoped<IEmailSender, EmailSender>();

			// Repositories
			services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
			services.AddScoped<IAccountManager, AccountManager>();

			// Auth Handlers
			services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
			services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
			services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
			services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();

			// DB Creation and Seeding
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ILogger<Startup> logger, IDatabaseInitializer databaseInitializer)
		{ 			
			loggerFactory.AddFile(Configuration.GetSection("Logging"));
			Utilities.ConfigureLogger(loggerFactory);

            EmailTemplates.Initialize(env);
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			try
			{
				//Having database seeding here rather than in Program.Main() ensures logger is configured before seeding occurs
				databaseInitializer.SeedAsync().Wait();
			}
			catch (Exception ex)
			{
				logger.LogCritical(LoggingEvents.INIT_DATABASE, ex, LoggingEvents.INIT_DATABASE.Name);
				throw new Exception(LoggingEvents.INIT_DATABASE.Name, ex);
			}

			//Configure Cors
			app.UseCors(builder => builder
				.AllowAnyOrigin()
				.AllowAnyHeader()
				.AllowAnyMethod());


			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();
			app.UseAuthentication();

			// Enable middleware to serve generated Swagger as a JSON endpoint.
			app.UseSwagger();
			app.UseSwaggerUI(c =>
			{
				c.DocumentTitle = "Swagger UI - Skeleta Application";
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Skeleta API V1");
			});

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
					spa.Options.StartupTimeout = TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
																			//spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
				}
			});
		}
	}
}
