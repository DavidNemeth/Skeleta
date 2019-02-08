import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { fadeInOut, fadeInOutRoute } from '../../services/animations';
import { AccountService } from '../../services/account.service';
import { Permission } from '../../models/permission.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [fadeInOutRoute, fadeInOut]
})
export class AdminComponent implements OnInit, OnDestroy {
  @HostBinding('class.content-container')
  public showContainerClass = true; 

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  public getTabIndex() {
  }

  ngOnInit() {
  }

  arrPush(arr: any[]) {
    arr.push(arr[arr.length - 1]);
  }
  arrPop(arr: any[]) {
    arr.pop();
  }

  ngOnDestroy() {

  }

  get canViewUsers() {
    return this.accountService.userHasPermission(Permission.viewUsersPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  } 
}
