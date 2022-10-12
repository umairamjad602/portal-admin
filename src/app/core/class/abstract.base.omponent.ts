import { Component, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Alert } from '@app/shared/models/alert.model';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-abstract-base',
  template: ''
})
export abstract class AbstractBaseComponent implements OnDestroy {
    public subscription: any = null;
    public hasErrors = false;
    public errorsList: string[] = [];
    public httpError: HttpErrorResponse;
    public errorSubscription: any;
    public onError = new EventEmitter<any>();
    public ready = false;
    public alert: Alert;
    public loading = false;
    public httpProcess = false;
    protected subscriptions: Subscription[] = [];

    constructor() {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    protected subscribe(subscription: Subscription) {
        if (!this.subscriptions.includes(subscription)) {
            this.subscriptions.push(subscription);
        }
    }

    protected unsubscribe() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    protected loadingStart() {
        this.loading = true;
    }

    protected loadingFinished() {
        this.loading = false;
    }

    protected httpProcessStart() {
        this.httpProcess = true;
    }

    protected httpProcessEnd() {
        this.httpProcess = false;
    }

    getFormValidationErrors(form: any) {
        const errors: string[] = [];
        Object.keys(form.controls).forEach(key => {
            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    errors.push('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                });
            }
        });
        return errors;
    }

    public getValue(obj: any, val: any, defaultValue: any = null): any {
        return (obj == null || !obj.hasOwnProperty(val)) ? defaultValue : obj[val];
    }
}
