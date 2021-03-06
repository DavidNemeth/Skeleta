import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { AppTranslationService } from '../../../services/app-translation.service';
import { AccountService } from '../../../services/account.service';
import { Utilities } from '../../../services/utilities';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { UserEdit } from '../../../models/user-edit.model';
import { UserEditComponent } from '../../controls/editors/user-edit/user-edit.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private accountService: AccountService) { }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }
  columns: any[] = [];
  users: User[] = [];
  usersCache: User[] = [];
  sourceUser: User;
  editingUserName: { name: string };
  loadingIndicator: boolean;
  selected: User[] = [];
  allRoles: Role[] = [];

  @ViewChild(UserEditComponent) userEdit;
  gT = (key: string) => this.translationService.getTranslation(key);

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {

  }

  onAdd() {
    this.sourceUser = null;
    this.userEdit.newUser();
  }

  onEdit(user: User) {
    this.sourceUser = user;
    this.userEdit.editUser(user);
  }

  onDelete(user?: User) {
    if (user) {
      const users: User[] = [];
      users.push(user);
      this.userEdit.deleteUsers(users);
    } else {
    if (this.selected.length > 0) {
      this.userEdit.deleteUsers(this.selected);
      }
    }
  }

  onExportAll() {

  }

  onExportSelected() {

  }

  updateList(returnUserEdit: User) {
    if (this.sourceUser) {
      const index = this.users.indexOf(this.sourceUser);
      const cacheIndex = this.usersCache.indexOf(this.sourceUser);
      this.users[index] = returnUserEdit;
      this.usersCache[cacheIndex] = returnUserEdit;
      this.sourceUser = new User();
    } else {
      this.users.unshift(returnUserEdit);
      this.usersCache.unshift(returnUserEdit);
    }
  }

  deleteList(userToDelete: User[]) {
    for (const user of userToDelete) {
      this.users = this.users.filter(obj => obj !== user);
      this.usersCache = this.usersCache.filter(obj => obj !== user);
    }
  }

  loadData() {
    this.users = [];
    this.usersCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    if (this.canViewRoles) {
      this.accountService.getUsersAndRoles()
        .subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
    } else {
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
}
