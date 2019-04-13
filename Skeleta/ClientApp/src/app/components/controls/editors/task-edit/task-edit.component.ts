import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { ClrLoadingState, ClrForm } from '@clr/angular';
import { AppTranslationService } from '../../../../services/app-translation.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../../../../services/tasks/taskService';
import { TaskList, TaskEdit } from '../../../../services/tasks/task.model';
import { Status, Priority } from '../../../../models/enum';
import { Observable, forkJoin } from 'rxjs';
import { AccountService } from '../../../../services/account.service';
import { User } from '../../../../models/user.model';
import { fadeInOut } from '../../../../services/animations';
import { compare } from 'fast-json-patch';
import { bounceIn } from 'ngx-animate';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Permission } from '../../../../models/permission.model';
import * as docx from 'docx';
import { TextRun, Packer } from 'docx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  animations: [fadeInOut,
    trigger('bounceIn', [transition('void => *', useAnimation(bounceIn))])
  ],
})

export class TaskEditComponent implements OnInit {

  constructor(private translationService: AppTranslationService,
    private alertService: AlertService, private formBuilder: FormBuilder,
    private taskService: TaskService, private accountService: AccountService) { }

  get canSetStatus() {
    return this.accountService.userHasPermission(Permission.setStatusTasksPremission);
  }
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  deleteOpen = false;
  archiveOpen = false;
  resolveOpen = false;
  completeOpen = false;
  releaseOpen = false;
  releaseGroupname: string;
  shouldArchive = true;
  private isNewTask = false;
  allStatus = [...Object.keys(Status)];
  allPriority = [...Object.keys(Priority)];
  initialTask: TaskEdit = new TaskEdit();
  taskEdit: TaskEdit = new TaskEdit();
  private tasksToDelete: TaskEdit[] = [];
  private tasksToClose: TaskEdit[] = [];
  private tasksToRelease: TaskEdit[] = [];
  private taskToUpdate: TaskEdit = new TaskEdit();
  dataLoaded = false;
  isOpen: boolean;
  createdBy: string;
  updatedBy: string;
  curDate = new Date();
  taskForm: FormGroup;
  users: User[] = [];
  currentUser: User;
  isEdit: boolean;
  @ViewChild(ClrForm) clrForm;
  @Output() popData = new EventEmitter<number>();
  @Output() popSelected = new EventEmitter<TaskEdit[]>();
  @Output() updateData = new EventEmitter<TaskEdit>();
  @Output() cancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  gT = (key: string) => this.translationService.getTranslation(key);

  ngOnInit() {
    this.accountService.getActiveUsers().subscribe(
      users => this.users = users
    );
    this.currentUser = this.accountService.currentUser;
  }

