import { Job } from './enum';

export class User {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, userName?: string, fullName?: string, email?: string, jobTitle?: Job,
    phoneNumber?: string, roles?: string[]) {

    this.id = id;
    this.userName = userName;
    this.fullName = fullName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
  }

  public id: string;
  public userName: string;
  public fullName: string;
  public email: string;
  public jobTitle: Job;
  public phoneNumber: string;
  public isEnabled: boolean;
  public isLockedOut: boolean;
  public roles: string[];
}
