import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { BugItem } from '../../../services/bugItems/bugItem.model';
import { AccountService } from '../../../services/account.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { TaskService } from '../../../services/tasks/taskService';
import { AppTranslationService } from '../../../services/app-translation.service';
import { BugitemEditComponent } from '../../controls/editors/bugitem-edit/bugitem-edit.component';
import { BugItemService } from '../../../services/bugItems/bugitemService';
import { Utilities } from '../../../services/utilities';
import { Task } from '../../../services/tasks/task.model';
import { fadeInOut } from '../../../services/animations';
import { Status } from '../../../models/enum';

@Component({
  selector: 'app-bugitems',
  templateUrl: './bugitems.component.html',
  styleUrls: ['./bugitems.component.css'],
  animations: [fadeInOut]
})
export class BugitemsComponent implements OnInit {
  columns: any[] = [];
  bugs: BugItem[] = [];
  ActiveBugs: BugItem[] = [];
  ResolvedBugs: BugItem[] = [];
  CompletedBugs: BugItem[] = [];

  bugsCache: BugItem[] = [];
  sourceBug: BugItem;
  loadingIndicator: boolean;
  selected: BugItem[] = [];
  gT = (key: string) => this.translationService.getTranslation(key);
  isOpen: boolean = false;
  ResolvedActive;
  PendingActive;
  taskCache: Task;
  @Input()
  task: Task;

  @ViewChild(BugitemEditComponent) bugEdit;

  constructor(private accountService: AccountService, private alertService: AlertService,
    private translationService: AppTranslationService, private bugitemService: BugItemService) { }

  ngOnInit() {
    this.bugs = [];
    this.bugsCache = [];
    this.taskCache = this.task;
    this.onDataLoadSuccessful(this.task.bugItems);
    this.isOpen = true;
  }

  onSearchChanged(value: string) {
    this.bugs = this.bugsCache
      .filter(r => Utilities.searchArray(value, false, r.title, r.status));
  }

  onAdd() {
    this.sourceBug = null;
    this.bugEdit.Create(this.task.id, this.task.developerId, this.task.testerId);
    this.isOpen = false;
  }

  onEdit(bug: BugItem) {
    this.sourceBug = bug;
    this.bugEdit.Edit(bug.id);
    this.isOpen = false;
  }

  updateList(returnBug: BugItem) {
    this.loadData(returnBug.taskItemId);
  }

  private loadData(taskid?: number) {
    this.loadAll(taskid);
    this.isOpen = true;
  }

  loadAll(taskid?: number) {
    this.bugs = [];
    this.bugsCache = [];
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.bugitemService.GetAllBugItem(taskid)
      .subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
  }
  onDataLoadSuccessful(bugs: BugItem[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.bugsCache = bugs;
    this.bugs = bugs;
    this.ActiveBugs = bugs.filter(x => x.status == Status.New || x.status == Status.Active);
    this.ResolvedBugs = bugs.filter(x => x.status == Status.Resolved);
    this.CompletedBugs = bugs.filter(x => x.status == Status.Completed);

  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
    this.isOpen = true;
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
    this.isOpen = true;
  }

  private closeTab() {
    this.isOpen = true;
  }
}
