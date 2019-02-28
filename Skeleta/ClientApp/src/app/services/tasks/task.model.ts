import { User } from "../../models/user.model";
import { Priority, Status } from "../../models/enum";

export class Task {

  constructor(title?: string, description?: string, comment?: string, priority?: Priority, status?: Status, assignedTo?: User, assignedBy?: string, assignedToName?: string) {

    this.title = title;
    this.description = description;
    this.comment = comment;
    this.priority = priority;
    this.status = status;
    this.assignedTo = assignedTo;
    this.assignedBy = assignedBy;
    this.assignedToName = assignedToName;
  }

  public id: number;
  public title: string;
  public description: string;
  public comment: string;
  public priority: Priority;
  public status: Status;

  public assignedTo: User;
  public assignedBy: string;

  public assignedToName: string;
}
