import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { ClrLoadingState } from '@clr/angular';
import { UserEdit } from '../../../models/user-edit.model';
import { Permission } from '../../../models/permission.model';
import { Role } from '../../../models/role.model';
import { tap } from 'rxjs/operators';
import { CrudAction } from '../../../models/enum';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  private userId: string;
  private isCurrentPassowrd = false;
  private isConfirmPassword = false;
  initialUser: User = new User();
  obsUser: Observable<User>;
  obsRoles: Observable<Role[]>;
  userEdit: UserEdit;
  private allRoles: Role[] = [];

  userForm: FormGroup;

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;


  @Input() action: CrudAction;
  @Input() openModal: boolean;
  @Output() openModalChange = new EventEmitter<boolean>();
  @Output() shouldUpdateData = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    console.log("init user-edit");
    this.userForm = this.formBuilder.group({
      'userName': [{ value: '', disabled: this.action == "Update" }, Validators.required],
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

  loadUser(guid?: string) {
    console.log(this.action);
    if (this.action == "Create") {
      this.addPassword();
      console.log("in create");
    }
    else {
      console.log("in edit");
      this.obsUser = this.accountService.getUser(guid).pipe(
        tap(user => this.userForm.patchValue(user)));
      this.accountService.getUser(guid).subscribe(
        user => this.initialUser = user
      );
      console.log(this.initialUser);

      this.userId = guid;
    }
  }

  private save() {
    console.log(this.action);
    this.submitBtnState = ClrLoadingState.LOADING;
    switch (this.action) {

      case "Create":
        this.createUser();
        break;
      case "Update":
        this.updateUser();
        break;
      default:
    }

  }

  private createUser() {
    console.log("In CreateUser");
    if (this.userForm.valid) {
      this.userEdit = new UserEdit();
      Object.assign(this.userEdit, this.userForm.value);
      this.userEdit.isEnabled = true;
      this.accountService.newUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else
      this.submitBtnState = ClrLoadingState.ERROR;
  }

  private updateUser() {
    console.log("in UpdateUser");
    if (this.userForm.valid) {
      this.userEdit = new UserEdit();
      Object.assign(this.userEdit, this.userForm.value);
      this.userEdit.isEnabled = true;
      this.userEdit.id = this.userId;
      this.userEdit.userName = this.initialUser.userName;

      this.accountService.updateUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else
      this.submitBtnState = ClrLoadingState.ERROR;
  }





  private saveSuccessHelper(): void {
    this.userForm.reset();
    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.isCurrentPassowrd = false;
    this.isConfirmPassword = false;
    this.deletePasswordFromUser(this.userEdit);
    this.refreshLoggedInUser();
    this.openModal = false;
    this.openModalChange.emit(false);
    this.shouldUpdateData.emit();
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
    console.log(error);
  }

  private deletePasswordFromUser(user: UserEdit | User) {
    const userEdit = <UserEdit>user;

    delete userEdit.currentPassword;
    delete userEdit.newPassword;
    delete userEdit.confirmPassword;
  }

  private refreshLoggedInUser() {
    this.accountService.refreshLoggedInUser().subscribe();
  }

  private addPassword() {
    this.userForm.addControl('newPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.isConfirmPassword = true;
  }

  private changePassword() {
    this.userForm.addControl('currentPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('newPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.isCurrentPassowrd = true;
    this.isConfirmPassword = true;
  }

  openChange(value: boolean) {
    if (value) {
      this.openModal = true;
    } else {
      this.userForm.reset();
      this.openModal = false;
      this.openModalChange.emit();
    }
  }

  get canViewAllRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }

  resetForm(replace = false) {
    this.isChangePassword = false;

    if (!replace) {
      this.form.reset();
    }
    else {
      this.formResetToggle = false;

      setTimeout(() => {
        this.formResetToggle = true;
      });
    }
  }


  newUser(allRoles: Role[]) {
    this.isGeneralEditor = true;
    this.isNewUser = true;

    this.allRoles = [...allRoles];
    this.editingUserName = null;
    this.user = this.userEdit = new UserEdit();
    this.userEdit.isEnabled = true;
    this.edit();

    return this.userEdit;
  }

  editUser(user: User, allRoles: Role[]) {
    if (user) {
      this.isGeneralEditor = true;
      this.isNewUser = false;

      this.setRoles(user, allRoles);
      this.editingUserName = user.userName;
      this.user = new User();
      this.userEdit = new UserEdit();
      Object.assign(this.user, user);
      Object.assign(this.userEdit, user);
      this.edit();

      return this.userEdit;
    }
    else {
      return this.newUser(allRoles);
    }
  }


  displayUser(user: User, allRoles?: Role[]) {

    this.user = new User();
    Object.assign(this.user, user);
    this.deletePasswordFromUser(this.user);
    this.setRoles(user, allRoles);

    this.isEditMode = false;
  }

}
