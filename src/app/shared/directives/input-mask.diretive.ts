import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DynamicScriptLoaderService } from '../services/dynamic-script-loader.service';

declare var $:any; 

@Directive({
    selector: '[appInputMask]'
})
export class InputMaskDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private element: ElementRef,
        private dynamicScriptLoaderService: DynamicScriptLoaderService,
        private viewContainer: ViewContainerRef) {  
        }
    @Input()  
    set appInputMask(options: object) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        let element: any = null;
        if(this.templateRef.elementRef.nativeElement.nodeName === "#comment") {
            element = this.element.nativeElement.nextSibling;
        } else {
            element = this.element;
        }

        this.dynamicScriptLoaderService.load(['inputmask']).then((scripts) => {
            $(element).inputmask(options);
        });
    }


}
