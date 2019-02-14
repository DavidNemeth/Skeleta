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


  @Input() isViewOnly: boolean;
  @Input() userId: string;
  @Input() action: CrudAction;
  @Input() openModal: boolean;
  @Output() openModalChange = new EventEmitter<boolean>();
  @Output() shouldUpdateData = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
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
        roles => this.allRoles = roles,
        error => this.allRoles = []
      );
    }
    if (this.action != "Create") {
      this.loadUser(this.userId); 
      this.accountService.getUser(this.userId).subscribe(
        user => this.initialUser = user);
    }
    else
      this.addPassword;
  }

  loadUser(guid?: string) {
    this.userForm.reset();
    if (this.action == "Create") {
      this.userForm.reset();
      this.addPassword;
    }
    else {
      this.obsUser = this.accountService.getUser(guid).pipe(
        tap(user => this.userForm.patchValue(user)));
      console.log("changed");
    }
  }

  private save() {
    this.submitBtnState = ClrLoadingState.LOADING;
    switch (this.action) {

      case "Create":
        this.createUser();
      case "Update":
        this.updateUser();
      default:
        this.updateUser();
    }

  }

  private createUser() {
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
    if (this.userForm.valid) {
      this.userEdit = new UserEdit();
      Object.assign(this.userEdit, this.userForm.value);
      this.userEdit.isEnabled = true;
      this.userEdit.id = this.initialUser.id;
      this.userEdit.userName = this.initialUser.userName;

      this.accountService.updateUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else
      this.submitBtnState = ClrLoadingState.ERROR;
  }





  private saveSuccessHelper(): void {
    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.isCurrentPassowrd = false;
    this.isConfirmPassword = false;
    this.deletePasswordFromUser(this.userEdit);
    this.refreshLoggedInUser();
    this.openModal = false;
    this.openModalChange.emit(false);
    this.shouldUpdateData.emit();
    this.userForm.reset();
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
    if (this.changesFailedCallback)
      this.changesFailedCallback();
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
}
