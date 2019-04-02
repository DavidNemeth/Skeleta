import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Task } from '../../../services/tasks/task.model';
import { TaskEditComponent } from '../../controls/editors/task-edit/task-edit.component';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { TaskService } from '../../../services/tasks/taskService';
import { AppTranslationService } from '../../../services/app-translation.service';
import { Utilities } from '../../../services/utilities';
import { AccountService } from '../../../services/account.service';
import { fadeInOut } from '../../../services/animations';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
  animations: [fadeInOut]
})
export class TaskManagementComponent implements OnInit {
  columns: any[] = [];
  tasks: Task[] = [];
  tasksCache: Task[] = [];
  loadingIndicator: boolean;
  selected: Task[] = [];
  gT = (key: string) => this.translationService.getTranslation(key);
  isOpen: boolean = false;
  CompletedActive;
  ResolvedActive;
  PendingActive;
  curDate = new Date();
  @ViewChild("dg") dg;
  @ViewChild(TaskEditComponent) taskEdit;
  @ViewChild("excel") excelLink: ElementRef;
  @ViewChild("word") wordLink: ElementRef;
  @ViewChild("pdf") pdfLink: ElementRef;

  constructor(private accountService: AccountService, private alertService: AlertService,
    private translationService: AppTranslationService, private taskService: TaskService, private renderer: Renderer2) { }

  ngOnInit() {
    this.PendingActive = true;
    this.loadData();
  }

  onAdd() {
    this.taskEdit.Create();
    this.isOpen = true;
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

  onEdit(task: Task) {
    this.taskEdit.Edit(task.id);
    this.isOpen = true;
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
        console.log(titleDoc + docx);

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
      .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName));
  }

  popItem(task: Task) {
    this.removeItem(task);
  }

  popSelected(tasks: Task[]) {
    for (let task of tasks) {
      this.removeItem(task);
    }
  }

  updateStatus(task: Task) {
    this.updateItem(task);
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

  private removeItem(task: Task) {
    const taskIndex = this.tasks.indexOf(task, 0);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  private updateItem(task: Task) {
    let index = this.tasks.indexOf(task);
    this.tasks[index] = task;
  }

  private closeTab() {
    this.isOpen = false;
    this.loadData();
  }
}
