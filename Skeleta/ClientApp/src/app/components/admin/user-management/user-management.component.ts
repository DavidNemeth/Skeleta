import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';

import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { AppTranslationService } from '../../../services/app-translation.service';
import { AccountService } from '../../../services/account.service';
import { Utilities } from '../../../services/utilities';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { UserEdit } from '../../../models/user-edit.model';


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
  rowSelected: string[] = [];

  allRoles: Role[] = [];


  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {

    //this.userEditor.changesSavedCallback = () => {
    //  this.addNewUserToList();
    //};

    //this.userEditor.changesCancelledCallback = () => {
    //  this.editedUser = null;
    //  this.sourceUser = null;
    //};
  }

  //TODO
  addNewUserToList() {
    //if (this.sourceUser) {
    //  Object.assign(this.sourceUser, this.editedUser);

    //  let sourceIndex = this.rowsCache.indexOf(this.sourceUser, 0);
    //  if (sourceIndex > -1)
    //    Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);

    //  sourceIndex = this.rows.indexOf(this.sourceUser, 0);
    //  if (sourceIndex > -1)
    //    Utilities.moveArrayItem(this.rows, sourceIndex, 0);

    //  this.editedUser = null;
    //  this.sourceUser = null;
    //}
    //else {
    //  const user = new User();
    //  Object.assign(user, this.editedUser);
    //  this.editedUser = null;

    //  let maxIndex = 0;
    //  for (const u of this.rowsCache) {
    //    if ((<any>u).index > maxIndex)
    //      maxIndex = (<any>u).index;
    //  }

    //  (<any>user).index = maxIndex + 1;

    //  this.rowsCache.splice(0, 0, user);
    //  this.rows.splice(0, 0, user);
    //  this.rows = [...this.rows];
    //}
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

  //TODO
  newUser() {
    //this.editingUserName = null;
    //this.sourceUser = null;
    //this.editedUser = this.userEditor.newUser(this.allRoles);
    //this.editorModal.show();
  }

  editUser(row: UserEdit) {
    //this.editingUserName = { name: row.userName };
    //this.sourceUser = row;
    //this.editedUser = this.userEditor.editUser(row, this.allRoles);
    //this.editorModal.show();
  }

  deleteUser(row: UserEdit) {
    this.alertService.showDialog('Are you sure you want to delete \"' + row.userName + '\"?', DialogType.confirm,
      () => this.deleteUserHelper(row));
  }

  deleteUserHelper(row: UserEdit) {

    this.alertService.startLoadingMessage('Deleting...');
    this.loadingIndicator = true;

    this.accountService.deleteUser(row)
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.usersCache = this.usersCache.filter(item => item !== row);
        this.users = this.users.filter(item => item !== row);
      },
        error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage('Delete Error',
            `An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
        });
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
