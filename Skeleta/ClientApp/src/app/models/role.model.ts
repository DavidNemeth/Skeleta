import { Permission } from './permission.model';


export class Role {

  constructor(name?: string, description?: string, permissions?: Permission[], roles?: string[]) {

    this.name = name;
    this.description = description;
    this.permissions = permissions;
  }

  public id: string;
  public name: string;
  public description: string;
  public usersCount: string;
  public permissions: Permission[];
}
