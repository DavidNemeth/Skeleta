import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
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
  private allStatus = [...Object.keys(Status)];
  private allPriority = [...Object.keys(Priority)];
  initialTask: Task = new Task();
  taskEdit: Task;
  private tasksToDelete: Task[] = [];
  private taskToDelete: Task;
  taskForm: FormGroup;
  users: User[] = [];
  currentUser: User;
  isEdit: boolean;
  @ViewChild(ClrForm) clrForm;

  @Input() isOpen: boolean;
  @Output() popData = new EventEmitter<Task>();
  @Output() updateStatus = new EventEmitter<Task>();
  @Output() updateData = new EventEmitter<Task>();
  @Output() deleteData = new EventEmitter<Task[]>();
  @Output() openClose = new EventEmitter();

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
      description: [''],
      priority: ['High', Validators.required],
      status: ['New', Validators.required],
      developerId: [this.currentUser.id],
      testerId: [this.currentUser.id]
    });
  }

  private close() {
    this.isEdit = false;
    this.isOpen = false;
    this.openClose.emit();
    this.isNewTask = false;
    this.loadForm();
    this.alertService.resetStickyMessage();
  }

  private save() {
    this.submitBtnState = ClrLoadingState.LOADING;
    Object.assign(this.taskEdit, this.taskForm.value);

    if (this.isNewTask) {
      this.taskService.NewTask(this.taskEdit).subscribe(task => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else {
      this.taskService.UpdateTask(this.taskEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }

  }

  private saveSuccessHelper(): void {
    Object.assign(this.initialTask, this.taskEdit);
    this.updateData.emit(this.initialTask);

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

  private resetForm() {
    this.loadForm();
    this.alertService.resetStickyMessage();
    if (!this.isNewTask) {
      this.taskForm.patchValue(this.initialTask);
    }
  }

  Create() {
    this.isEdit = false;
    this.submitBtnState = ClrLoadingState.DEFAULT;
    this.isNewTask = true;
    this.actionTitle = "Add";
    this.initialTask = new Task();
    this.taskEdit = new Task();
  }


  Edit(taskid: number) {
    if (taskid) {
      this.isEdit = true;     
      this.taskService.GetTask(taskid).subscribe(response => {
        this.initialTask = new Task();
        Object.assign(this.initialTask, response);
        this.taskEdit = new Task;
        Object.assign(this.taskEdit, response);
        this.submitBtnState = ClrLoadingState.DEFAULT;
        this.isNewTask = false;
        this.actionTitle = "Edit";
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

  MarkActive(task: Task) {
    if (task) {
      if (task.status == Status.New) {
        this.taskService.GetTask(task.id).subscribe(
          editTask => {
            editTask.status = Status.Active;
            this.taskService.UpdateTask(editTask).subscribe(response => {
              this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Resolved!`, MessageSeverity.success);
              Object.assign(task, editTask);
              this.updateStatus.emit(task);
            },
              error => this.alertService.showMessage(error, null, MessageSeverity.error));
          })
      }
      else {
        this.taskService.GetTask(task.id).subscribe(
          editTask => {
            editTask.status = Status.Active;
            this.taskService.UpdateTask(editTask).subscribe(response => {
              this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Resolved!`, MessageSeverity.success);
              this.popData.emit(task);
            },
              error => this.alertService.showMessage(error, null, MessageSeverity.error));
          })
      }
    }
  }


  MarkResolved(task: Task) {
    if (task) {
      this.taskService.GetTask(task.id).subscribe(
        editTask => {
          editTask.status = Status.Resolved;
          this.taskService.UpdateTask(editTask).subscribe(response => {
            this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Resolved!`, MessageSeverity.success);
            this.popData.emit(task);
          },
            error => this.alertService.showMessage(error, null, MessageSeverity.error));
        })
    }
  }

  MarkCompleted(task: Task) {
    if (task) {
      this.taskService.GetTask(task.id).subscribe(
        editTask => {
          editTask.status = Status.Completed;
          this.taskService.UpdateTask(editTask).subscribe(response => {
            this.alertService.showMessage(this.gT('toasts.saved'), `Task set as Completed!`, MessageSeverity.success);
            this.popData.emit(task);
          },
            error => this.alertService.showMessage(error, null, MessageSeverity.error));
        })
    }
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
          this.deleteBtnState = ClrLoadingState.SUCCESS;
          this.deleteOpen = false;
          this.alertService.showMessage(this.gT('toasts.saved'), `${this.tasksToDelete.length} record Deleted!`, MessageSeverity.success);
        });
    }

    if (this.taskToDelete != null) {
      this.taskToDelete.status = Status.Closed;
      this.taskService.UpdateTask(this.taskToDelete).subscribe(response => {
        this.alertService.showMessage(this.gT('toasts.saved'), `Record Deleted!`, MessageSeverity.success);
        this.popData.emit(this.taskToDelete);
        this.deleteBtnState = ClrLoadingState.SUCCESS;
        this.deleteOpen = false;
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }
}
