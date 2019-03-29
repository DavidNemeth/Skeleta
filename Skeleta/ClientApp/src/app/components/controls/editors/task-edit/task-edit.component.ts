import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState, ClrForm } from '@clr/angular';
import { AppTranslationService } from '../../../../services/app-translation.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../../../../services/tasks/taskService';
import { Task } from '../../../../services/tasks/task.model';
import { Status, Priority } from '../../../../models/enum';
import { Observable, forkJoin } from 'rxjs';
import { AccountService } from '../../../../services/account.service';
import { User } from '../../../../models/user.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})

export class TaskEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  gT = (key: string) => this.translationService.getTranslation(key);

  private actionTitle = "";
  private deleteOpen = false;
  private isNewTask = false;
  private openModal;
  private allStatus = [...Object.keys(Status)];
  private allPriority = [...Object.keys(Priority)];
  public description = ClassicEditor;

  initialTask: Task = new Task();
  taskEdit: Task;
  private tasksToDelete: Task[] = [];
  private taskToDelete: Task;
  taskForm: FormGroup;
  users: User[] = [];
  currentUser: User;
  assignedTo: User;

  @ViewChild(ClrForm) clrForm;

  @Output() popData = new EventEmitter<Task>();
  @Output() updateStatus = new EventEmitter<Task>();
  @Output() updateData = new EventEmitter<Task>();
  @Output() deleteData = new EventEmitter<Task[]>();

  constructor(private translationService: AppTranslationService,
    private alertService: AlertService, private formBuilder: FormBuilder,
    private taskService: TaskService, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getUsers().subscribe(
      users => this.users = users
    );
    this.currentUser = this.accountService.currentUser;
    this.loadForm();
  }

  private loadForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: new FormControl(this.Edit),
      comment: [''],
      priority: ['High', Validators.required],
      status: ['New', Validators.required],
      assignedTo: [this.currentUser.id, Validators.required]
    });
  }

  private openChange(value: boolean) {
    if (value) {
    }
    else {
      this.isNewTask = false;
      this.openModal = false;
      this.loadForm();
      this.alertService.resetStickyMessage();
    }
  }

  private save() {
    this.submitBtnState = ClrLoadingState.LOADING;
    Object.assign(this.taskEdit, this.taskForm.value);
    this.taskEdit.assignedTo = this.users.find(u => u.id == this.taskForm.controls['assignedTo'].value);

    if (this.isNewTask) {
      this.taskService.NewTask(this.taskEdit).subscribe(task => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else {
      this.taskService.UpdateTask(this.taskEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }

  }

  private saveSuccessHelper(): void {
    Object.assign(this.initialTask, this.taskEdit);
    this.initialTask.assignedTo = this.users.find(u => u.id == this.taskEdit.assignedTo.id);
    this.updateData.emit(this.initialTask);

    if (this.isNewTask)
      this.alertService.showMessage(this.gT('toasts.saved'), `Task added!`, MessageSeverity.success);
    else
      this.alertService.showMessage(this.gT('toasts.saved'), `Task modified!`, MessageSeverity.success);

    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.openModal = false;
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    this.clrForm.markAsDirty();
  }

  private resetForm() {
    this.loadForm();
    this.alertService.resetStickyMessage();
    if (!this.isNewTask) {
      this.taskForm.patchValue(this.initialTask);
      this.taskForm.controls['assignedTo'].setValue(this.assignedTo.id);
    }
  }

  Create() {
    this.openModal = true;
    this.isNewTask = true;
    this.actionTitle = "Add";
    this.initialTask = new Task();
    this.taskEdit = new Task();
    this.assignedTo = new User();
  }

  MarkActive(task: Task) {
    if (task) {
      if (task.status == Status.New) {
        task.status = Status.Active;
        this.taskService.UpdateTask(task).subscribe(response => {
          this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Active!`, MessageSeverity.success);
          this.updateStatus.emit(task);
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      }
      else {
        task.status = Status.Active;
        this.taskService.UpdateTask(task).subscribe(response => {
          this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Active!`, MessageSeverity.success);
          this.popData.emit(task);
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      }
    }
  }


  MarkResolved(task: Task) {
    if (task) {
      task.status = Status.Resolved;
      this.taskService.UpdateTask(task).subscribe(response => {
        this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Resolved!`, MessageSeverity.success);
        this.popData.emit(task);
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }

  MarkCompleted(task: Task) {
    if (task) {
      task.status = Status.Completed;
      this.taskService.UpdateTask(task).subscribe(response => {
        this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Completed!`, MessageSeverity.success);
        this.popData.emit(task);
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }

  Edit(task: Task) {
    if (task) {
      this.openModal = true;
      this.isNewTask = false;
      this.actionTitle = "Edit";
      this.assignedTo = this.users.find(u => u.fullName == task.assignedTo.fullName);

      this.initialTask = new Task();
      Object.assign(this.initialTask, task);

      this.taskEdit = new Task;
      Object.assign(this.taskEdit, task);

      this.taskForm.patchValue(this.taskEdit);
      this.taskForm.controls['assignedTo'].setValue(this.assignedTo.id);
    }
    else {
      return this.Create();
    }
  }

  View(task: Task) {
    this.resetForm();
    this.alertService.resetStickyMessage();
    Object.assign(this.initialTask, task);
    this.taskForm.patchValue(this.initialTask);
  }

  DeleteRange(tasks: Task[]) {
    this.deleteOpen = true;
    this.tasksToDelete = tasks;
    this.taskToDelete = null;
  }

  DeleteSingle(task: Task) {
    this.deleteOpen = true;
    this.taskToDelete = task;
    this.tasksToDelete = null;
  }

  private Delete() {
    this.deleteBtnState = ClrLoadingState.LOADING;

    if (this.tasksToDelete != null) {
      this.taskService.DeleteRangeTasks(this.tasksToDelete).subscribe(
        response => {
          this.deleteData.emit(this.tasksToDelete);
          this.deleteOpen = false;
          this.alertService.showMessage(this.gT('toasts.saved'), `${this.tasksToDelete.length} record Deleted!`, MessageSeverity.success);
          this.deleteBtnState = ClrLoadingState.SUCCESS;
        });
    }

    if (this.taskToDelete != null) {
      this.taskService.DeleteTask(this.taskToDelete).subscribe(
        response => {
          this.tasksToDelete = [];
          this.tasksToDelete.push(this.taskToDelete);

          this.deleteData.emit(this.tasksToDelete);
          this.deleteOpen = false;
          this.alertService.showMessage(this.gT('toasts.saved'), `${this.tasksToDelete.length} record Deleted!`, MessageSeverity.success);
          this.deleteBtnState = ClrLoadingState.SUCCESS;
        });
    }
  }
}
