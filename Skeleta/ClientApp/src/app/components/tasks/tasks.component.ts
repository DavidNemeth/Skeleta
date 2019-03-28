import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Permission } from '../../models/permission.model';
import { fadeInOutRoute, fadeInOut } from '../../services/animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [fadeInOutRoute, fadeInOut]
})
export class TasksComponent implements OnInit {
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
