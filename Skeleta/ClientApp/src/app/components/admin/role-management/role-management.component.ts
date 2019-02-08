import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { AppTranslationService } from '../../../services/app-translation.service';
import { AccountService } from '../../../services/account.service';
import { Utilities } from '../../../services/utilities';

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

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private accountService: AccountService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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
