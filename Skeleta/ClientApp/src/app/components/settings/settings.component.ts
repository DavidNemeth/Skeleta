import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { fadeInOut } from '../../services/animations';
import { AccountService } from '../../services/account.service';
import { Permission } from '../../models/permission.model';
import { ClrTabs } from '@clr/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [fadeInOut]
})
export class SettingsComponent implements OnInit, OnDestroy {

  @Input() class: string;

  isProfileActivated = true;
  isPreferencesActivated = false;
  isUsersActivated = false;
  isRolesActivated = false;

  fragmentSubscription: any;

  readonly profileTab = 'profile';
  readonly preferencesTab = 'preferences';
  readonly usersTab = 'users';
  readonly rolesTab = 'roles';
  managementActive = false;
  cloudActive = false;
  infrastructureActive = false;

  @ViewChild(ClrTabs)
  private readonly tabs: ClrTabs;

  tabsVertical: boolean = true;
  flexboxifiedContent: boolean = false;
  additionalTabHeads: any[];

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  public getTabIndex() {
    const tabIndex = this.tabs.tabLinkDirectives.toArray().findIndex(x => x.active);
    alert('tabIndex = ' + tabIndex);
  }

  ngOnInit() {
    this.additionalTabHeads = [];
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
