import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '@app/core/local-storage.service';
import { AuthenticationEvent } from './authentication.model';
import { Credentials, LoginPayload } from '../model/authentication.model';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
  protected URL_LOGIN = 'auth/login';
  protected URL_LOGOUT = 'auth/logout';
  protected AUTHENTICATION_EVENT_LOGGED_IN = 'logged-in';
  protected AUTHENTICATION_EVENT_LOGGED_OUT = 'logged-out';
  protected AUTHENTICATION_CLIENT_EVENT_LOGGED_OUT = 'client-logged-out';
  protected AUTHENTICATION_CLIENT_EVENT_LOGGED_IN = 'client-logged-in';
  public readonly URL_CLIENT_LOGIN = 'auth/client-login';
  protected credentialsKey = 'credentials';
  protected tempCredentialsKey = 'temporary_credentials';
  public readonly STORAGE_KEY_PROFILE: string = 'ClientProfile';
  protected authType = 'User';

  protected _credentials: Credentials | null = null;
  public onAuthenticationChange = new EventEmitter < AuthenticationEvent > ();

    constructor(
        protected httpClient: HttpClient,
        protected localStorageService: LocalStorageService) {
        const savedCredentials = this.localStorageService.getItem(this.credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
        }
    }

    public login(payload: LoginPayload): Observable < Credentials > {
        debugger;
        const headers: {
            [key: string]: string
        } = {
            'no-redirect': 'true',
            'X-Forwarded-For':'127.0.0.1'
        };

        return this.httpClient.post(this.URL_LOGIN, payload, {
            headers: headers
        }).pipe(map((body: any) => {
          debugger;
                this.setCredentials(body);
                return body;
            })
        );
    }

    public logout(): Observable < boolean > {
        return this.httpClient
            .post(this.URL_LOGOUT, {}, {
                headers: this.getAuthHeadersAsync()
            })
            .pipe(
                map(() => {
                    const authenticationEvent: AuthenticationEvent = {
                        status: this.AUTHENTICATION_EVENT_LOGGED_OUT,
                        payload: {}
                    };
                    this.onAuthenticationChange.emit(authenticationEvent);
                    this.setCredentials();
                    return true;
                })
            );
    }

    public Clientlogin(payload: LoginPayload): Observable < Credentials > {
      debugger;
        const headers: {
            [key: string]: string
        } = {
            'no-redirect': 'true'
        };
        return this.httpClient.post(this.URL_CLIENT_LOGIN, payload, {
            headers: headers
        }).pipe(
            map((body: any) => {
                this.setCredentials(body);
                return body;
            })
        );
    }

    public Clientlogout(): Observable < boolean > {
        return this.httpClient
            .post(this.URL_LOGOUT, {}, {
                headers: this.getAuthHeadersAsync()
            })
            .pipe(
                map(() => {
                    const authenticationEvent: AuthenticationEvent = {
                        status: this.AUTHENTICATION_CLIENT_EVENT_LOGGED_OUT,
                        payload: {}
                    };
                    this.onAuthenticationChange.emit(authenticationEvent);
                    this.setCredentials();
                    return true;
                })
            );
    }

    public isAuthenticated(): boolean {
        return !!this.credentials;
    }

    get credentials(): Credentials | null {
        return this._credentials;
    }

    public getAccessToken(): string | null {
        return this.credentials ? this.credentials.token : null;
    }

    public setCredentials(credentials ?: Credentials) {
        this._credentials = credentials || null;
        if (credentials) {
            const authenticationEvent: AuthenticationEvent = {
                status: this.AUTHENTICATION_EVENT_LOGGED_IN,
                payload: this._credentials
            };
            this.onAuthenticationChange.emit(authenticationEvent);
            this.localStorageService.setItem(this.credentialsKey, JSON.stringify(credentials));
        } else {
            this.localStorageService.clearItem(this.credentialsKey);
        }
    }

    protected getAuthorizationHeader(token: string) {
        return `Bearer ${token}`;
    }

    protected getAuthHeadersAsync() {
        let token = null;
        token = this.getAccessToken();
        const headers: { [key: string]: string } = {
            'no-redirect': 'true',
            'auth-type': this.getAuthType(),
            Authorization: token ? this.getAuthorizationHeader(token) : ''
        };
        return headers;
    }

    public getAuthType() {
        return this.authType;
    }
}
