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

  getResolvedEndpoint<T>(): Observable<T> {
    const endpointUrl = this.resolvedUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getResolvedEndpoint());
      }));
  }

  getClosedEndpoint<T>(): Observable<T> {
    const endpointUrl = this.closedUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getClosedEndpoint());
      }));
  }

}

