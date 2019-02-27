import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState, ClrForm } from '@clr/angular';
import { AppTranslationService } from '../../../../services/app-translation.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../../services/tasks/taskService';
import { Task } from '../../../../services/tasks/task.model';
import { Status } from '../../../../models/enum';
import { Observable, forkJoin } from 'rxjs';

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

  initialTask: Task = new Task();
  taskEdit: Task;
  private tasksToDelete: Task[] = [];
  private taskToDelete: Task;
  taskForm: FormGroup;

  @ViewChild(ClrForm) clrForm;
  @Output() updateData = new EventEmitter<Task>();
  @Output() deleteData = new EventEmitter<Task[]>();

  constructor(private translationService: AppTranslationService,
    private alertService: AlertService, private formBuilder: FormBuilder,
    private taskService: TaskService) { }

  ngOnInit() {
    this.loadForm();
  }

  private loadForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      comment: [''],
      priority: ['', [Validators.required]],
      status: ['', Validators.required],
      assignedTo: [''],
      assignedBy: [''],
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
    for (let i in this.taskForm.controls)
      this.taskForm.controls[i].markAsTouched();
    this.submitBtnState = ClrLoadingState.LOADING;

    Object.assign(this.taskEdit, this.taskForm.value);

    if (this.isNewTask) {
      this.taskService.NewTask(this.taskEdit).subscribe(user => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
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
    this.openModal = false;
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    console.log(error.error);
    this.clrForm.markAsDirty();
  }

  private resetForm() {
    this.taskForm.reset();
    this.alertService.resetStickyMessage();
    this.taskForm.patchValue(this.initialTask);
  }

  Create() {
    this.openModal = true;
    this.isNewTask = true;
    this.actionTitle = "Add";
    this.initialTask = new Task();
    this.taskEdit = new Task();
  }

  Edit(task: Task) {
    if (task) {
      this.openModal = true;
      this.isNewTask = false;
      this.actionTitle = "Edit";

      this.taskForm.patchValue(task);

      this.initialTask = new Task();
      Object.assign(this.initialTask, task);

      this.taskEdit = new Task;
      Object.assign(this.taskEdit, task);

      return this.taskEdit;
    }
    else {
      return this.Create();
    }
  }

  View(task: Task) {
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

    if (this.tasksToDelete) {
      this.taskService.DeleteRangeTasks(this.tasksToDelete).subscribe(
        response => {
          this.deleteData.emit(this.tasksToDelete);
          this.deleteOpen = false;
          this.alertService.showMessage(this.gT('toasts.saved'), `${this.tasksToDelete.length} record Deleted!`, MessageSeverity.success);
          this.deleteBtnState = ClrLoadingState.SUCCESS;
        });
    }

    if (this.taskToDelete) {
      this.taskService.DeleteTask(this.taskToDelete).subscribe(
        response => {
          this.tasksToDelete.push(this.taskToDelete);
          this.deleteData.emit(this.tasksToDelete);
          this.deleteOpen = false;
          this.alertService.showMessage(this.gT('toasts.saved'), `${this.tasksToDelete.length} record Deleted!`, MessageSeverity.success);
          this.deleteBtnState = ClrLoadingState.SUCCESS;
        });
    }
  }
}
