import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from '../models/alert.model';

@Injectable({providedIn: 'root'})
export class ApplicationEvent {
  public onAlert = new EventEmitter<Alert>();
  public onProfileNeedsRefresh = new EventEmitter<any>();
  public onGenericEvent = new EventEmitter<any>();
  constructor() {
  }

  public fireAlert(alert: Alert) {
    this.onAlert.emit(alert);
  }

  public fireGenericEvent(event: any) {
    this.onGenericEvent.emit(event);
  }

  public fireProfileNeedsRefresh(data: any) {
    this.onProfileNeedsRefresh.emit(data);
  }
}
