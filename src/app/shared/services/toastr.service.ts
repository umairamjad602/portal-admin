import { Injectable, EventEmitter } from '@angular/core';
declare const toastr: any;

@Injectable({providedIn: 'root'})
export class ToastrService {
    constructor() {
    }

    public toastSuccess(text: string) {
        toastr.success(text, this.options);
    }

    public toastWarning(text: string) {
        toastr.warning(text, this.options);
    }

    public toastError(text: string) {
        toastr.error(text, this.options);
    }

    private get options() {
        return {
            'closeButton': true,
            'debug': false,
            'newestOnTop': true,
            'progressBar': true,
            'positionClass': 'toast-top-right',
            'preventDuplicates': true,
            'showDuration': 300,
            'hideDuration': 100,
            'timeOut': 5000,
            'extendedTimeOut': 1000,
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        };
    }
}
