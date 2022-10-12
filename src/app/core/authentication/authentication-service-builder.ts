import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthnticationServiceBuilder {

    constructor(
                private authenticationService: AuthenticationService) {
    }

    public build() {
        return this.authenticationService;
    }

}
