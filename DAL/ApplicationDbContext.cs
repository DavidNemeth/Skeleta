using DAL.Models;
using DAL.Models.Interfaces;
using DAL.Models.ProjectModel;
using DAL.Models.TaskModel;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DAL
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
	{
		public string CurrentUserId { get; set; }
		public DbSet<TaskItem> TaskItems { get; set; }
		public DbSet<BugItem> BugItems { get; set; }
		public DbSet<Project> Projects { get; set; }
		public DbSet<ProjectMember> ProjectMembers { get; set; }


		public ApplicationDbContext(DbContextOptions options) : base(options)
		{ }


		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
			builder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
			builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
			builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

			builder.Entity<TaskItem>().HasMany(r => r.BugItems).WithOne(t => t.TaskItem).HasForeignKey(r => r.TaskItemId).IsRequired().OnDelete(DeleteBehavior.Cascade);
			builder.Entity<TaskItem>().HasOne(r => r.Developer).WithMany(t => t.DeveloperTaskItems).HasForeignKey(r => r.DeveloperId).IsRequired(false); ;
			builder.Entity<TaskItem>().HasOne(r => r.Tester).WithMany(t => t.TesterTaskItems).HasForeignKey(r => r.TesterId).IsRequired(false); ;
			builder.Entity<TaskItem>().HasIndex(x => x.UpdatedDate);

			builder.Entity<BugItem>().HasOne(r => r.Developer).WithMany(t => t.DeveloperBugItems).HasForeignKey(r => r.DeveloperId).IsRequired(false); ;
			builder.Entity<BugItem>().HasOne(r => r.Tester).WithMany(t => t.TesterBugItems).HasForeignKey(r => r.TesterId).IsRequired(false); ;
			builder.Entity<BugItem>().HasOne(r => r.TaskItem).WithMany(t => t.BugItems).HasForeignKey(r => r.TaskItemId);
			builder.Entity<BugItem>().HasIndex(x => x.UpdatedDate);

			builder.Entity<Project>().HasMany(r => r.TaskItems).WithOne(t => t.Project).HasForeignKey(r => r.ProjectId);
			builder.Entity<Project>().HasIndex(x => x.UpdatedDate);

			builder.Entity<ProjectMember>().HasKey(t => new { t.ProjectId, t.ApplicationUserId });
			builder.Entity<ProjectMember>().HasOne(pc => pc.Project).WithMany(p => p.ProjectMembers).HasForeignKey(pc => pc.ProjectId);
			builder.Entity<ProjectMember>().HasOne(pc => pc.ApplicationUser).WithMany(c => c.Projects).HasForeignKey(pc => pc.ApplicationUserId);
			builder.Entity<ProjectMember>().HasIndex(x => x.UpdatedDate);

		}




		public override int SaveChanges()
		{
			UpdateAuditEntities();
			return base.SaveChanges();
		}


		public override int SaveChanges(bool acceptAllChangesOnSuccess)
		{
			UpdateAuditEntities();
			return base.SaveChanges(acceptAllChangesOnSuccess);
		}


		public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
		{
			UpdateAuditEntities();
			return base.SaveChangesAsync(cancellationToken);
		}


		public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
		{
			UpdateAuditEntities();
			return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
		}


		private void UpdateAuditEntities()
		{
			var modifiedEntries = ChangeTracker.Entries()
				.Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));


			foreach (var entry in modifiedEntries)
			{
				var entity = (IAuditableEntity)entry.Entity;
				DateTime now = DateTime.UtcNow;

				if (entry.State == EntityState.Added)
				{
					entity.CreatedDate = now;
					entity.CreatedBy = CurrentUserId;
				}
				else
				{
					base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
					base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
				}

				entity.UpdatedDate = now;
				entity.UpdatedBy = CurrentUserId;
			}
		}
	}
}
