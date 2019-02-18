import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { AlertService } from '../../../services/alert.service';
import { Role } from '../../../models/role.model';
import { FormBuilder } from "@angular/forms";
import { Permission } from '../../../models/permission.model';
import { UserEditComponent } from '../../controls/editors/user-edit/user-edit.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  sourceUser: User;
  user: User = new User();
  private allRoles: Role[] = [];

  @ViewChild(UserEditComponent) userEdit;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.user = this.accountService.currentUser;
    if (this.canViewAllRoles) {
      this.accountService.getRoles().subscribe(roles => this.allRoles = roles);
    }
  }

  updateUser(returnUserEdit: User) {
    if (this.sourceUser && returnUserEdit) {
      this.user = returnUserEdit;
      this.sourceUser == null;  
    }           
  }

  get canViewAllRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  onEdit() {
    this.sourceUser = this.user;
    this.userEdit.editUser(this.user);
  }
}
