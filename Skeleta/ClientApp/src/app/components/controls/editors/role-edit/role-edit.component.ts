import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from '../../../../models/role.model';
import { AccountService } from '../../../../services/account.service';
import { Permission } from '../../../../models/permission.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  deleteOpen = false;
  openModal = false;
  private isNewRole = false;
  private roleEdit: Role = new Role();
  private rolesToDelete: Role[] = [];
  allPermissions: Permission[] = [];
  initialPremissions: Permission[] = [];
  initialRole: Role = new Role();
  roleForm: FormGroup;

  @Output() updateData = new EventEmitter<Role>();
  @Output() deleteData = new EventEmitter<Role[]>();

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }
  ngOnInit() {
    this.accountService.getPermissions().subscribe(
      premissions => this.allPermissions = premissions
    );
    const permissions: Permission[] = [];
    this.roleForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'description': [''],
      'permissions': []
    });
  }

  openChange(value: boolean) {
    if (value) {
    } else {
      const permissions: Permission[] = [];
      this.isNewRole = false;
      this.openModal = false;
      this.initialPremissions = [];
      this.roleForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'description': [''],
        'permissions': []
      });
    }
  }

  save() {
    this.submitBtnState = ClrLoadingState.LOADING;

    Object.assign(this.roleEdit, this.roleForm.value);
    if (this.isNewRole) {
      this.accountService.newRole(this.roleEdit)
        .subscribe(role => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    } else {
      this.accountService.updateRole(this.roleEdit)
        .subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
  }

  private saveSuccessHelper() {
    Object.assign(this.initialRole, this.roleEdit);
    this.updateData.emit(this.initialRole);
    this.roleEdit = new Role();
    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.openModal = false;
  }

  private saveFailedHelper(error: any) {
    this.submitBtnState = ClrLoadingState.ERROR;
    console.log(error);
  }

  newRole() {
    this.openModal = true;
    this.isNewRole = true;
    this.roleEdit = new Role();
    this.initialPremissions = [];
    this.initialRole = new Role();
  }

  editRole(role: Role) {
    if (Role) {

      const premissions = [];
      for (const premission of role.permissions) {
        premissions.push(premission);
      }
      this.openModal = true;
      this.isNewRole = false;
      this.roleForm.patchValue(role);

      this.roleEdit = new Role();
      Object.assign(this.roleEdit, role);

      this.initialRole = new Role();
      Object.assign(this.initialRole, role);

      this.initialPremissions = [];
      Object.assign(this.initialPremissions, role.permissions);
    } else {
      return this.newRole();
    }
  }

  deleteRoles(roles: Role[]) {
    this.deleteOpen = true;
    this.rolesToDelete = roles;
  }

  Delete() {
    this.deleteBtnState = ClrLoadingState.LOADING;

    const observables: Observable<any>[] = [];
    for (const role of this.rolesToDelete) {
      observables.push(this.accountService.deleteRole(role));
    }

    forkJoin(observables)
      .subscribe(dataArray => {
        this.deleteData.emit(this.rolesToDelete);
        this.deleteOpen = false;
        this.deleteBtnState = ClrLoadingState.SUCCESS;
      });
  }

  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }
}
