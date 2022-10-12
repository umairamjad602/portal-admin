import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DynamicScriptLoaderService } from '../services/dynamic-script-loader.service';
declare var $: any;
@Directive({
    selector: '*appSelect2'
})
export class Select2Directive {
    constructor(
        private templateRef: TemplateRef<any>,
        private element: ElementRef,
        private dynamicScriptLoaderService: DynamicScriptLoaderService,
        private viewContainer: ViewContainerRef) {
    }

    @Input()
    set appSelect2(options: any) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        let element: any = null;
        if (this.templateRef.elementRef.nativeElement.nodeName === '#comment') {
            element = this.element.nativeElement.nextSibling;
            if(element != null && element.nodeName === '#comment') {
                element = this.element.nativeElement.previousSibling;
            }

            if(element == null) {
                element = this.element.nativeElement.previousSibling;
            }
        } else {
            element = this.element;
        }

        this.dynamicScriptLoaderService.load(['select2']).then((_) => {
            $(element).select2(options);
            if ('events' in options) {
                Object.keys(options['events']).forEach(key => {
                  $(element).on(key, options['events'][key]);
                });
            }
        });
    }


}
