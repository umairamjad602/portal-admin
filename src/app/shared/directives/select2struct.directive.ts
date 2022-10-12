import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { DynamicScriptLoaderService } from '../services/dynamic-script-loader.service';

declare var $:any;

@Directive({
    selector: '[appSelect2Struct]'
})
export class Select2StructDirective {
    private scriptLoaded = false;
    constructor(private element: ElementRef,
                // private control : NgControl,
                private dynamicScriptLoaderService: DynamicScriptLoaderService) {
    }

    @Input()
    set appSelect2Struct(options: object) {
        const _this = this;
        if(this.scriptLoaded) {
            this.initSelect2(options);
        } else {
            this.dynamicScriptLoaderService.load(['select2']).then((scripts) => {
                this.initSelect2(options);
            });
        }
    }

    private initSelect2(options: any) {
        $(this.element.nativeElement).select2(options);
        if ('events' in options) {
            Object.keys(options['events']).forEach(key => {
              $(this.element.nativeElement).on(key, options['events'][key]);
            });
        }
    }
}
