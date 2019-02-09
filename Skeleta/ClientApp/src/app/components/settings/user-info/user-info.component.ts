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
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private isEditMode = false;
  private isNewUser = false;
  private isSaving = false;
  private isChangePassword = false;
  private isEditingSelf = false;
  private editingUserName: string;
  private uniqueId: string = Utilities.uniqueId();

  user: Observable<User>;
  private allRoles: Role[] = [];
  private userEdit: UserEdit;
  userForm: FormGroup;

  public formResetToggle = true;

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  @Input()
  isViewOnly: boolean;

  @Input()
  isGeneralEditor = false;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'jobTitle': ['', Validators.required],
      'userName': [{ value: '', disabled: false }, Validators.required ],
      'fullName': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'phoneNumber': ['', Validators.required],
      'roles': [{ value: '', disabled: false }, Validators.required]
    })
    this.user = this.accountService.getUser().pipe(
      tap(user => this.userForm.patchValue(user)));

    this.accountService.getRoles().subscribe(roles => this.allRoles = roles);
  }

  resetForm() {
    this.userForm.reset();
    this.user = this.accountService.getUser().pipe(
      tap(user => this.userForm.patchValue(user)));
  }

  save() {
    if (this.userForm.valid) {
      this.userEdit = new UserEdit();
      Object.assign(this.userEdit, this.userForm.value);
      this.accountService.updateUser(this.userEdit).subscribe();
    }
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
