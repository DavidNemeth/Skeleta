import { Component, OnInit, ViewChild } from '@angular/core';
import { BugItem } from '../../../services/bugItems/bugItem.model';
import { AccountService } from '../../../services/account.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { TaskService } from '../../../services/tasks/taskService';
import { AppTranslationService } from '../../../services/app-translation.service';
import { BugitemEditComponent } from '../../controls/editors/bugitem-edit/bugitem-edit.component';
import { BugItemService } from '../../../services/bugItems/bugitemService';
import { Utilities } from '../../../services/utilities';

@Component({
  selector: 'app-bugitems',
  templateUrl: './bugitems.component.html',
  styleUrls: ['./bugitems.component.css']
})
export class BugitemsComponent implements OnInit {
  columns: any[] = [];
  bugs: BugItem[] = [];
  bugsCache: BugItem[] = [];
  sourceBug: BugItem;
  loadingIndicator: boolean;
  selected: BugItem[] = [];
  gT = (key: string) => this.translationService.getTranslation(key);
  isOpen: boolean = false;
  ResolvedActive;
  PendingActive;

  @ViewChild(BugitemEditComponent) bugEdit;

  constructor(private accountService: AccountService, private alertService: AlertService,
    private translationService: AppTranslationService, private bugitemService: BugItemService) { }

  ngOnInit() {
    this.PendingActive = true;
    this.loadData();
  }

  onSearchChanged(value: string) {
    this.bugs = this.bugsCache
      .filter(r => Utilities.searchArray(value, false, r.id, r.title, r.status, r.developer.fullName, r.developer.fullName, r.taskItemTitle));
  }

  onAdd() {
    this.sourceBug = null;
    this.bugEdit.Create();
    this.isOpen = true;
  }

  onEdit(bug: BugItem) {
    this.sourceBug = bug;
    this.bugEdit.Edit(bug.id);
    this.isOpen = true;
  }

  updateList(returnBug: BugItem) {
    this.loadData();
  }

  private loadData() {
    if (this.PendingActive) {
      this.loadPending();
    }
    if (this.ResolvedActive) {
      this.loadResolved();
    }
  }

  loadPending() {
    this.bugs = [];
    this.bugsCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.bugitemService.GetPendingBugs()
      .subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
  }

  loadResolved() {
    this.bugs = [];
    this.bugsCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.bugitemService.GetResolvedBugs()
      .subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
  }

  onDataLoadSuccessful(bugs: BugItem[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.bugsCache = bugs;
    this.bugs = bugs;
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }

  private removeItem(bug: BugItem) {
    const itemIndex = this.bugs.indexOf(bug, 0);
    if (itemIndex > -1) {
      this.bugs.splice(itemIndex, 1);
    }
  }

  private updateItem(bug: BugItem) {
    let index = this.bugs.indexOf(bug);
    this.bugs[index] = bug;
  }

  private closeTab() {
    this.isOpen = false;
  }
}
