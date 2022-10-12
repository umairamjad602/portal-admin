import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService, BaseAPIClass } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class FieldOptionsService extends BaseAPIClass {

  private readonly ROUTE_FIELD_OPTIONS_BY_TYPE: string = "field_options_by_type";

  constructor(
    private _httpClient: HttpClient,
    protected authenticationService: AuthenticationService) {
    super(_httpClient, authenticationService);
  }

  public async getFieldOptionsByTypes(typeId: number) {
    return await this.getAsync(this.ROUTE_FIELD_OPTIONS_BY_TYPE + "/" + typeId, null, {}, false).toPromise();
  }
}
