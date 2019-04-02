import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";
import { BugItem } from "../bugItems/bugItem.model";

export class Task {

  constructor(title?: string, description?: string, id?: number,
    priority?: Priority, status?: Status,
    developer?: User, developerId?: string,
    tester?: User, testerId?: string,
    bugcount?: number, bugItems?: BugItem[]) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.developer = developer;
    this.developerId = developerId;
    this.tester = tester;
    this.testerId = testerId;
    this.bugcount = bugcount;
    this.bugItems = bugItems;
  }

  public id: number;
  public title: string;
  public description: string;
  public priority: Priority;
  public status: Status;
  public bugcount: number;

  public developer: User
  public developerId: string;

  public tester: User;
  public testerId: string;

  public bugItems: BugItem[];
}
