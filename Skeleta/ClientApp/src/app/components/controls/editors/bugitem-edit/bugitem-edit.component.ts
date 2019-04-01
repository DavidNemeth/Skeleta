import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Status } from '../../../../models/enum';
import { BugItem } from '../../../../services/bugItems/bugItem.model';
import { Task } from '../../../../services/tasks/task.model';
import { User } from '../../../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState, ClrForm } from '@clr/angular';
import { AppTranslationService } from '../../../../services/app-translation.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { BugItemService } from '../../../../services/bugItems/bugitemService';
import { AccountService } from '../../../../services/account.service';
import { TaskService } from '../../../../services/tasks/taskService';

@Component({
  selector: 'app-bugitem-edit',
  templateUrl: './bugitem-edit.component.html',
  styleUrls: ['./bugitem-edit.component.css']
})
export class BugitemEditComponent implements OnInit {
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  gT = (key: string) => this.translationService.getTranslation(key);

  private actionTitle = "";
  private deleteOpen = false;
  private isNewItem = false;
  private allStatus = [...Object.keys(Status)];

  initialItem: BugItem = new BugItem();
  itemEdit: BugItem;
  bugForm: FormGroup;
  users: User[] = [];
  tasks: Task[] = [];
  currentUser: User;

  @ViewChild(ClrForm) clrForm;

  @Input() isOpen: boolean;
  @Output() popData = new EventEmitter<BugItem>();
  @Output() updateData = new EventEmitter<BugItem>();
  @Output() updateStatus = new EventEmitter<BugItem>();
  @Output() openClose = new EventEmitter();

  constructor(private translationService: AppTranslationService, private taskService: TaskService,
    private alertService: AlertService, private formBuilder: FormBuilder,
    private bugService: BugItemService, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getUsers().subscribe(
      users => this.users = users
    );
    this.taskService.GetPendingTask().subscribe(
      tasks => this.tasks = tasks
    );
    this.currentUser = this.accountService.currentUser;
    this.loadForm();
  }

  private loadForm() {
    this.bugForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['New', Validators.required],
      developerId: [this.currentUser.id],
      testerId: [this.currentUser.id],
      taskItemId: ['']
    });
  }

  private close() {
    this.isOpen = false;
    this.openClose.emit();
    this.isNewItem = false;
    this.loadForm();
    this.alertService.resetStickyMessage();
  }

  private save() {
    this.submitBtnState = ClrLoadingState.LOADING;
    Object.assign(this.itemEdit, this.bugForm.value);

    if (this.isNewItem) {
      this.bugService.NewItem(this.itemEdit).subscribe(bug => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    else {
      this.bugService.UpdateItem(this.itemEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }

  }

  private saveSuccessHelper(): void {
    Object.assign(this.initialItem, this.itemEdit);
    this.updateData.emit(this.initialItem);

    if (this.isNewItem)
      this.alertService.showMessage(this.gT('toasts.saved'), `Bug added!`, MessageSeverity.success);
    else
      this.alertService.showMessage(this.gT('toasts.saved'), `Bug modified!`, MessageSeverity.success);

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
    if (!this.isNewItem) {
      this.bugForm.patchValue(this.initialItem);
    }
  }

  Create() {
    this.submitBtnState = ClrLoadingState.DEFAULT;
    this.isNewItem = true;
    this.actionTitle = "Add";
    this.initialItem = new BugItem();
    this.itemEdit = new BugItem();
  }

  Edit(itemid: number) {
    if (itemid) {
      this.bugService.GetItem(itemid).subscribe(response => {
        this.initialItem = new BugItem();
        Object.assign(this.initialItem, response);
        this.itemEdit = new BugItem;
        Object.assign(this.itemEdit, response);
        this.submitBtnState = ClrLoadingState.DEFAULT;
        this.isNewItem = false;
        this.actionTitle = "Edit";
        this.bugForm.patchValue(this.itemEdit);
      },
        error =>
          this.Create());
    }
    else {
      this.Create();
    }
  }

  MarkActive(item: BugItem) {
    if (item) {
      this.bugService.GetItem(item.id).subscribe(editItem => {
        item.status = Status.Active;
        this.bugService.UpdateItem(editItem).subscribe(response => {
          this.alertService.showMessage(this.gT('toasts.saved'), `Bug is now Active!`, MessageSeverity.success);
          Object.assign(item, editItem);
          this.updateStatus.emit(item);
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }

  MarkResolved(item: BugItem) {
    if (item) {
      this.bugService.GetItem(item.id).subscribe(editItem => {
        item.status = Status.Resolved;
        this.bugService.UpdateItem(editItem).subscribe(response => {
          this.alertService.showMessage(this.gT('toasts.saved'), `Bug is now Active!`, MessageSeverity.success);
          Object.assign(item, editItem);
          this.updateStatus.emit(item);
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }
  MarkClosed(item: BugItem) {
    if (item) {
      this.bugService.GetItem(item.id).subscribe(editItem => {
        item.status = Status.Closed;
        this.bugService.UpdateItem(editItem).subscribe(response => {
          this.alertService.showMessage(this.gT('toasts.saved'), `Bug is now Active!`, MessageSeverity.success);
          Object.assign(item, editItem);
          this.updateStatus.emit(item);
        },
          error => this.alertService.showMessage(error, null, MessageSeverity.error));
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    }
  }
}
