import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskList, TaskEdit, ExpandTask } from './task.model';
import { TaskEndpoint } from './task-endpoint.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PermissionValues } from '../../models/permission.model';
import { Operation } from 'fast-json-patch';

@Injectable()
export class TaskService {

  constructor(private router: Router, private http: HttpClient,
    private taskEndpoint: TaskEndpoint, private authService: AuthService) { }

  GetTask(taskId: number) {
    return this.taskEndpoint.getTaskEndpoint<TaskEdit>(taskId);
  }

  GetExpanded(taskId: number) {
    return this.taskEndpoint.getExpandedEndpoint<ExpandTask>(taskId);
  }

  GetAllTask() {
    return this.taskEndpoint.getAllEndpoint<TaskList[]>();
  }

  GetPendingTask() {
    return this.taskEndpoint.getPendingEndpoint<TaskList[]>();
  }

  GetClosedTask() {
    return this.taskEndpoint.getClosedEndpoint<TaskList[]>();
  }

  GetCompletedTask() {
    return this.taskEndpoint.getCompletedEndpoint<TaskList[]>();
  }

  GetResolvedTask() {
    return this.taskEndpoint.getResolvedEndpoint<TaskList[]>();
  }

  NewTask(task: TaskEdit) {
    return this.taskEndpoint.getCreateEndpoint<TaskEdit>(task);
  }

  UpdateTask(patchDocument: Operation[], taskId?: number) {
    return this.taskEndpoint.getUpdateEndpoint<TaskEdit>(patchDocument, taskId);
  }

  DeleteTask(task: TaskEdit) {
    return this.taskEndpoint.getDeleteEndpoint<TaskEdit>(task.id);
  }

  DeleteRangeTasks(tasks: TaskEdit[]) {
    const ids: number[] = [];
    for (const task of tasks) {
      ids.push(task.id);
    }
    return this.taskEndpoint.getDeleteRangeEndpoint<TaskEdit>(ids);
  }

  get permissions(): PermissionValues[] {
    return this.authService.userPermissions;
  }

  get currentUser() {
    return this.authService.currentUser;
  }
}
