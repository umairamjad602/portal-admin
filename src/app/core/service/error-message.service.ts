import { EventEmitter, Injectable } from '@angular/core';
import { ErrorModelErrorMessageObject } from '../model/error.model';

@Injectable()
export class ErrorMessageService {
  private _errors: ErrorModelErrorMessageObject[] = [];
  public errors$ = new EventEmitter<ErrorModelErrorMessageObject[]>();

  constructor() {}

  get errors(): ErrorModelErrorMessageObject[] {
    return this._errors;
  }

  public set(error: string, type: string, serviceUrl: any, log_id?:string) {
    this._errors.push({
      id: Date.now(),
      error: error,
      type: type,
      log_id: log_id,
      serviceUrl: serviceUrl
    });
    this.errors$.emit(this._errors);
  }

  public setErrorList(errors: string[], type: string, serviceUrl: any, log_id?:any) {
    for (const error of Object.values(errors)) {
        this._errors.push({
            id: Date.now(),
            error: error,
            type: type,
            log_id:log_id,
            serviceUrl: serviceUrl
        });
    }
    this.errors$.emit(this._errors);
  }

  public clear() {
    this._errors = [];
    this.errors$.emit(this._errors);
  }

}
