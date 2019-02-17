import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from '../../../../models/role.model';
import { AccountService } from '../../../../services/account.service';
import { Permission } from '../../../../models/permission.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  private deleteOpen = false;
  private openModal = false;
  private isNewRole = false;
  private roleEdit: Role = new Role();
  private rolesToDelete: Role[] = [];
  private allPermissions: Permission[] = [];
  private initialPremissions: Permission[] = [];
  roleForm: FormGroup;

  @Output() shouldUpdateData = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }
  ngOnInit() {
    this.accountService.getPermissions().subscribe(
      premissions => this.allPermissions = premissions
    )
    let permissions: Permission[] = [];
    this.roleForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'description': [''],
      'permissions': []
    });   
  }

  private openChange(value: boolean) {
    if (value) {
    }
    else {
      let permissions: Permission[] = [];
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

  private save() {
    this.submitBtnState = ClrLoadingState.LOADING;

    Object.assign(this.roleEdit, this.roleForm.value);
    if (this.isNewRole) {
      this.accountService.newRole(this.roleEdit)
        .subscribe(role => this.saveSuccessHelper(role), error => this.saveFailedHelper(error));
    }
    else {
      this.accountService.updateRole(this.roleEdit)
        .subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
  }

  private saveSuccessHelper(role?: Role) {
    this.shouldUpdateData.emit();
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
    return this.roleEdit;
  }

  editRole(role: Role) {
    if (Role) {

      var premissions = [];
      for(let premission of role.permissions){
        premissions.push(premission);
      }

      this.openModal = true;
      this.isNewRole = false;
      this.roleForm.patchValue(role);
      this.roleEdit = new Role();
      Object.assign(this.roleEdit, role);
      Object.assign(this.initialPremissions, role.permissions);      
      return this.roleEdit;
    }
    else {
      return this.newRole();
    }
  }

  deleteRoles(roles: Role[]) {
    this.deleteOpen = true;
    this.rolesToDelete = roles;
  }

  private Delete() {
    this.deleteBtnState = ClrLoadingState.LOADING;
    var roleCount = this.rolesToDelete.length;
    var current = 0;

    for (let role of this.rolesToDelete) {
      this.accountService.deleteRole(role).subscribe(
        result => {
          current++;
          if (current === roleCount) {
            this.shouldUpdateData.emit();
            this.deleteOpen = false;
            this.deleteBtnState = ClrLoadingState.SUCCESS;
          }
        }
      );
    }
  }
  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }

}
