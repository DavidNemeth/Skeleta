import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class TaskEndpoint extends EndpointFactory {

  private readonly _tasksUrl: string = '/api/Tasks/';
  private readonly _allTasksUrl: string = '/api/Tasks/all';
  private readonly _pendingTasksUrl: string = '/api/Tasks/pending';
  private readonly _closedTasksUrl: string = '/api/Tasks/closed';
  private readonly _completedTasksUrl: string = '/api/Tasks/completed';

  get tasksUrl() { return this.configurations.baseUrl + this._tasksUrl; }
  get allTasksUrl() { return this.configurations.baseUrl + this._allTasksUrl; }
  get pendingTasksUrl() { return this.configurations.baseUrl + this._pendingTasksUrl; }
  get closedTasksUrl() { return this.configurations.baseUrl + this._closedTasksUrl; }
  get completedTasksUrl() { return this.configurations.baseUrl + this._completedTasksUrl; }



  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getAllTasksEndpoint<T>(): Observable<T> {
    const endpointUrl = this.allTasksUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAllTasksEndpoint());
      }));
  }

  getPendingTasksEndpoint<T>(): Observable<T> {
    const endpointUrl = this.pendingTasksUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getPendingTasksEndpoint());
      }));
  }

  getClosedTasksEndpoint<T>(): Observable<T> {
    const endpointUrl = this.closedTasksUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getClosedTasksEndpoint());
      }));
  }

  getCompletedTasksEndpoint<T>(): Observable<T> {
    const endpointUrl = this.completedTasksUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCompletedTasksEndpoint());
      }));
  }

  getCreateTaskEndpoint<T>(taskObject: any): Observable<T> {
    return this.http.post<T>(this._tasksUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCreateTaskEndpoint(taskObject));
      }));
  }

  getUpdateTaskEndpoint<T>(taskObject: any): Observable<T> {
    return this.http.put<T>(this._tasksUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateTaskEndpoint(taskObject));
      }));
  }

  getDeleteTaskEndpoint<T>(taskObject: any): Observable<T> {
    return this.http.put<T>(this._tasksUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteTaskEndpoint(taskObject));
      }));
  }
}
