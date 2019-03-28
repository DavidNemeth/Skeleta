import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../../services/tasks/task.model';
import { TaskEditComponent } from '../../controls/editors/task-edit/task-edit.component';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { TaskService } from '../../../services/tasks/taskService';
import { AppTranslationService } from '../../../services/app-translation.service';
import { Utilities } from '../../../services/utilities';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  columns: any[] = [];
  tasks: Task[] = [];
  tasksCache: Task[] = [];
  sourceTask: Task;
  loadingIndicator: boolean;
  selected: Task[] = [];
  gT = (key: string) => this.translationService.getTranslation(key);

  CompletedActive;
  ResolvedActive;
  PendingActive;
  nameFilterValue: string;

  @ViewChild(TaskEditComponent) taskEdit;

  constructor(private accountService: AccountService, private alertService: AlertService,
    private translationService: AppTranslationService, private taskService: TaskService) { }

  ngOnInit() {
    this.PendingActive = true;
    this.loadData();
    this.nameFilterValue = this.accountService.currentUser.fullName;
  }

  onAdd() {
    this.sourceTask = null;
    this.taskEdit.Create();
  }

  onActive(task: Task) {
    this.sourceTask = task;
    this.taskEdit.MarkActive(task);
  }

  onResolved(task: Task) {
    this.sourceTask = task;
    this.taskEdit.MarkResolved(task);
  }

  onCompleted(task: Task) {
    this.sourceTask = task;
    this.taskEdit.MarkCompleted(task);
  }

  onEdit(task: Task) {
    this.sourceTask = task;
    this.taskEdit.Edit(task);
  }

  onDelete(task?: Task) {
    if (task) {
      this.taskEdit.DeleteSingle(task);
    }
    else {
      if (this.selected.length > 0) {
        this.taskEdit.DeleteRange(this.selected);
      }
    }
  }

  onExportAll() {

  }

  onExportSelected() {

  }

  loadResolved() {
    this.tasks = [];
    this.tasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.taskService.GetResolvedTask()
      .subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
  }

  loadCompleted() {
    this.tasks = [];
    this.tasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.taskService.GetCompletedTask()
      .subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
  }

  loadPending() {
    this.tasks = [];
    this.tasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.taskService.GetPendingTask()
      .subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
  }

  onDataLoadSuccessful(tasks: Task[]) {
    for (let item of tasks) {
      item.assignedToName = item.assignedTo.fullName;
    }
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.tasksCache = tasks;
    this.tasks = tasks;
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }

  onSearchChanged(value: string) {
    this.tasks = this.tasksCache
      .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.description, r.priority, r.status, r.assignedToName));
  }

  updateList(returnTask: Task) {
    this.loadData();
  }

  deleteList(tasksToDelete: Task[]) {
    this.loadData();
  }

  private loadData() {
    if (this.PendingActive) {
      this.loadPending();
    }
    if (this.CompletedActive) {
      this.loadCompleted();
    }
    if (this.ResolvedActive) {
      this.loadResolved();
    }
  }
}
