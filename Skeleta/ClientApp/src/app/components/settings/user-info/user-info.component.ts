import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { AlertService } from '../../../services/alert.service';
import { Utilities } from '../../../services/utilities';
import { Role } from '../../../models/role.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { UserEdit } from '../../../models/user-edit.model';
import { ClrLoadingState } from '@clr/angular';
import { Permission } from '../../../models/permission.model';
import { UserEditComponent } from '../../controls/user-edit/user-edit.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo: User = new User();
  private allRoles: Role[] = [];
  private userid: string;

  openModal = false;
  Action: string;
  @ViewChild(UserEditComponent) userEdit;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.userInfo = this.accountService.currentUser;
    this.userid = this.accountService.currentUser.id;
    if (this.canViewAllRoles) {
      this.accountService.getRoles().subscribe(roles => this.allRoles = roles);
    }
  }

  loadData() {
    this.accountService.getUser().subscribe(
      user => this.userInfo = user
    );
  }

  get canViewAllRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  editUser() {
    this.openModal = !this.openModal;
    this.Action = "Update";
    this.userEdit.loadUser(this.userid);
  }
}
