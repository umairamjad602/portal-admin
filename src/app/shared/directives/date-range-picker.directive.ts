import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DynamicScriptLoaderService } from '../services/dynamic-script-loader.service';

declare var $:any;

@Directive({
    selector: '[appDateRangePicker]'
})
export class DateRangePickerDirective {
    constructor(private element: ElementRef,
                private control : NgControl,
                private dynamicScriptLoaderService: DynamicScriptLoaderService) {
    }
    @Input()
    set appDateRangePicker(options: any) {
        const _this = this;
        this.dynamicScriptLoaderService.load(['moment']).then((scripts) => {
            this.dynamicScriptLoaderService.load(['daterangepicker']).then((scripts) => {
                $(this.element.nativeElement).daterangepicker(options, (start: any, end: any, label: any)=> {
                    _this.control.control.setValue(start.format(options.locale.format) + '-' + end.format(options.locale.format));
                    $(this.element.nativeElement).daterangepicker('hide');
                });
            });
        });
    }
}
