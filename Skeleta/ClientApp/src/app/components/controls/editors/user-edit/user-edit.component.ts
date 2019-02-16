import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from '../../../../services/account.service';
import { ClrLoadingState } from '@clr/angular';
import { UserEdit } from '../../../../models/user-edit.model';
import { Permission } from '../../../../models/permission.model';
import { Role } from '../../../../models/role.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  private deleteOpen = false;
  private canChangePassword = false;
  private isNewUser = false;
  private isCurrentPassowrd = false;
  private isConfirmPassword = false;
  private openModal = false;

  initialUser: User = new User();
  obsUser: Observable<User>;
  obsRoles: Observable<Role[]>;
  userEdit: UserEdit;
  private allRoles: Role[] = [];
  private usersToDelete: User[] = [];
  userForm: FormGroup;

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  @Output() shouldUpdateData = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    console.log("init user-edit");
    this.userForm = this.formBuilder.group({
      'userName': ['', Validators.required],
      'jobTitle': [''],
      'fullName': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'phoneNumber': ['', Validators.required],
      'roles': [{ value: [], disabled: !this.canAssignRoles }, Validators.required]
    });
    if (this.canViewAllRoles) {
      this.accountService.getRoles().subscribe(
        roles => this.allRoles = roles
      );
    }
  }

  private openChange(value: boolean) {
    if (value) {
    }
    else {
      this.canChangePassword = false;
      this.isNewUser = false;
      this.openModal = false;
      this.deletePasswordFromUser(this.userEdit);
      this.deletePasswordFromUser(this.initialUser);
      this.userForm = this.formBuilder.group({
        'userName': ['', Validators.required],
        'jobTitle': [''],
        'fullName': ['', Validators.required],
        'email': ['', [Validators.required, Validators.email]],
        'phoneNumber': ['', Validators.required],
        'roles': [{ value: [], disabled: !this.canAssignRoles }, Validators.required]
      });
      this.removeChangePassword();
    }
  }

  private save() {
    this.submitBtnState = ClrLoadingState.LOADING;

    Object.assign(this.userEdit, this.userForm.value);
    console.log(this.userEdit);

    if (this.isNewUser) {
      this.accountService.newUser(this.userEdit).subscribe(user => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else {
      this.accountService.updateUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
  }

  private saveSuccessHelper(): void {
    this.accountService.refreshLoggedInUser().subscribe();
    this.shouldUpdateData.emit();

    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.openModal = false;
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
    console.log(error);
  }

  private addNewPassword() {
    this.userForm.addControl('newPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.isConfirmPassword = true;
  }

  private addChangePassword() {
    if (this.isCurrentPassowrd == true) {
      this.userForm.removeControl('currentPassword');
      this.userForm.removeControl('newPassword');
      this.userForm.removeControl('confirmPassword');
      this.isCurrentPassowrd = false;
      this.isConfirmPassword = false;
    }
    else {
      this.userForm.addControl('currentPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
      this.userForm.addControl('newPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
      this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));

      this.isCurrentPassowrd = true;
      this.isConfirmPassword = true;
    }
  }

  private removeChangePassword() {
    this.userForm.removeControl('currentPassword');
    this.userForm.removeControl('newPassword');
    this.userForm.removeControl('confirmPassword');
    this.isCurrentPassowrd = false;
    this.isConfirmPassword = false;
  }

  private resetForm() {
    this.userForm.reset();
    this.userForm.patchValue(this.initialUser);
    if (!this.isNewUser)
      this.removeChangePassword();
  }

  private deletePasswordFromUser(user: UserEdit | User) {
    const userEdit = <UserEdit>user;

    delete userEdit.currentPassword;
    delete userEdit.newPassword;
    delete userEdit.confirmPassword;
  }

  newUser() {
    this.userForm.controls['userName'].enable();
    this.openModal = true;
    this.canChangePassword = false;
    this.isNewUser = true;

    this.initialUser = new User();
    this.userEdit = new UserEdit();
    this.userEdit.isEnabled = true;
    this.addNewPassword()

    return this.userEdit;
  }

  editUser(user: User) {
    if (user) {
      this.openModal = true;
      this.canChangePassword = true;
      this.userForm.controls['userName'].disable();
      this.isNewUser = false;
      this.userForm.patchValue(user);

      this.initialUser = new User();
      Object.assign(this.initialUser, user);

      this.userEdit = new UserEdit();
      Object.assign(this.userEdit, user);

      return this.userEdit;
    }
    else {
      return this.newUser();
    }
  }

  viewUser(user: User) {
    Object.assign(this.initialUser, user);

    this.userForm.patchValue(this.initialUser);
    this.canChangePassword = false;

    this.userForm.controls['userName'].disable();
    this.userForm.controls['jobTitle'].disable();
    this.userForm.controls['fullName'].disable();
    this.userForm.controls['email'].disable();
    this.userForm.controls['phoneNumber'].disable();
    this.userForm.controls['roles'].disable();
  }

  deleteUsers(users: User[]) {
    this.deleteOpen = true;
    this.usersToDelete = users;
  }

  private Delete() {
    this.deleteBtnState = ClrLoadingState.LOADING;
    var userCount = this.usersToDelete.length;
    var current = 0;

    for (let user of this.usersToDelete) {
      this.accountService.deleteUser(<UserEdit>user).subscribe(
        result => {
          current++;
          if (current === userCount) {
            console.log("obs call" + userCount + " " + current);
            this.shouldUpdateData.emit();
            this.deleteOpen = false;
            this.deleteBtnState = ClrLoadingState.SUCCESS;
          }
        }
      );
    }
  }

  get canViewAllRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }
}
