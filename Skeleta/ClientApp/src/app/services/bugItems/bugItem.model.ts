import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";
import { Task } from "../tasks/task.model";

export class BugItem {

  constructor(title?: string, description?: string, status?: Status,
    developer?: User, developerId?: string,
    tester?: User, testerId?: string,
    taskItemTitle?: string, taskItemId?: string) {

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
  public developerId: string;

  public tester: User;
  public testerId: string;

  public taskItemTitle: string;
  public taskItemId: string;
}
