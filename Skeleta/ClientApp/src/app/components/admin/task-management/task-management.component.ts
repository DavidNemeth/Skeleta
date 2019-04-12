import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskList } from '../../../services/tasks/task.model';
import { TaskEditComponent } from '../../controls/editors/task-edit/task-edit.component';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { TaskService } from '../../../services/tasks/taskService';
import { AppTranslationService } from '../../../services/app-translation.service';
import { Utilities } from '../../../services/utilities';
import { AccountService } from '../../../services/account.service';
import { fadeInOut } from '../../../services/animations';
import { Status } from '../../../models/enum';
import { ClrDatagrid, ClrLoadingState } from "@clr/angular";
import { compare } from 'fast-json-patch';
import * as docx from "docx";
import { TextRun, Packer } from 'docx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
  animations: [fadeInOut]
})
export class TaskManagementComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  columns: any[] = [];

  pendingTasks: TaskList[] = [];
  pendingTasksCache: TaskList[] = [];

  resolvedTasks: TaskList[] = [];
  resolvedTasksCache: TaskList[] = [];

  completedTasks: TaskList[] = [];
  completedTasksCache: TaskList[] = [];

  archivedTasks: TaskList[] = [];
  archivedTasksCache: TaskList[] = [];

  loadingIndicator: boolean;
  selected: TaskList[] = [];
  tasksToRelease: TaskList[] = [];
  gT = (key: string) => this.translationService.getTranslation(key);
  CompletedActive;
  ResolvedActive;
  PendingActive;
  ArchivedActive;
  curDate = new Date();
  @ViewChild(ClrDatagrid) grid: ClrDatagrid;
  @ViewChild(TaskEditComponent) taskEdit;
  @ViewChild("excel") excelLink: ElementRef;
  @ViewChild("word") wordLink: ElementRef;
  @ViewChild("pdf") pdfLink: ElementRef;
  private isOpen = true;
  private releaseOpen = false;
  releaseGroupname: string;
  shouldArchive: boolean = true;
  constructor(private accountService: AccountService, private alertService: AlertService,
    private translationService: AppTranslationService, private taskService: TaskService) { }

  ngOnInit() {
    this.PendingActive = true;
    this.loadPending();
  }

  onAdd() {
    this.taskEdit.Create();
    this.isOpen = false;
  }
  onEdit(task: TaskList) {
    this.taskEdit.Edit(task.id);
    this.isOpen = false;
  }

  onClose(tasks: TaskList[]) {
    this.taskEdit.MarkClosed(tasks);
  }

  onActive(task: TaskList) {
    this.taskEdit.MarkActive(task);
  }

  onResolved(task: TaskList) {
    this.taskEdit.MarkResolved(task);
  }

  onCompleted(task: TaskList) {
    this.taskEdit.MarkCompleted(task);
  }

  onExportSelected(selected: TaskList[]) {
    if (selected.length > 0) {
      Object.assign(this.tasksToRelease, selected);
      console.log(this.tasksToRelease);
      this.releaseOpen = true;
    }
  }

  download(selected: TaskList[]) {
    let doc = new docx.Document();
    let titleDoc = "Releasenote: " + this.curDate.toLocaleDateString() + "\n" + "\n" + "\n" + "\n" + "Az alkalmazás az alábbi fejlesztésekkel bővült: " + "\n" + "\n" + "\n";
    var maintitle = new docx.Paragraph(titleDoc);
    doc.addParagraph(maintitle);

    for (let task of selected) {
      var paragraph = new docx.Paragraph(task.id.toString());
      var mainTitle = new TextRun(task.title).tab().bold();
      paragraph.addRun(mainTitle);
      doc.addParagraph(paragraph);
    }
    // Used to export the file into a .docx file
    var packer = new Packer();
    let title = this.curDate.toLocaleDateString() + "_releasenote.docx";
    packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, title);
      console.log("Document created successfully");
    });
    selected = [];
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
    if (this.ArchivedActive) {
      this.loadClosed();
    }
  }

  loadPending() {
    this.pendingTasks = [];
    this.pendingTasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.taskService.GetPendingTask()
      .subscribe(results => this.onDataLoadSuccessful(results, Status.Active), error => this.onDataLoadFailed(error));
  }

  loadResolved() {
    this.resolvedTasks = [];
    this.resolvedTasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.taskService.GetResolvedTask()
      .subscribe(results => this.onDataLoadSuccessful(results, Status.Resolved), error => this.onDataLoadFailed(error));
  }

  loadCompleted() {
    this.completedTasks = [];
    this.completedTasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.taskService.GetCompletedTask()
      .subscribe(results => this.onDataLoadSuccessful(results, Status.Completed), error => this.onDataLoadFailed(error));
  }

  loadClosed() {
    this.archivedTasks = [];
    this.archivedTasksCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.taskService.GetClosedTask()
      .subscribe(results => this.onDataLoadSuccessful(results, Status.Closed), error => this.onDataLoadFailed(error));
  }

  onDataLoadSuccessful(tasks?: TaskList[], status?: Status) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    if (status == Status.Active) {
      this.pendingTasks = tasks;
      this.pendingTasksCache = tasks;
    }
    if (status == Status.Resolved) {
      this.resolvedTasks = tasks;
      this.resolvedTasksCache = tasks;
    }
    if (status == Status.Completed) {
      this.completedTasks = tasks;
      this.completedTasksCache = tasks;
    }
    if (status == Status.Closed) {
      this.archivedTasks = tasks;
      this.archivedTasksCache = tasks;
    }
    this.isOpen = true;
    console.log("data loaded");
    this.grid.refresh;
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    console.log("Error while fetching list: ",error);
    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
    this.isOpen = true;
  }

  onSearchChanged(value: string) {
    if (this.CompletedActive) {
      this.completedTasks = this.completedTasksCache
        .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName));
    }
    if (this.ResolvedActive) {
      this.resolvedTasks = this.resolvedTasksCache
        .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName));
    }
    if (this.PendingActive) {
      this.pendingTasks = this.pendingTasksCache
        .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName));
    }
  }

  deleteList(tasksToDelete: TaskList[]) {
    for (let task of tasksToDelete) {
      this.removeItem(task.id)
    }
  }

  popItem(id: number) {
    this.removeItem(id);
  }

  popSelected(tasks: TaskList[]) {
    for (let task of tasks) {
      this.removeItem(task.id);
    }
    this.tasksToRelease = [];
  }

  private removeItem(id: number) {
    if (this.CompletedActive) {
      let task = this.completedTasks.filter(x => x.id == id)[0];
      let updateItem = this.completedTasks.find(this.findIndexToUpdate, task.id);
      const taskIndex = this.completedTasks.indexOf(task, 0);
      if (taskIndex > -1) {
        this.completedTasks.splice(taskIndex, 1);
      }
    }
    if (this.ResolvedActive) {
      let task = this.resolvedTasks.filter(x => x.id == id)[0];
      let updateItem = this.resolvedTasks.find(this.findIndexToUpdate, task.id);
      const taskIndex = this.resolvedTasks.indexOf(task, 0);
      if (taskIndex > -1) {
        this.resolvedTasks.splice(taskIndex, 1);
      }
    }
    if (this.PendingActive) {
      let task = this.pendingTasks.filter(x => x.id == id)[0];
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

  private handleUpdate(task: TaskList) {
    if (this.PendingActive) {
      if (task.status == Status.Active || task.status == Status.New) {
        let updateItem = this.pendingTasks.find(this.findIndexToUpdate, task.id);
        let index = this.pendingTasks.indexOf(updateItem);
        this.pendingTasks[index] = task;
      }
      else {
        this.removeItem(task.id);
      }
    }
    if (this.CompletedActive) {
      if (task.status == Status.Completed) {
        let updateItem = this.completedTasks.find(this.findIndexToUpdate, task.id);
        let index = this.completedTasks.indexOf(updateItem);
        this.completedTasks[index] = task;
      }
      else {
        this.removeItem(task.id);
      }
    }
  }

  private onRelease() {
    this.download(this.tasksToRelease);
    this.deleteBtnState = ClrLoadingState.LOADING;
    if (this.tasksToRelease) {
      for (var i = 0; i < this.tasksToRelease.length; i++) {
        let taskEdit = new TaskList();
        Object.assign(taskEdit, this.tasksToRelease[i]);
        if (this.shouldArchive) {
          taskEdit.status = Status.Closed;
        }
        taskEdit.releaseId = this.releaseGroupname;
        let patchDocument = compare(this.tasksToRelease[i], taskEdit);
        this.taskService.UpdateTask(patchDocument, taskEdit.id).subscribe(response => {
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      }
    }
    this.alertService.showMessage(this.gT('toasts.saved'), `Release Note Generated, Tasks Archived!`, MessageSeverity.success);
    this.deleteBtnState = ClrLoadingState.SUCCESS;
    if (this.shouldArchive) {
      this.popSelected(this.tasksToRelease);
    }
    else {
      this.tasksToRelease = [];
    }
    this.releaseOpen = false;
  }

  private open() {
    this.isOpen = true;
  }
}
