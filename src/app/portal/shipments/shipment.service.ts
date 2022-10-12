import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService, BaseAPIClass } from '@app/core';
import { firstValueFrom } from 'rxjs';
import { CountriesResponse } from './models/countries.modal';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService extends BaseAPIClass {

  private URL_FETCH_COUNTRIES: string = 'lookup/countries';

  constructor(
    protected override httpClient: HttpClient,
    protected override authenticationService: AuthenticationService) {
    super(httpClient, authenticationService)
   }

   public async getCountriesListAsync() {
    return await firstValueFrom(this.getAsync<CountriesResponse>(this.URL_FETCH_COUNTRIES, {}, {}, false));
   }

   public async getCountryById() {

   }


}
