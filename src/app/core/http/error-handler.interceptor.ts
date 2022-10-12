import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest,HttpResponse} from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageService } from '@app/core/service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationEventService } from '../service/application-event.service';

const credentialsKey = 'credentials';
/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    @Output() emitData = new EventEmitter();

  constructor(
    private router: Router,
    private errorMessageService: ErrorMessageService,
    private applicationEvent: ApplicationEventService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError(error => this.errorHandler(error)));
  }

  private errorHandler(
    response: HttpResponse<any>
  ): Observable<HttpEvent<any>> {
    const errorResponse: any = response;

    switch(errorResponse.status) {
        case 401:
        case 417:
            if (errorResponse.error) {
                if (typeof errorResponse.error === 'object' && 'error' in errorResponse.error &&
                    ( errorResponse.error.token_status === 'token_not_found' ||
                      errorResponse.error.token_status === 'token_expired' )
                    ) {
                    this.router.navigateByUrl('?logged_out=' + errorResponse.error.token_status);
                } else {
                    this.router.navigateByUrl('?logged_out=incorrect');
                }
            }
        break;
        case 422:
            const errors = errorResponse.error.validation || errorResponse.error;
            if (errors !== null) {
                const errorsList: any[] = [];
                if (typeof errors === 'object') {
                    for (const eKey of Object.keys(errors)) {
                        if (typeof errors[eKey] === 'object') {
                            for (const err of Object.values(errors[eKey])) {
                                errorsList.push(err);
                            }
                        }
                    }
                }
                this.errorMessageService.clear();
                this.errorMessageService.setErrorList(errorsList, 'Validation', response.url);
            }
        break;
        case 500:
            const serveError = errorResponse.error.message || errorResponse.error.error;
            this.errorMessageService.set(serveError, 'Server', response.url,errorResponse.error.log_id);
            this.applicationEvent.fireGenericEvent({ name: 'internal-server' });
        break;
        case 400:
            const error = errorResponse.error.message || errorResponse.error.error;
            this.errorMessageService.clear();
            this.errorMessageService.set(error, 'Server', response.url);
        break;
        case 503:
            this.router.navigateByUrl('under-maintenance');
        break;
    }

    if (!environment.production) {
        console.error('Request error', response);
    }
    throw response;
  }
}
