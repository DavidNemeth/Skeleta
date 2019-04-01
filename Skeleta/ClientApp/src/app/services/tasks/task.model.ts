import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";

export class Task {

  constructor(title?: string, description?: string,
    priority?: Priority, status?: Status,
    developer?: User, developerId?: string,
    tester?: User, testerId?: string) {

    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.developer = developer;
    this.developerId = developerId;
    this.tester = tester;
    this.testerId = testerId;
  }

  public id: number;
  public title: string;
  public description: string;
  public priority: Priority;
  public status: Status;

  public developer: User
  public developerId: string;

  public tester: User;
  public testerId: string;

}
