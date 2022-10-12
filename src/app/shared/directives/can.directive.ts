import { Directive, ElementRef, Input } from '@angular/core';
import { ApplicationDataService } from '@app/core/service/application-data.service';

@Directive({
  selector: '[appIfHasPermssion]'
})
export class CanDirective {
    private readonly byPassableRoles = [1];
    constructor(
        private element: ElementRef,
        private applicationDataService: ApplicationDataService) {
    }

    @Input()
    set appIfHasPermssion(permission: string) {
        const roleId = this.applicationDataService.roleId;
        const hasPermission = (this.applicationDataService.permissions.indexOf(permission.toLowerCase()) > -1);
        if(hasPermission || this.shouldByPass(roleId)) {
            this.element.nativeElement.style.display = 'block';
        } else {
            this.element.nativeElement.style.display = 'none';
        }
    }

    private shouldByPass(roleId: number) {
        return this.byPassableRoles.indexOf(roleId) > -1;
    }

}
