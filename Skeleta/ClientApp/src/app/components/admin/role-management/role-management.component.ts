import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { AppTranslationService } from '../../../services/app-translation.service';
import { AccountService } from '../../../services/account.service';
import { Utilities } from '../../../services/utilities';
import { RoleEditComponent } from '../../controls/editors/role-edit/role-edit.component';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  columns: any[] = [];
  roles: Role[] = [];
  rolesCache: Role[] = [];
  allPermissions: Permission[] = [];
  editedRole: Role;
  sourceRole: Role;
  editingRoleName: { name: string };
  loadingIndicator: boolean;
  selected: Role[] = [];

  @ViewChild(RoleEditComponent) roleEdit;

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private accountService: AccountService) {
  }

  ngOnInit() {
    this.loadData();
  }

  onAdd() {
    if (this.canManageRoles) {
      this.roleEdit.newRole();
    }
  }

  onEdit() {
    if (this.canManageRoles) {
      this.roleEdit.editRole(this.selected[0]);
    }
  }

  onDelete() {
    if (this.selected.length > 0 && this.canManageRoles) {
      this.roleEdit.deleteRoles(this.selected);
    }
  }

  onExportAll() {

  }

  onExportSelected() {

  }

  loadData() {
    this.roles = [];
    this.rolesCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.accountService.getRolesAndPermissions()
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        const roles = results[0];
        const permissions = results[1];

        roles.forEach((role, index) => {
          (<any>role).index = index + 1;
        });


        this.rolesCache = [...roles];
        this.roles = roles;

        this.allPermissions = permissions;
      },
        error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage('Load Error',
            `Unable to retrieve roles from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
        });
  }

  onSearchChanged(value: string) {
    this.roles = this.rolesCache.filter(r => Utilities.searchArray(value, false, r.name, r.description));
  }

  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }

}
