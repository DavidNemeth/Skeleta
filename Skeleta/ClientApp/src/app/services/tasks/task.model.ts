import { User } from "../../models/user.model";

export class Task {

  constructor(title?: string, description?: string, comment?: string, priority?: string, status?: string, assignedTo?: User, assignedBy?: string) {

    this.title = title;
    this.description = description;
    this.comment = comment;
    this.priority = priority;
    this.status = status;
    this.assignedTo = assignedTo;
    this.assignedBy = assignedBy;
  }

  public id: number;
  public title: string;
  public description: string;
  public comment: string;
  public priority: string;
  public status: string;

  public assignedTo: User;
  public assignedBy: string;
}
