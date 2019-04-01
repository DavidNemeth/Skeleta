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

  GetAllBugItem() {
    return this.bugItemEndpoint.getAllEndpoint<BugItem[]>();
  }

  GetPendingBugs() {
    return this.bugItemEndpoint.getPendingEndpoint<BugItem[]>();
  }

  GetResolvedBugs() {
    return this.bugItemEndpoint.getResolvedEndpoint<BugItem[]>();
  }

  GetClosedBugs() {
    return this.bugItemEndpoint.getClosedEndpoint<BugItem[]>();
  }
}
