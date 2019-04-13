import { PermissionValues } from './permission.model';
import { Job } from './enum';


export interface LoginResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
}


export interface IdToken {
  sub: string;
  name: string;
  fullname: string;
  jobtitle: Job;
  email: string;
  phone: string;
  role: string | string[];
  permission: PermissionValues | PermissionValues[];
  configuration: string;
}
