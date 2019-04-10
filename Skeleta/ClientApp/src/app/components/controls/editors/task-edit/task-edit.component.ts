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

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  animations: [fadeInOut,
    trigger('bounceIn', [transition('void => *', useAnimation(bounceIn))])
  ],
})

export class TaskEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  gT = (key: string) => this.translationService.getTranslation(key);

  private deleteOpen = false;
  private archiveOpen = false;
  private resolveOpen = false;
  private completeOpen = false;

  private isNewTask = false;
  private allStatus = [...Object.keys(Status)];
  private allPriority = [...Object.keys(Priority)];
  initialTask: TaskEdit = new TaskEdit();
  taskEdit: TaskEdit = new TaskEdit();
  private tasksToDelete: TaskEdit[] = [];
  private tasksToClose: TaskEdit[] = [];
  private taskToUpdate: TaskEdit = new TaskEdit();
  private dataLoaded: boolean = false;
  private isOpen: boolean;
  createdBy: string;
  updatedBy: string;
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

  constructor(private translationService: AppTranslationService,
    private alertService: AlertService, private formBuilder: FormBuilder,
    private taskService: TaskService, private accountService: AccountService) { }

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
      status: [{ value: 'New', disabled: this.isEdit && !this.canSetStatus}, Validators.required],
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

  private save() {
    this.submitBtnState = ClrLoadingState.LOADING;
    Object.assign(this.taskEdit, this.taskForm.value);
    let patchDocument = compare(this.initialTask, this.taskEdit);
    if (this.isNewTask) {
      this.taskService.NewTask(this.taskEdit).subscribe(task => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else {
      this.taskService.UpdateTask(patchDocument, this.taskEdit.id).subscribe(task => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }

  }

  private saveSuccessHelper(): void {
    this.refresh.emit();
    Object.assign(this.initialTask, this.taskEdit);
    if (this.isNewTask)
      this.alertService.showMessage(this.gT('toasts.saved'), `Task added!`, MessageSeverity.success);
    else
      this.alertService.showMessage(this.gT('toasts.saved'), `Task modified!`, MessageSeverity.success);

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
        this.createdBy = this.users.filter(x => x.id == this.taskEdit.createdBy).map(x => x.fullName)[0];
        this.updatedBy = this.users.filter(x => x.id == this.taskEdit.updatedBy).map(x => x.fullName)[0];
        this.submitBtnState = ClrLoadingState.DEFAULT;
        this.isNewTask = false;
        this.loadForm();
        this.taskForm.patchValue(this.taskEdit);
      },
        error => {
          console.log(error);
          this.Create();
        }
      )
    }
    else {
      this.Create();
    }
  }

  MarkActive(task: TaskEdit) {
    if (task) {
      if (task.status == Status.New) {
        let taskEdit: TaskEdit = new TaskEdit();
        Object.assign(taskEdit, task);
        taskEdit.status = Status.Active;
        let patchDocument = compare(task, taskEdit);
        this.taskService.UpdateTask(patchDocument, task.id).subscribe(
          response => {
            this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Active!`, MessageSeverity.success);
            this.updateData.emit(taskEdit);
          },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      }
      else {
        let taskEdit: TaskEdit = new TaskEdit();
        Object.assign(taskEdit, task);
        taskEdit.status = Status.Active;
        let patchDocument = compare(task, taskEdit);
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
      let taskEdit: TaskEdit = new TaskEdit();
      Object.assign(taskEdit, this.taskToUpdate);
      taskEdit.status = Status.Resolved;
      let patchDocument = compare(this.taskToUpdate, taskEdit);
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
      let taskEdit: TaskEdit = new TaskEdit();
      Object.assign(taskEdit, this.taskToUpdate);
      taskEdit.status = Status.Completed;
      let patchDocument = compare(this.taskToUpdate, taskEdit);
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

  private CloseTasks() {
    this.deleteBtnState = ClrLoadingState.LOADING;

    if (this.tasksToClose) {
      for (var i = 0; i < this.tasksToClose.length; i++) {
        this.taskService.GetTask(this.tasksToClose[i].id).subscribe(
          editTask => {
            Object.assign(this.initialTask, editTask);
            editTask.status = Status.Closed;
            let patchDocument = compare(this.initialTask, editTask);
            this.taskService.UpdateTask(patchDocument, editTask.id).subscribe(response => {
            },
              error => this.alertService.showMessage(error, null, MessageSeverity.error));
          })
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

  private Delete() {
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
      let patchDocument = compare(this.initialTask, this.taskToUpdate);
      this.taskService.UpdateTask(patchDocument, this.taskToUpdate.id).subscribe(response => {
        this.alertService.showMessage(this.gT('toasts.saved'), `Record Deleted!`, MessageSeverity.success);
        this.popData.emit(this.taskToUpdate.id);
        this.deleteBtnState = ClrLoadingState.SUCCESS;
        this.deleteOpen = false;
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }

  get canSetStatus() {
    return this.accountService.userHasPermission(Permission.setStatusTasksPremission);
  }
}
