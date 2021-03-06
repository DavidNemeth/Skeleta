import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class BugItemEndpoint extends EndpointFactory {

  private readonly _base: string = '/api/BugItems/';
  private readonly _all: string = '/api/BugItems/all';
  private readonly _pending: string = '/api/BugItems/pending';
  private readonly _closed: string = '/api/BugItems/closed';
  private readonly _resolved: string = '/api/BugItems/resolved';

  get baseUrl() { return this.configurations.baseUrl + this._base; }
  get allUrl() { return this.configurations.baseUrl + this._all; }
  get pendingUrl() { return this.configurations.baseUrl + this._pending; }
  get closedUrl() { return this.configurations.baseUrl + this._closed; }
  get resolvedUrl() { return this.configurations.baseUrl + this._resolved; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getBugEndpoint<T>(bugid: number): Observable<T> {
    const endpointUrl = `${this.baseUrl}/${bugid}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getBugEndpoint(bugid));
      }));
  }

  getCreateEndpoint<T>(bugitemObject: any): Observable<T> {
    return this.http.post<T>(this.baseUrl, JSON.stringify(bugitemObject), this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCreateEndpoint(bugitemObject));
      }));
  }

  getUpdateEndpoint<T>(bugitemObject: any, bugId?: number): Observable<T> {
    const endpointUrl = `${this.baseUrl}/${bugId}`;

    return this.http.put<T>(endpointUrl, JSON.stringify(bugitemObject), this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateEndpoint(bugitemObject));
      }));
  }

  getAllEndpoint<T>(taskid?: number): Observable<T> {
    const endpointUrl = taskid != null ? `${this.allUrl}/${taskid}` : this.allUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAllEndpoint());
      }));
  }

  getPendingEndpoint<T>(taskid?: number): Observable<T> {
    console.log(taskid != null ? `${this.pendingUrl}/${taskid}` : this.pendingUrl);

    const endpointUrl = taskid != null ? `${this.pendingUrl}/${taskid}` : this.pendingUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getPendingEndpoint());
      }));
  }

  getResolvedEndpoint<T>(taskid?: number): Observable<T> {
    const endpointUrl = taskid != null ? `${this.resolvedUrl}/${taskid}` : this.resolvedUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getResolvedEndpoint());
      }));
  }

  getClosedEndpoint<T>(taskid?: number): Observable<T> {
    const endpointUrl = taskid != null ? `${this.closedUrl}/${taskid}` : this.closedUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getClosedEndpoint());
      }));
  }

}

