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

  getAllTask() {
    return this.taskEndpoint.getAllTasksEndpoint<Task[]>();
  }

  getPendingTasks() {
    return this.taskEndpoint.getPendingTasksEndpoint<Task[]>();
  }

  getClosedTasks() {
    return this.taskEndpoint.getClosedTasksEndpoint<Task[]>();
  }

  getCompletedTasks() {
    return this.taskEndpoint.getCompletedTasksEndpoint<Task[]>();
  }  

  newTask(task: Task) {
    return this.taskEndpoint.getCreateTaskEndpoint<Task>(task);
  }

  get permissions(): PermissionValues[] {
    return this.authService.userPermissions;
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
