import { Directive, ElementRef, Input } from '@angular/core';


declare var $:any;

@Directive({
    selector: '[appSumoSelect]'
})
export class SumoSelectDirective {
    constructor(private element: ElementRef) {
    }
    @Input()
    set appSumoSelect(options: object) {
        setTimeout(()=> {
            $(this.element.nativeElement).SumoSelect(options);
        }, 500);
    }
}
