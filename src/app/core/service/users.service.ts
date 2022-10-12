import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@app/core/class/baseAPI.class';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { GenericFilter } from '../model/generic_filter.model';
import { LoginHistoryResponse, User, UserResponse, UsersResponse } from '../model/user.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseAPIClass {

    private readonly URL_FETCH_USERS: string = 'users';
    private readonly URL_FETCH_USER: string = 'users/user_data/{id}';
    private readonly URL_FETCH_LOGIN_HISTORY: string = 'users/login_history';
    private readonly URL_FETCH_PROFILE: string = 'auth/me';
    private readonly URL_CREATE_USERS: string = 'users';
    private readonly URL_UPDATE_USERS: string = 'users';
    private readonly URL_DELETE_USERS: string = 'users/delete/{id}';
    private readonly URL_USER_GROUPS: string = 'users/{id}/groups';
    private readonly URL_CHANGE_PASSWORD: string = 'users/change_password/{id}';
    private readonly URL_FETCH_DEPARTMENTS: string = 'departments';
    private readonly URL_FETCH_MANAGERS: string = 'managers';
    private readonly URL_FETCH_DESKS: string = 'desks';
    private readonly URL_LOGIN_AS_AGENT: string = 'auth/temp_login';
    private readonly URL_GET_USER_PASSPHRASE: string = 'pass_phrase/{id}';

    constructor(
        protected override httpClient: HttpClient,
        protected override authenticationService: AuthenticationService) {
        super(httpClient, authenticationService);
    }

    public async fetchUsersAsync(filters: GenericFilter) {
        return firstValueFrom(this.getAsync<UsersResponse>(this.URL_FETCH_USERS, filters, {}, false));
    }

    public async fetchLoginHistoryAsync(filter: GenericFilter) {
        return firstValueFrom(this.getAsync<LoginHistoryResponse>(this.URL_FETCH_LOGIN_HISTORY, filter, {}, false));
    }

    public async fetchMyProfileAsync() {
        return firstValueFrom(this.getAsync<UserResponse>(this.URL_FETCH_PROFILE, {}, {}, false));
    }

    // public async fetchUserGroupsAsync(userId: number) {
    //     const url = this.URL_USER_GROUPS.replace('{id}', userId.toString());
    //     return await this.getAsync<UserGroupsResponse>(url, {}, {}, false).toPromise();
    // }

    // public saveUserAsync(user: User) {
    //     return firstValueFrom(this.postAsync<UserResponse>(this.URL_CREATE_USERS, user, {}, false));
    //   }

    //   public async loginAsAgentAsync(user: User) {
    //     return firstValueFrom(this.postAsync<UserResponse>(this.URL_LOGIN_AS_AGENT, user, {}, false));
    //   }

    // public async updateUserAsync(user: User) {
    //     return firstValueFrom(this.putAsync<UserResponse>(this.URL_UPDATE_USERS, user, {}, false));
    // }

    // public async deleteUserAsync(user: User) {
    //     const url = this.URL_DELETE_USERS.replace('{id}', user.id.toString());
    //     return firstValueFrom(this.deleteAsync<UserResponse>(url, user, {}, false));
    // }

    //   public async changePasswordAsync(user: User) {
    //     const url = this.URL_CHANGE_PASSWORD.replace('{id}', user.id.toString());
    //     return firstValueFrom(this.postAsync<UserResponse>(url , user, {}, false));
    // }

    // public async userDeleteByIdAsync(user: User) {
    //     const url = this.URL_CHANGE_PASSWORD.replace('{id}', user.id.toString());
    //     return firstValueFrom(this.postAsync<UserResponse>(url  , user, {}, false));
    // }

    public fetchSingleUserAsync(userId: number) {
        return this.getAsync<UserResponse>(this.URL_FETCH_USERS + "/single/" + userId, {}, {}, false);
    }

    // public async fetchDepartments() {
    //     return await this.getAsync<any>(this.URL_FETCH_DEPARTMENTS, {per_page: 1000}, {}, false).toPromise();
    // }
    // public async fetchManagers() {
    //     return await this.getAsync<any>(this.URL_FETCH_MANAGERS, {per_page: 1000}, {}, false).toPromise();
    // }

    // public async fetchDesks() {
    //     return await this.getAsync<any>(this.URL_FETCH_DESKS, {per_page: 1000}, {}, false).toPromise();
    // }

    // public async getUserPassPhraseAsync(userId: number) {
    //     const url = this.URL_GET_USER_PASSPHRASE.replace('{id}', userId.toString());
    //     return await this.getAsync<any>(url, {}, {}, false).toPromise();
    // }
}
