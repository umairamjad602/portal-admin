import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from '@shared/models/alert.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationEventService {
    public onAlert = new EventEmitter < Alert > ();
    public onProfileNeedsRefresh = new EventEmitter < any > ();
    public onGenericEvent = new EventEmitter < any > ();
    public onNotificationEvent = new EventEmitter < any > ();
    constructor() {}

    public fireAlert(alert: Alert) {
        this.onAlert.emit(alert);
    }

    public fireGenericEvent(event: any) {
        this.onGenericEvent.emit(event);
    }

    public fireProfileNeedsRefresh(data: any) {
        this.onProfileNeedsRefresh.emit(data);
    }

    public fireNotificationEvent(data: any) {
        this.onNotificationEvent.emit(data);
    }
}
