import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";
import { BugItem } from "../bugItems/bugItem.model";

abstract class Task {
  constructor(id?: number, title?: string, releaseId?,
    priority?: Priority, status?: Status) {

    this.id = id;
    this.title = title;
    this.releaseId = releaseId;
    this.priority = priority;
    this.status = status;
  }

  public id: number;
  public title: string;
  public releaseId: string;
  public priority: Priority;
  public status: Status;
}

export class TaskList extends Task {
  constructor(openBugcount?: number, resolvedBugcount?: number, developer?: User, tester?: User) {
    super();
    this.developer = developer;
    this.tester = tester;
    this.openBugcount = openBugcount;
    this.resolvedBugcount = resolvedBugcount;
  }

  public developer: User;
  public tester: User;
  public openBugcount: number;
  public resolvedBugcount: number;

}

export class TaskEdit extends Task {
  constructor(description?: string, developerId?: string, testerId?: string, bugItems?: BugItem[],
    createdBy?: string, updatedBy?: string, updatedDate?: Date, createdDate?: Date) {
    super();

    this.developerId = developerId;
    this.testerId = testerId;
    this.description = description;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
    this.bugItems = bugItems;
  }

  public description: string;
  public developerId: string;
  public testerId: string;
  public createdBy: string;
  public updatedBy: string;
  public updatedDate: Date;
  public createdDate: Date;
  public bugItems: BugItem[];
}

export class ExpandTask {
  constructor(id?: number, description?: string) {
    this.id = id;
    this.description = description;
  }
  public id: number;
  public description: string;
}
