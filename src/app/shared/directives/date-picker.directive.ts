import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DynamicScriptLoaderService } from '../services/dynamic-script-loader.service';

declare var $:any;

@Directive({
    selector: '[appDatePicker]'
})
export class DatePickerDirective {
    constructor(private element: ElementRef,
                private control : NgControl,
                private dynamicScriptLoaderService: DynamicScriptLoaderService) {
    }
    @Input()
    set appDatePicker(options: object) {
        const _this = this;
        this.dynamicScriptLoaderService.load(['datepicker']).then((scripts) => {
            $(this.element.nativeElement).datepicker(options).on('changeDate', (e: any)=> {
                _this.control.control.setValue(e.format());
                $(this.element.nativeElement).datepicker('hide');
            });
        });
    }
}
