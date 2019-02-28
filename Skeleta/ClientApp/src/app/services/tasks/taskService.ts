import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Task } from "./task.model";
import { TaskEndpoint } from "./task-endpoint.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { PermissionValues } from "../../models/permission.model";

@Injectable()
export class TaskService {

  constructor(private router: Router, private http: HttpClient,
    private taskEndpoint: TaskEndpoint, private authService: AuthService) { }

  GetAllTask() {
    return this.taskEndpoint.getAllEndpoint<Task[]>();
  }

  GetPendingTask() {
    return this.taskEndpoint.getPendingEndpoint<Task[]>();
  }

  GetClosedTask() {
    return this.taskEndpoint.getClosedEndpoint<Task[]>();
  }

  GetCompletedTask() {
    return this.taskEndpoint.getCompletedEndpoint<Task[]>();
  }  

  GetResolvedTask() {
    return this.taskEndpoint.getResolvedEndpoint<Task[]>();
  }

  NewTask(task: Task) {
    return this.taskEndpoint.getCreateEndpoint<Task>(task);
  }

  UpdateTask(task: Task) {    
      return this.taskEndpoint.getUpdateEndpoint(task, task.id);   
  }

  DeleteTask(task: Task) {
    return this.taskEndpoint.getDeleteEndpoint<Task>(task.id);
  }

  DeleteRangeTasks(tasks: Task[]) {
    var ids: number[] = [];
    for (let task of tasks) {
      ids.push(task.id);
    }
    return this.taskEndpoint.getDeleteRangeEndpoint<Task>(ids);
  }

  get permissions(): PermissionValues[] {
    return this.authService.userPermissions;
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
