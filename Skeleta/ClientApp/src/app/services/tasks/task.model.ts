import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";
import { BugItem } from "../bugItems/bugItem.model";

export class Task {

  constructor(title?: string, description?: string, id?: number,
    priority?: Priority, status?: Status,
    developer?: User, developerId?: string,
    tester?: User, testerId?: string,
    openBugcount?: number, resolvedBugcount?: number, bugItems?: BugItem[],
    createdBy?: string, updatedBy?: string,
    updatedDate?: Date, createdDate?: Date, ) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.developer = developer;
    this.developerId = developerId;
    this.tester = tester;
    this.testerId = testerId;
    this.bugItems = bugItems;
    this.openBugcount = openBugcount;
    this.resolvedBugcount = resolvedBugcount;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
  }

  public id: number;
  public title: string;
  public description: string;
  public priority: Priority;
  public status: Status;
  public openBugcount: number;
  public resolvedBugcount: number;

  public developer: User
  public developerId: string;

  public tester: User;
  public testerId: string;

  public bugItems: BugItem[];


  public createdBy: string;
  public updatedBy: string;
  public updatedDate: Date;
  public createdDate: Date;
}
