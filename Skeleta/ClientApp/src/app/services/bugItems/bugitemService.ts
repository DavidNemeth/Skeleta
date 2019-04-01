import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { PermissionValues } from "../../models/permission.model";
import { BugItem } from "./bugItem.model";
import { BugItemEndpoint } from "./bugItem-endpoint.service";

@Injectable()
export class BugItemService {
  constructor(private router: Router, private http: HttpClient,
    private bugItemEndpoint: BugItemEndpoint, private authService: AuthService) { }

  GetItem(bugid: number) {
    return this.bugItemEndpoint.getBugEndpoint<BugItem>(bugid);
  }

  NewItem(bug: BugItem) {
    return this.bugItemEndpoint.getCreateEndpoint<BugItem>(bug);
  }

  UpdateItem(bug: BugItem) {
    return this.bugItemEndpoint.getUpdateEndpoint(bug, bug.id);
  }

  GetAllBugItem(taskId?: number) {
    return this.bugItemEndpoint.getAllEndpoint<BugItem[]>(taskId);
  }

  GetPendingBugs(taskId?: number) {
    return this.bugItemEndpoint.getPendingEndpoint<BugItem[]>(taskId);
  }

  GetResolvedBugs(taskId?: number) {
    return this.bugItemEndpoint.getResolvedEndpoint<BugItem[]>(taskId);
  }

  GetClosedBugs(taskId?: number) {
    return this.bugItemEndpoint.getClosedEndpoint<BugItem[]>(taskId);
  }
}
