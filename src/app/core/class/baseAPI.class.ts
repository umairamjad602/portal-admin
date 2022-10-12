import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export abstract class BaseAPIClass {
  baseUrl: string;
  protected authenticationSubscription: any;
  protected binaryPlatformAuthenticationSubscription: any;
  constructor(
    protected httpClient: HttpClient,
    protected authenticationService: AuthenticationService) {
    this.baseUrl = '';
  }

  public getAsync<TData>(url: string, filterObject?: any, headers: { [key: string]: any } = {}, ignoreAuth: boolean = false) {
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (fitlerKeys.length > 0 && queryString[queryString.length - 1] === '&' ) {
        queryString = queryString.slice(0, -1);
      }
    }

    const authHeaders = (ignoreAuth) ? {} : this.getAuthHeadersAsync();
    const mergedHeaders = { ...headers, ...authHeaders };
    return this.httpClient.get<TData>(url + queryString, {
        headers: mergedHeaders
    });
  }

  public getAll(
        filterObject?: any,
        headers: { [key: string]: any } = {},
        ignoreAuth: boolean = false): Observable<any> {
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
    }
    return this.httpClient.get(`${this.baseUrl}${queryString}`, {
        headers
      }).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  public getById(id: string, filterObject?: any): Observable<any> {
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
    }
    return this.httpClient.get(`${this.baseUrl}/${id}${queryString}`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  public create(payload: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, payload).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  public postAsync<TData>(
                          url: string,
                          data: object = {},
                          headers: { [key: string]: any } = {},
                          ignoreAuth: boolean = false) {
    const authHeaders = (ignoreAuth) ? {} : this.getAuthHeadersAsync();
    const mergedHeaders = { ...headers, ...authHeaders };
    const httpResult = this.httpClient.post<TData>(this.baseUrl + url, data, {
      headers: mergedHeaders
    });
    return httpResult;
  }

  public putAsync<TData>(
                        url: string,
                        data: object = {},
                        headers: { [key: string]: any } = {},
                        ignoreAuth: boolean = false) {
    const authHeaders = (ignoreAuth) ? {} : this.getAuthHeadersAsync();
    const mergedHeaders = { ...headers, ...authHeaders };
    const httpResult = this.httpClient.put<TData>(this.baseUrl + url, data, {
      headers: mergedHeaders
    });
    return httpResult;
  }

  public deleteAsync<TData>(
                        url: string,
                        data: any = {},
                        headers: { [key: string]: any } = {},
                        ignoreAuth: boolean = false) {
      const authHeaders = (ignoreAuth) ? {} : this.getAuthHeadersAsync();
      const mergedHeaders = { ...headers, ...authHeaders };
      let httpParams = new HttpParams();
      Object.keys(data).forEach(function (key) {
        httpParams = httpParams.append(key, data[key]);
      });
      const httpResult = this.httpClient.delete<TData>(this.baseUrl + url, {
        headers: mergedHeaders,
        params: httpParams
      });
      return httpResult;
  }

  public update(id: string, payload: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, payload).pipe(
        map((body: any) => {
            return body;
        })
    );
  }

  public delete(id: string): Observable<any> {
      return this.httpClient.delete(`${this.baseUrl}/${id}`).pipe(
      map((body: any) => {
          return body;
      })
      );
  }

  public deleteAll(): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/all`).pipe(map((body: any) => {return body;}));
  }

  protected getAuthorizationHeader(token: string) {
      return `Bearer ${token}`;
  }

  protected getAuthHeadersAsync() {
    let token = null;
    token = this.authenticationService.getAccessToken();
    const headers: { [key: string]: string } = { 'no-redirect': 'true', 'auth-type': this.authenticationService.getAuthType(),
      Authorization: token ? this.getAuthorizationHeader(token) : ''
    };
    return headers;
  }

    public getBaseUrl() {
        return environment.serverUrl;
    }
}
