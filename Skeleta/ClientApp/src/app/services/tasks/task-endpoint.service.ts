import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class TaskEndpoint extends EndpointFactory {

  private readonly _base: string = '/api/Tasks/';
  private readonly _all: string = '/api/Tasks/all';
  private readonly _pending: string = '/api/Tasks/pending';
  private readonly _closed: string = '/api/Tasks/closed';
  private readonly _completed: string = '/api/Tasks/completed';
  private readonly _resolved: string = '/api/Tasks/resolved';

  get baseUrl() { return this.configurations.baseUrl + this._base; }
  get allUrl() { return this.configurations.baseUrl + this._all; }
  get pendingUrl() { return this.configurations.baseUrl + this._pending; }
  get closedUrl() { return this.configurations.baseUrl + this._closed; }
  get completedUrl() { return this.configurations.baseUrl + this._completed; }
  get resolvedUrl() { return this.configurations.baseUrl + this._resolved; }



  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getAllEndpoint<T>(): Observable<T> {
    const endpointUrl = this.allUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAllEndpoint());
      }));
  }

  getPendingEndpoint<T>(): Observable<T> {
    const endpointUrl = this.pendingUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getPendingEndpoint());
      }));
  }

  getClosedEndpoint<T>(): Observable<T> {
    const endpointUrl = this.closedUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getClosedEndpoint());
      }));
  }

  getCompletedEndpoint<T>(): Observable<T> {
    const endpointUrl = this.completedUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCompletedEndpoint());
      }));
  }

  getResolvedEndpoint<T>(): Observable<T> {
    const endpointUrl = this.resolvedUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getResolvedEndpoint());
      }));
  }

  getCreateEndpoint<T>(taskObject: any): Observable<T> {
    return this.http.post<T>(this.baseUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCreateEndpoint(taskObject));
      }));
  }

  getUpdateEndpoint<T>(taskObject: any, taskId?: number): Observable<T> {
    const endpointUrl = `${this.baseUrl}/${taskId}`;

    return this.http.put<T>(endpointUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateEndpoint(taskObject));
      }));
  }

  getDeleteEndpoint<T>(taskId?: number): Observable<T> {
    const endpointUrl = `${this.baseUrl}/${taskId}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteEndpoint(taskId));
      }));
  }

  getDeleteRangeEndpoint<T>(taskIds?: number[]): Observable<T> {
    const endpointUrl = `${this.baseUrl}/range/${taskIds}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteRangeEndpoint(taskIds));
      }));
  }
}
