import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';

import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { AppTranslationService } from '../../../services/app-translation.service';
import { AccountService } from '../../../services/account.service';
import { Utilities } from '../../../services/utilities';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { UserEdit } from '../../../models/user-edit.model';
import { forEach } from '@angular/router/src/utils/collection';
import { UserEditComponent } from '../../controls/user-edit/user-edit.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  columns: any[] = [];
  users: User[] = [];
  usersCache: User[] = [];
  editedUser: UserEdit;
  sourceUser: UserEdit;
  editingUserName: { name: string };
  loadingIndicator: boolean;
  selected: User[] = [];

  allRoles: Role[] = [];

  userId: string;
  openModal: boolean;
  Action: string;
  @ViewChild(UserEditComponent) userEdit;

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
       
  }
   
  onAdd() {
    this.userEdit.newUser(this.allRoles);
  }
  onEdit() {
    this.Action = "Update";
    this.openModal = !this.openModal;
    for (let user of this.selected){
      this.userId = user.id;
    }
    this.userEdit.loadUser(this.userId);
  }

  onExportAll() {
  }

  onExportSelected() {
  }


  loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    if (this.canViewRoles) {
      this.accountService.getUsersAndRoles()
        .subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
    }
    else {
      this.accountService.getUsers()
        .subscribe(users => this.onDataLoadSuccessful(users, this.accountService.currentUser.roles.map(x => new Role(x))),
          error => this.onDataLoadFailed(error));
    }
  }

  onDataLoadSuccessful(users: User[], roles: Role[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    users.forEach((user, index) => {
      (<any>user).index = index + 1;
    });

    this.usersCache = [...users];
    this.users = users;

    this.allRoles = roles;
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }

  onSearchChanged(value: string) {
    this.users = this.usersCache
      .filter(r => Utilities.searchArray(value, false, r.id, r.userName, r.fullName, r.email, r.phoneNumber, r.jobTitle, r.roles));
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }
}
