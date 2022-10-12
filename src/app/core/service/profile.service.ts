import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@app/core/class/baseAPI.class';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { LocalStorageService } from '@app/core';
import { AuthenticationEvent } from '@app/core/authentication/authentication.model';
import { TwoFAEmailCodeResponse, TwoFAQRCodeResponse, User, UserPrefResponse, UserResponse } from '../model/user.model';
import { UsersService } from './users.service';
import { Client, Profile, Registration, ShortProfile } from '../model/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService extends BaseAPIClass {
    public readonly STORAGE_KEY_PROFILE: string = 'ClientProfile';
    private readonly URL_REGISTER: string = 'auth/register';
    private readonly URL_UPDATE_PROFILE: string = 'profile/update';
    private readonly URL_FORGOT_PASSWORD: string = 'auth/forgot_password';
    private readonly URL_RESET_PASSWORD: string = 'auth/reset_password';
    private readonly URL_CHANGE_PASSWORD: string = 'auth/password';
    private readonly URL_EMPLOYEE_TIMEOFF_BALANCES: string = 'employees/timeoff/balances';
    public readonly URL_CHANGE_2FA = 'change2fa';
    public readonly URL_GENERATE_2FA_QR_CODE = 'generate_2fa_qrcode';
    public readonly URL_GENERATE_2FA_EMAIL_CODE = 'generate_2fa_email_code';
    public readonly URL_ENABLE_GOOGLE_2FA = 'enable_google_2fa';
    public readonly URL_ENABLE_EMAIL_2FA = 'enable_email_2fa';
    public readonly URL_DISABLE_EMAIL_2FA = 'disable_email_2fa';
    public readonly URL_DISABLE_GOOGLE_2FA = 'disable_google_2fa';
    private readonly URL_VALIDATE_2FA: string = 'auth/2fa/validate';
    private readonly URL_FETCH_HELP: string = 'help';
    private readonly URL_PING: string = 'ping';

    private readonly URL_FETCH_PREFERENCES: string = 'users/preferences';
    private user: User | null = null;
    private loadingProfile = false;

    constructor(
        protected override httpClient: HttpClient,
        protected override authenticationService: AuthenticationService,
        private usersService: UsersService,
        private localStorageService: LocalStorageService) {
        super(httpClient, authenticationService);
        this.authenticationSubscription = this.authenticationService.onAuthenticationChange.subscribe(
            this.handleAuthenticationChanged.bind(this)
        );
    }

    public authenticated() {
        return this.authenticationService.isAuthenticated();
    }

    public async getProfileAsync(refresh: boolean = false) {
        if (!this.loadingProfile) {
            this.loadingProfile = true;
            let user: any = null;
            if (!refresh) {
                user = this.user;
                if (user === null) {
                    const userResponse: UserResponse = await this.usersService.fetchMyProfileAsync();
                    user = userResponse.profile;
                }
            } else {
                const userResponse: UserResponse = await this.usersService.fetchMyProfileAsync();
                user = userResponse.profile;
            }
            this.user = user;
            this.loadingProfile = false;
            return user;
        }
    }

    public async registerAsync(registration: Registration) {
        const registeration = await this.postAsync<Client>(
            this.URL_REGISTER,
            registration
        ).toPromise();
        return registeration;
    }

    // public async saveInternalServerErrorInfo(internalServerError: InternalServerError) {
    //     const internalServerErrors = await this.postAsync<Client>(
    //         this.URL_FETCH_INTERNAL_SERVER_ERROR,
    //         internalServerError
    //     ).toPromise();
    //      return internalServerErrors;
    // }

    public async updateProfileAsync(profile: ShortProfile) {
        const updatedProfile = await this.postAsync<User>(
            this.URL_UPDATE_PROFILE,
            profile
        ).toPromise();
        this.saveProfileLocally(updatedProfile);
        return profile;
    }

    public saveProfileLocally(user?: User) {
        if (user) {
            this.localStorageService.setItem(this.STORAGE_KEY_PROFILE, JSON.stringify(user));
        } else {
            this.localStorageService.clearItem(this.STORAGE_KEY_PROFILE);
        }
    }

    public getLocallySavedProfile() {
        const profile =  this.localStorageService.getItem(this.STORAGE_KEY_PROFILE);
        return JSON.parse(profile);
    }

    private async handleAuthenticationChanged(event: AuthenticationEvent) {
        if (event.status === 'logged-in') {
            this.saveProfileLocally();
            await this.getProfileAsync(true);
        } else if (event.status === 'logged-out') {
            this.saveProfileLocally();
        }
    }

    public async generatePasswordResetEmail(email: string) {
        return await this.postAsync(
            this.URL_FORGOT_PASSWORD,
            { email },
            [],
            true
        ).toPromise();
    }

    public async resetPassword(data: any) {
        return await this.postAsync(
            this.URL_RESET_PASSWORD,
            data,
            [],
            true
        ).toPromise();
    }

    public async changePassword(data: any) {
        return await this.postAsync(this.URL_CHANGE_PASSWORD, data, []).toPromise();
    }

    public async getUser() {
        if (this.user === null) {
            await this.getProfileAsync();
        }
        return this.user;
    }

    public async fetchTimeOffBalances() {
        return await this.postAsync<any>(this.URL_EMPLOYEE_TIMEOFF_BALANCES, {}, {}, false).toPromise();
    }


    public async validate2FAAsync(profile: Profile) {
        return await this.postAsync(this.URL_VALIDATE_2FA, profile).toPromise();
    }


    public async enableGoogleAuthenticator2FA(data: any) {
        return await this.postAsync(this.URL_ENABLE_GOOGLE_2FA, data).toPromise();
    }

    public async enableEmail2FA(data: any) {
        return await this.postAsync(this.URL_ENABLE_EMAIL_2FA, data).toPromise();
    }

    public async disableEmail2FA(data: any) {
        return await this.postAsync(this.URL_DISABLE_EMAIL_2FA, data).toPromise();
    }

    public async disableGoogle2FA(data: any) {
        return await this.postAsync(this.URL_DISABLE_GOOGLE_2FA, data).toPromise();
    }

    public async generate2FAQRCode() {
        return await this.postAsync<TwoFAQRCodeResponse>(
            this.URL_GENERATE_2FA_QR_CODE
        ).toPromise();
    }

    public async generate2FAEmailCode() {
        return await this.postAsync<TwoFAEmailCodeResponse>(
            this.URL_GENERATE_2FA_EMAIL_CODE
        ).toPromise();
    }

    public async fetchPreferences() {
        const response = await this.getAsync<UserPrefResponse>(this.URL_FETCH_PREFERENCES, {}, {}, false).toPromise();
        return response;
    }

    public async fetchHelps() {
        return await this.getAsync<UserPrefResponse>(this.URL_FETCH_HELP, {}, {}, false).toPromise();

    }

    public async savePreferences(payload: any) {
        const response = await this.postAsync<UserPrefResponse>(this.URL_FETCH_PREFERENCES, payload, {}, false).toPromise();
        return response;
    }

    public async ping() {
        const response = await this.postAsync(this.URL_PING, {}, {}, false).toPromise();
        return response;
    }
}
