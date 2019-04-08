import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Task } from '../../../services/tasks/task.model';
import { TaskEditComponent } from '../../controls/editors/task-edit/task-edit.component';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { TaskService } from '../../../services/tasks/taskService';
import { AppTranslationService } from '../../../services/app-translation.service';
import { Utilities } from '../../../services/utilities';
import { AccountService } from '../../../services/account.service';
import { fadeInOut } from '../../../services/animations';
import { Status } from '../../../models/enum';
import { ClrDatagrid } from "@clr/angular";

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
  animations: [fadeInOut]
})
export class TaskManagementComponent implements OnInit {
  columns: any[] = [];

  pendingTasks: Task[] = [];
  pendingTasksCache: Task[] = [];

  resolvedTasks: Task[] = [];
  resolvedTasksCache: Task[] = [];

  completedTasks: Task[] = [];
  completedTasksCache: Task[] = [];

  loadingIndicator: boolean;
  selected: Task[] = [];
  gT = (key: string) => this.translationService.getTranslation(key);
  CompletedActive;
  ResolvedActive;
  PendingActive;
  curDate = new Date();
  @ViewChild(ClrDatagrid) grid: ClrDatagrid;
  @ViewChild(TaskEditComponent) taskEdit;
  @ViewChild("excel") excelLink: ElementRef;
  @ViewChild("word") wordLink: ElementRef;
  @ViewChild("pdf") pdfLink: ElementRef;
  private isOpen = true;

  constructor(private accountService: AccountService, private alertService: AlertService,
    private translationService: AppTranslationService, private taskService: TaskService, private renderer: Renderer2) { }

  ngOnInit() {
    this.PendingActive = true;
    this.loadPending();
  }

  onAdd() {
    this.taskEdit.Create();
    this.isOpen = false;
  }
  onEdit(task: Task) {
    this.taskEdit.Edit(task.id);
    this.isOpen = false;
  }

  onClose(tasks: Task[]) {
    this.taskEdit.MarkClosed(tasks);
  }

  onActive(task: Task) {
    this.taskEdit.MarkActive(task);
  }

  onResolved(task: Task) {
    this.taskEdit.MarkResolved(task);
  }

  onCompleted(task: Task) {
    this.taskEdit.MarkCompleted(task);
  }

  onExportSelected(selected: Task[], exportOption: string) {
    switch (exportOption) {
      case 'excel':
        const csv = this.selected.map(task => this.taskToFile(task)).join("\n");
        let titlecsv = "Releasenote;" + this.curDate.toLocaleDateString() + "\n" + "Id;Title" + "\n";
        this.renderer.setAttribute(this.excelLink.nativeElement, "href",
          "data:text/plain;charset=utf-8," + titlecsv + csv);

      case 'word':
        const docx = this.selected.map(task => this.excelToFile(task)).join("\n\n");
        let titleDoc = "Releasenote: " + this.curDate.toLocaleDateString() + "\n" + "\n" + "\n" + "\n" + "Az alkalmazás az alábbi fejlesztésekkel bővült: " + "\n" + "\n" + "\n";
        this.renderer.setAttribute(this.wordLink.nativeElement, "href",
          "data:text/plain;charset=utf-8," + titleDoc + docx);

      case 'pdf':
        const pdf = this.selected.map(task => this.taskToFile(task)).join("\n");
        let titlePdf = "Releasenote" + this.curDate.toLocaleDateString() + "\n" + "Id;Title" + "\n";
        this.renderer.setAttribute(this.pdfLink.nativeElement, "href",
          "data:text/plain;charset=utf-8," + titlePdf + pdf);
      default:
    }
  }

  taskToFile(task: Task) {
    return [task.id, task.title].join(';');
  }
  excelToFile(task: Task) {
    return ["Azonositó: " + task.id + " Fejlesztés: " + task.title];
  }

  loadData() {
    if (this.CompletedActive) {
      this.loadCompleted();
    }
    if (this.ResolvedActive) {
      this.loadResolved();
    }
    if (this.PendingActive) {
      this.loadPending();
    }
  }

  loadPending() {
    this.pendingTasks = [];
    this.pendingTasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.taskService.GetPendingTask()
      .subscribe(results => this.onDataLoadSuccessful(results,null,null), error => this.onDataLoadFailed(error));
  }

  loadResolved() {
    this.resolvedTasks = [];
    this.resolvedTasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.taskService.GetResolvedTask()
      .subscribe(results => this.onDataLoadSuccessful(null,results,null), error => this.onDataLoadFailed(error));
  }

  loadCompleted() {
    this.completedTasks = [];
    this.completedTasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.taskService.GetCompletedTask()
      .subscribe(results => this.onDataLoadSuccessful(null,null,results), error => this.onDataLoadFailed(error));
  }

  onDataLoadSuccessful(pending?: Task[], resolved?: Task[], completed?: Task[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    if (pending) {
      this.pendingTasks = pending;
      this.pendingTasksCache = pending;
    }
    if (resolved) {
      this.resolvedTasks = resolved;
      this.resolvedTasksCache = resolved;
    }
    if (completed) {
      this.completedTasks = completed;
      this.completedTasksCache = completed;
    }
    this.isOpen = true;
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
    this.isOpen = true;
  }

  onSearchChanged(value: string) {
    if (this.CompletedActive) {
      this.pendingTasks = this.pendingTasksCache
        .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName));
    }
    if (this.ResolvedActive) {
      this.resolvedTasks = this.resolvedTasksCache
        .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName));
    }
    if (this.PendingActive) {
      this.completedTasks = this.completedTasksCache
        .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName));
    }
  }

  deleteList(tasksToDelete: Task[]) {
    for (let task of tasksToDelete) {
      this.removeItem(task)
    }
  }

  popItem(task: Task) {
    this.removeItem(task);
  }

  popSelected(tasks: Task[]) {
    for (let task of tasks) {
      this.removeItem(task);
    }
  }

  private removeItem(task: Task) {
    if (this.CompletedActive) {
      let updateItem = this.completedTasks.find(this.findIndexToUpdate, task.id);
      const taskIndex = this.completedTasks.indexOf(task, 0);
      if (taskIndex > -1) {
        this.completedTasks.splice(taskIndex, 1);
      }
    }
    if (this.ResolvedActive) {
      let updateItem = this.resolvedTasks.find(this.findIndexToUpdate, task.id);
      const taskIndex = this.resolvedTasks.indexOf(task, 0);
      if (taskIndex > -1) {
        this.resolvedTasks.splice(taskIndex, 1);
      }
    }
    if (this.PendingActive) {
      let updateItem = this.pendingTasks.find(this.findIndexToUpdate, task.id);
      const taskIndex = this.pendingTasks.indexOf(task, 0);
      if (taskIndex > -1) {
        this.pendingTasks.splice(taskIndex, 1);
      }
    }
  }
  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  private open() {
    this.isOpen = true;
  }
}
