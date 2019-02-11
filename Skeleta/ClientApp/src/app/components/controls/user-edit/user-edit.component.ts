import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { ClrLoadingState } from '@clr/angular';
import { UserEdit } from '../../../models/user-edit.model';
import { Permission } from '../../../models/permission.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  private isNewUser = false;
  private isEditingSelf = false;

  user: Observable<User>;

  userForm: FormGroup;
  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;
  userInfo: User = new User();
  userEdit: UserEdit;
  isEditMode: boolean;
  isChangePassword: boolean;

  @Input()
  isGeneralEditor = false;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'jobTitle': [this.userInfo.jobTitle],
      'fullName': [this.userInfo.fullName, Validators.required],
      'email': [this.userInfo.email, [Validators.required, Validators.email]],
      'phoneNumber': [this.userInfo.phoneNumber, Validators.required],
      'roles': [{ value: this.userInfo.roles, disabled: !this.canAssignRoles }, Validators.required]
    });

  }



  save() {
    this.submitBtnState = ClrLoadingState.LOADING;

    if (this.userForm.valid) {
      this.userEdit = new UserEdit();
      Object.assign(this.userEdit, this.userForm.value);
      this.userEdit.isEnabled = true;
      this.userEdit.id = this.userInfo.id;
      this.userEdit.userName = this.userInfo.userName;

      this.accountService.updateUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else
      this.submitBtnState = ClrLoadingState.ERROR;
  }

  private saveFailedHelper(error: any): void {
    throw new Error("Method not implemented.");
  }

  private saveSuccessHelper(): void {
    throw new Error("Method not implemented.");
  }

  cancel() {
    this.isEditMode = false;
    this.isChangePassword = false;
    this.userForm.reset();
    this.userForm.removeControl('currentPassword');
    this.userForm.removeControl('newPassword');
    this.userForm.removeControl('confirmPassword');
    this.userForm.patchValue(this.userInfo);
  }

  private changePassword() {
    this.userForm.addControl('currentPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('newPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.isChangePassword = true;
  }

  get canViewAllRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }
}
