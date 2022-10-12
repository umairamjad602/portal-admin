import { Component, HostListener } from '@angular/core';
import { ErrorModelErrorMessageObject } from './core/model/error.model';
declare const $: any;
import Swal from 'sweetalert2';
import { ErrorMessageService } from './core';
import { AbstractBaseComponent } from './core/class/abstract.base.omponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractBaseComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    $('.inbox-sidebar, .sidebar, .hide-if-small, show-if-large-screen, show-if-mobile').attr('style', '');
    $('.message-box, .sidebar-toggle, .child-view').attr('style', '');
    $('.users-list').attr('style', '');
    $('.content').attr('style', '');
    $('.content').attr('style', '');
    $('.offcanvas-body .active').removeClass('active-if-sm');
    $('.inbox-sidebar-items-if-sm').removeClass('inbox-sidebar-items-if-sm');
    $('.inbox-sidebar-toggle-if-sm').removeClass('inbox-sidebar-toggle-if-sm');
    $('.cart-if-small').removeClass('cart-if-small');
  }

  constructor (
    private errorMessageService: ErrorMessageService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribe(this.errorMessageService.errors$.subscribe(this.handleHttpRequestError.bind(this)));
  }

  private handleHttpRequestError(errors: ErrorModelErrorMessageObject[]) {
    let html = '';
    for (const errorObject of errors) {
      html += errorObject.error + '<br>';
    }

    Swal.fire('Oops!', html, 'error');
  }
}
