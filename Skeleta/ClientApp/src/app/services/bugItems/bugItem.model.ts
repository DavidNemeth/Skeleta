import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";
import { Task } from "../tasks/task.model";

export class BugItem {

  constructor(title?: string, description?: string, status?: Status, id?: number,
    developer?: User, developerId?: number,
    tester?: User, testerId?: number,
    taskItemTitle?: string, taskItemId?: number) {

    this.id = id;

    this.title = title;
    this.description = description;
    this.status = status;

    this.developer = developer;
    this.developerId = developerId;

    this.tester = tester;
    this.testerId = testerId;

    this.taskItemTitle = taskItemTitle;
    this.taskItemId = taskItemId;
  }

  public id: number;
  public title: string;
  public description: string;
  public status: Status;

  public developer: User
  public developerId: number;

  public tester: User;
  public testerId: number;

  public taskItemTitle: string;
  public taskItemId: number;
}
