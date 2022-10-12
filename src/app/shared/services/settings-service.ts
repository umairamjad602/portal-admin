import { Injectable, EventEmitter } from '@angular/core';
import { BaseAPIClass, AuthenticationService, LocalStorageService } from '@app/core';
import { HttpClient } from '@angular/common/http';
import { Setting } from '@app/shared/models/settings.model';

@Injectable({providedIn: 'root'})
export class SettingsService extends BaseAPIClass{
  public readonly URL_SETTINGS = 'settings';
  private settingsKey = 'appSettings';
  private settings_: Setting[] = null;
  constructor(
    protected httpClient: HttpClient,
    protected authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService) {
    super(httpClient, authenticationService);
    //this.loadAllAsync();
  }

  public async loadAllAsync() {
      this.settings_ = await this.postAsync<Setting[]>(this.URL_SETTINGS).toPromise();
  }

  public async get(name: String) {
    if (this.settings_ == null) {
      this.loadAllAsync();
    }
    return this.settings_.find(setting => setting.name === name);
  }
}
