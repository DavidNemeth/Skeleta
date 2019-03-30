import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";

export class Task {

  constructor(title?: string, description?: string, comment?: string, priority?: Priority, status?: Status, developer?: User, tester?: User, developerName?: string, developerId?: string, testerName?: string, testerId?: string) {

    this.title = title;
    this.description = description;
    this.comment = comment;
    this.priority = priority;
    this.status = status;
    this.developer = developer;
    this.developerId = developerId;
    this.developerName = developerName;
    this.tester = tester;
    this.testerId = testerId;
    this.testerName = testerName;
  }

  public id: number;
  public title: string;
  public description: string;
  public comment: string;
  public priority: Priority;
  public status: Status;

  public developer: User
  public developerId: string;
  public developerName: string;

  public tester: User;
  public testerId: string;
  public testerName: string;

}