  private loadForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['High', Validators.required],
      status: [{ value: 'New', disabled: this.isEdit && !this.canSetStatus }, Validators.required],
      developerId: [this.currentUser.id],
      testerId: [this.currentUser.id]
    });
    this.dataLoaded = true;
  }

  private cleanup() {
    this.taskForm.reset();
    this.isEdit = false;
    this.isNewTask = false;
    this.alertService.resetStickyMessage();
  }
  private close() {
    this.cancel.emit();
    this.isOpen = false;
    this.dataLoaded = false;
    this.cleanup();
  }

  save() {
    this.submitBtnState = ClrLoadingState.LOADING;
    Object.assign(this.taskEdit, this.taskForm.value);
    const patchDocument = compare(this.initialTask, this.taskEdit);
    if (this.isNewTask) {
      this.taskService.NewTask(this.taskEdit).subscribe(task => this.saveSuccessHelper(),
        error => this.saveFailedHelper(error));
    } else {
      this.taskService.UpdateTask(patchDocument, this.taskEdit.id).subscribe
        (task => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }

  }

  private saveSuccessHelper(): void {
    this.refresh.emit();
    Object.assign(this.initialTask, this.taskEdit);
    if (this.isNewTask) {
      this.alertService.showMessage(this.gT('toasts.saved'), `Task added!`, MessageSeverity.success);
    } else {
      this.alertService.showMessage(this.gT('toasts.saved'), `Task modified!`, MessageSeverity.success);
    }

    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.close();
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }


  Create() {
    this.isOpen = true;
    this.isEdit = false;
    this.submitBtnState = ClrLoadingState.DEFAULT;
    this.isNewTask = true;
    this.initialTask = new TaskEdit();
    this.taskEdit = new TaskEdit();
    this.loadForm();
  }


  Edit(taskid: number) {
    if (taskid) {
      setTimeout(() => this.isOpen = true, 500);
      this.isEdit = true;
      this.taskService.GetTask(taskid).subscribe(response => {
        this.initialTask = new TaskEdit();
        this.taskEdit = new TaskEdit();
        Object.assign(this.initialTask, response);
        Object.assign(this.taskEdit, response);
        this.createdBy = this.users.filter(x => x.id === this.taskEdit.createdBy).map(x => x.fullName)[0];
        this.updatedBy = this.users.filter(x => x.id === this.taskEdit.updatedBy).map(x => x.fullName)[0];
        this.submitBtnState = ClrLoadingState.DEFAULT;
        this.isNewTask = false;
        this.loadForm();
        this.taskForm.patchValue(this.taskEdit);
      },
        error => {
          console.log(error);
          this.Create();
        }
      );
    } else {
      this.Create();
    }
  }

  MarkActive(task: TaskEdit) {
    if (task) {
      if (task.status === Status.New) {
        const taskEdit: TaskEdit = new TaskEdit();
        Object.assign(taskEdit, task);
        taskEdit.status = Status.Active;
        const patchDocument = compare(task, taskEdit);
        this.taskService.UpdateTask(patchDocument, task.id).subscribe(
          response => {
            this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Active!`, MessageSeverity.success);
            this.updateData.emit(taskEdit);
          },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      } else {
        const taskEdit: TaskEdit = new TaskEdit();
        Object.assign(taskEdit, task);
        taskEdit.status = Status.Active;
        const patchDocument = compare(task, taskEdit);
        this.taskService.UpdateTask(patchDocument, task.id).subscribe(
          response => {
            this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Active!`, MessageSeverity.success);
            this.popData.emit(response.id);
          },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      }
    }
  }


  onResolved() {
    if (this.taskToUpdate) {
      const taskEdit: TaskEdit = new TaskEdit();
      Object.assign(taskEdit, this.taskToUpdate);
      taskEdit.status = Status.Resolved;
      const patchDocument = compare(this.taskToUpdate, taskEdit);
      this.taskService.UpdateTask(patchDocument, this.taskToUpdate.id).subscribe(
        response => {
          this.alertService.showMessage(this.gT('toasts.saved'), `Task ` + response.id.toString() + ` Resolved!`, MessageSeverity.success);
          this.popData.emit(response.id);
        },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
    this.taskToUpdate = new TaskEdit();
    this.resolveOpen = false;
  }

  onCompleted() {
    if (this.taskToUpdate) {
      const taskEdit: TaskEdit = new TaskEdit();
      Object.assign(taskEdit, this.taskToUpdate);
      taskEdit.status = Status.Completed;
      const patchDocument = compare(this.taskToUpdate, taskEdit);
      this.taskService.UpdateTask(patchDocument, this.taskToUpdate.id).subscribe(
        response => {
          this.alertService.showMessage(this.gT('toasts.saved'), `Task ` + response.id.toString() + ` Completed!`, MessageSeverity.success);
          this.popData.emit(response.id);
        },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
    this.taskToUpdate = new TaskEdit();
    this.completeOpen = false;
  }


  MarkResolved(task: TaskEdit) {
    Object.assign(this.taskToUpdate, task);
    this.resolveOpen = true;
  }

  MarkCompleted(task: TaskEdit) {
    Object.assign(this.taskToUpdate, task);
    this.completeOpen = true;
  }

  MarkClosed(tasks: TaskEdit[]) {
    Object.assign(this.tasksToClose, tasks);
    this.archiveOpen = true;
  }

  MarkExport(tasks: TaskEdit[]) {
    Object.assign(this.tasksToRelease, tasks);
    this.releaseOpen = true;
  }

  onRelease() {
    this.download(this.tasksToRelease);
    this.deleteBtnState = ClrLoadingState.LOADING;
    if (this.tasksToRelease) {
      for (let i = 0; i < this.tasksToRelease.length; i++) {
        const taskEdit = new TaskList();
        Object.assign(taskEdit, this.tasksToRelease[i]);
        if (this.shouldArchive) {
          taskEdit.status = Status.Closed;
        }
        taskEdit.releaseId = this.releaseGroupname;
        const patchDocument = compare(this.tasksToRelease[i], taskEdit);
        this.taskService.UpdateTask(patchDocument, taskEdit.id).subscribe(response => {
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      }
    }
    this.alertService.showMessage(this.gT('toasts.saved'), `Release Note Generated, Tasks Archived!`, MessageSeverity.success);
    this.deleteBtnState = ClrLoadingState.SUCCESS;
    if (this.shouldArchive) {
      this.popSelected.emit(this.tasksToRelease);
    } else {
      this.tasksToRelease = [];
    }
    this.releaseOpen = false;
  }

  private download(selected: TaskEdit[]) {
    const doc = new docx.Document();
    const titleDoc = 'Releasenote: ' + this.curDate.toLocaleDateString()
      + '\n' + '\n' + '\n' + '\n' + 'Az alkalmazás az alábbi fejlesztésekkel bővült: '
      + '\n' + '\n' + '\n';
    const maintitle = new docx.Paragraph(titleDoc);
    doc.addParagraph(maintitle);

    for (const task of selected) {
      const paragraph = new docx.Paragraph(task.id.toString());
      const mainTitle = new TextRun(task.title).tab().bold();
      paragraph.addRun(mainTitle);
      doc.addParagraph(paragraph);
    }
    const packer = new Packer();
    const title = this.curDate.toLocaleDateString() + '_releasenote.docx';
    packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, title);
      console.log('Document created successfully');
    });
    selected = [];
  }

  CloseTasks() {
    this.deleteBtnState = ClrLoadingState.LOADING;
    if (this.tasksToClose) {
      for (let i = 0; i < this.tasksToClose.length; i++) {
        const taskEdit = new TaskEdit();
        Object.assign(taskEdit, this.tasksToClose[i]);
        taskEdit.releaseId = this.releaseGroupname;
        taskEdit.status = Status.Closed;
        const patchDocument = compare(this.tasksToClose[i], taskEdit);
        this.taskService.UpdateTask(patchDocument, this.tasksToClose[i].id).subscribe(response => {
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      }
      this.alertService.showMessage(this.gT('toasts.saved'), `Task(s) Archived!`, MessageSeverity.success);
      this.deleteBtnState = ClrLoadingState.SUCCESS;
      this.popSelected.emit(this.tasksToClose);
      this.archiveOpen = false;
    }
  }

  DeleteRange(tasks: TaskEdit[]) {
    this.deleteOpen = true;
    Object.assign(this.tasksToDelete, tasks);
    this.taskToUpdate = null;
  }

  DeleteSingle(task: TaskEdit) {
    this.deleteOpen = true;
    this.taskToUpdate = task;
    this.tasksToDelete = null;
  }

  Delete() {
    this.deleteBtnState = ClrLoadingState.LOADING;

    if (this.tasksToDelete != null) {
      this.taskService.DeleteRangeTasks(this.tasksToDelete).subscribe(
        response => {
          this.refresh.emit();
          this.deleteBtnState = ClrLoadingState.SUCCESS;
          this.deleteOpen = false;
          this.alertService.showMessage(this.gT('toasts.saved'), `${this.tasksToDelete.length} record Deleted!`, MessageSeverity.success);
        });
    }

    if (this.taskToUpdate != null) {
      this.taskToUpdate.status = Status.Closed;
      Object.assign(this.initialTask, this.taskToUpdate);
      this.taskToUpdate.status = Status.Active;
      const patchDocument = compare(this.initialTask, this.taskToUpdate);
      this.taskService.UpdateTask(patchDocument, this.taskToUpdate.id).subscribe(response => {
        this.alertService.showMessage(this.gT('toasts.saved'), `Record Deleted!`, MessageSeverity.success);
        this.popData.emit(this.taskToUpdate.id);
        this.deleteBtnState = ClrLoadingState.SUCCESS;
        this.deleteOpen = false;
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }
}
