import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { Utilities } from '../../../services/utilities';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserEdit } from '../../../models/user-edit.model';
import { ClrLoadingState } from '@clr/angular';
import { EqualValidator } from '../../../directives/equal-validator.directive';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  private isEditMode = false;
  private isNewUser = false;
  private isSaving = false;
  private isChangePassword = false;
  private isEditingSelf = false;
  private editingUserName: string;
  private uniqueId: string = Utilities.uniqueId();

  user: Observable<User>;
  private allRoles: Role[] = [];
  selectedRoles: Role[];
  private userEdit: UserEdit;
  userForm: FormGroup;
  public formResetToggle = true;

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  userInfo: User = new User();

  @Input()
  isViewOnly: boolean;

  @Input()
  isGeneralEditor = false;


  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private accountService: AccountService) {
  }

  ngOnInit() {

    this.userInfo = this.accountService.currentUser;

    this.userForm = this.formBuilder.group({
      'jobTitle': [this.userInfo.jobTitle],
      'fullName': [this.userInfo.fullName, Validators.required],
      'email': [this.userInfo.email, [Validators.required, Validators.email]],
      'phoneNumber': [this.userInfo.phoneNumber, Validators.required],
      'roles': [{ value: this.userInfo.roles, disabled: !this.canAssignRoles }, Validators.required]
    });

    if (this.canViewAllRoles){
       this.accountService.getRoles().subscribe(roles => this.allRoles = roles);
      }

  }

  editUser() {
    this.isEditMode = true;
    this.user = this.accountService.getUser().pipe(
      tap(user => this.userForm.patchValue(user)));   
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



  cancel() {
    this.isEditMode = false;
    this.isChangePassword = false;
    this.userForm.reset();
    this.userForm.removeControl('currentPassword');
    this.userForm.removeControl('newPassword');
    this.userForm.removeControl('confirmPassword');
    this.userForm.patchValue(this.userInfo);
  }

  changePassword() {
    this.userForm.addControl('currentPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('newPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    this.isChangePassword = true;
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
  }

  private saveSuccessHelper(): void {
    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.isEditMode = false;
    this.isChangePassword = false;
    Object.assign(this.userInfo, this.userEdit);
    this.accountService.refreshLoggedInUser().subscribe();
  }


  private getRoleByName(name: string) {
    return this.allRoles.find((r) => r.name == name);
  }

  get canViewAllRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }
}
