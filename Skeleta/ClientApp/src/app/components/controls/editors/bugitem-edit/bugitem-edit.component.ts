import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Status } from '../../../../models/enum';
import { BugItem } from '../../../../services/bugItems/bugItem.model';
import { User } from '../../../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState, ClrForm } from '@clr/angular';
import { AppTranslationService } from '../../../../services/app-translation.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { BugItemService } from '../../../../services/bugItems/bugitemService';
import { AccountService } from '../../../../services/account.service';
import { fadeInOut } from '../../../../services/animations';

@Component({
  selector: 'app-bugitem-edit',
  templateUrl: './bugitem-edit.component.html',
  styleUrls: ['./bugitem-edit.component.css'],
  animations: [fadeInOut]
})
export class BugitemEditComponent implements OnInit {

  constructor(private translationService: AppTranslationService,
    private alertService: AlertService, private formBuilder: FormBuilder,
    private bugService: BugItemService, private accountService: AccountService) { }
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  actionTitle = '';
  deleteOpen = false;
  private isNewItem = false;
  allStatus: string[] = ['Active', 'Resolved', 'Completed'];
  dataLoaded = false;
  isOpen = false;

  devId: string;
  testerId: string;
  initialItem: BugItem = new BugItem();
  itemEdit: BugItem;
  bugForm: FormGroup;
  users: User[] = [];
  currentUser: User;
  taskId: number;
  @ViewChild(ClrForm) clrForm;
  @Output() popData = new EventEmitter<BugItem>();
  @Output() updateData = new EventEmitter<BugItem>();
  @Output() updateStatus = new EventEmitter<BugItem>();
  @Output() openClose = new EventEmitter();
  gT = (key: string) => this.translationService.getTranslation(key);

  ngOnInit() {
    this.accountService.getActiveUsers().subscribe(
      users => this.users = users
    );
    this.currentUser = this.accountService.currentUser;
  }

  private loadForm() {
    this.bugForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['Active', Validators.required],
      developerId: [this.devId],
      testerId: [this.testerId]
    });
    this.dataLoaded = true;
  }

  onOpen() {
    this.close();
  }


  private close() {
    this.isOpen = false;
    this.dataLoaded = false;
    this.bugForm.reset();
    this.openClose.emit();
    this.isNewItem = false;
    this.alertService.resetStickyMessage();
  }

  save() {
    this.submitBtnState = ClrLoadingState.LOADING;
    Object.assign(this.itemEdit, this.bugForm.value);

    if (this.isNewItem) {
      this.bugService.NewItem(this.itemEdit).subscribe(bug => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    } else {
      this.bugService.UpdateItem(this.itemEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
  }

  private saveSuccessHelper(): void {
    Object.assign(this.initialItem, this.itemEdit);
    this.updateData.emit(this.initialItem);

    if (this.isNewItem) {
      this.alertService.showMessage(this.gT('toasts.saved'), `Bug added!`, MessageSeverity.success);
    } else {
      this.alertService.showMessage(this.gT('toasts.saved'), `Bug modified!`, MessageSeverity.success);
    }

    this.submitBtnState = ClrLoadingState.SUCCESS;
    this.close();
  }

  private saveFailedHelper(error: any): void {
    this.submitBtnState = ClrLoadingState.ERROR;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

  Create(taskId: number, devId: string, testerId: string) {
    this.isOpen = true;
    this.submitBtnState = ClrLoadingState.DEFAULT;
    this.isNewItem = true;
    this.actionTitle = 'Add';
    this.testerId = testerId;
    this.devId = devId;
    this.initialItem = new BugItem();
    this.itemEdit = new BugItem();
    this.itemEdit.taskItemId = taskId;
    this.loadForm();
  }

  Edit(itemid: number) {
    if (itemid) {
      this.isOpen = true;
      this.bugService.GetItem(itemid).subscribe(response => {
        this.initialItem = new BugItem();
        Object.assign(this.initialItem, response);
        this.itemEdit = new BugItem;
        Object.assign(this.itemEdit, response);
        this.submitBtnState = ClrLoadingState.DEFAULT;
        this.isNewItem = false;
        this.loadForm();
        this.bugForm.patchValue(this.itemEdit);
      },
        error => this.alertService.showMessage(error, null, MessageSeverity.error));
    } else {
      this.alertService.showMessage('error no item found', null, MessageSeverity.error);
    }
  }
}
