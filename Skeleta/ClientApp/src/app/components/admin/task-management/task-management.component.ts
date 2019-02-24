import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../../services/tasks/task.model';
import { TaskEditComponent } from '../../controls/editors/task-edit/task-edit.component';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { TaskService } from '../../../services/tasks/taskService';
import { AppTranslationService } from '../../../services/app-translation.service';
import { Utilities } from '../../../services/utilities';

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

  @ViewChild(TaskEditComponent) taskEdit;

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.loadData();
  }

  onAdd() {
    this.sourceTask = null;
    this.taskEdit.newTask();
  }

  onEdit(task: Task) {
    this.sourceTask = task;
    this.taskEdit.editTask(task);
  }

  onDelete(task?: Task) {
    if (task) {
      let tasks: Task[] = [];
      tasks.push(task);
      this.taskEdit.deleteTasks(tasks);
    }
    else {
      if (this.selected.length > 0) {
        this.taskEdit.deleteTasks(this.selected);
      }
    }
  }

  onExportAll() {

  }

  onExportSelected() {

  }

  loadData() {
    this.tasks = [];
    this.tasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.taskService.getAllTask()
      .subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
  }

  onDataLoadSuccessful(tasks: Task[]) {
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
      .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.description, r.priority, r.status, r.assignedTo.fullName));
  }
}
