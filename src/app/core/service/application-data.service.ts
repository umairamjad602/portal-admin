import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { COUNTRIES } from '@app/shared/data/countries';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { BaseAPIClass } from '../class/baseAPI.class';
import { AppData, AppSecurityContext } from '../model/app-data.model';
import { CompaniesEnum } from '../model/company.model';
import { FieldOptionTypes } from '../model/field-option.model';
import { UserAccessGroupEnum, UserGroup } from '../model/groups.model';
import { NavbarItem } from '../model/navbar-item.model';
import { AssignedRole, Permission } from '../model/RBACL.model';

@Injectable({ providedIn: 'root' })

export class ApplicationDataService extends BaseAPIClass {
    private readonly URL_FETCH_APP_DATA: string = 'auth/app_data';
    private appData: AppData | null = null;
    private userGroups: UserGroup[] = [];
    private fieldOptionStore: any = {};
    private RABCLStore: string[] = [];
    private allowedModuleIds: number[] = [];
    private countryFlagMap: any = {};

    public isAppDataAvailable() {
        return this.appData != null;
    }

    public async fetchAppData() {
        return firstValueFrom(this.getAsync<AppData>(this.URL_FETCH_APP_DATA));
    }

    public async getAppData() {
        this.appData = (this.appData == null) ? await this.fetchAppData() : this.appData;
        if (Array.isArray(this.appData?.app)) {
            this.appData = null;
        }
        return this.appData;
    }

    public async refreshAppData() {
        this.appData = await this.fetchAppData();
    }

    public async getFieldOptions() {
        if (this.appData == null) {
            await this.getAppData();
        }
        return this.appData?.app.field_options;
    }

    public buildFieldOptionStore(fieldOptionsTypes: any) {
        Object.keys(fieldOptionsTypes).forEach((key: any)=> {
            if('fieldOptions' in fieldOptionsTypes[key]) {
                for(const fieldOption of fieldOptionsTypes[key].fieldOptions){
                    this.fieldOptionStore[fieldOption.id] = fieldOption;
                }
            }
        });
    }

    public buildRBACLStore(assignedRole: AssignedRole) {
        Object.values(assignedRole.permissions).forEach((permissions: Permission[])=> {
            permissions.forEach((permission: Permission) => {
                this.RABCLStore.push(permission.name.toLowerCase());
                if(this.allowedModuleIds.indexOf(permission.module_id) == -1) {
                    this.allowedModuleIds.push(permission.module_id);
                }
            });
        });
    }

    public getFieldOptionNameById(id: number) {
        return this.fieldOptionStore[id];
    }

    public async getRBACLRoles() {
        if (this.appData == null) {
            await this.getAppData();
        }
        return this.appData?.app.rbacl.roles;
    }

    public getUsers() {
        return this.appData?.app.users;
    }

    public async getModules() {
        if (this.appData == null) {
            await this.getAppData();
        }
        return this.appData?.app.modules;
    }

    public getSecurityContext() {
        return this.appData?.app.security_context || null;
    }

    public async getCompanyData() {
        if (this.appData == null) {
            await this.getAppData();
        }
        return this.appData?.app.company;
    }

    public async getAssignedPermissions() {
        if (this.appData == null) {
            await this.getAppData();
        }
        return this.appData?.app.assigned_rbacl.permissions;
    }

    public userBelongsToGroup(groupId: number) {
        return this.userGroups.map(userGroup => userGroup.group_id).includes(groupId);
    }

    public async getCurrencies() {
        if(this.appData == null){
            await this.getAppData();
        }
        return this.appData?.app.field_options[20].fieldOptions;
    }


    public getPOSCurrencies() {
        return [
            {id: 0, name: 'USD'},
            {id: 1, name: 'GBP'},
            {id: 2, name: 'EUR'},
            {id: 3, name: 'PKR'},
            {id: 4, name: 'INR'},
        ];
    }

    public async getEnvironments() {
        if(this.appData == null){
            await this.getAppData();
        }
        return this.appData?.app.field_options[28].fieldOptions;
    }

    // TODO: In future this will be fecthed from Backend
    public getTimeFormats() {
        return [
            { id: 0, name: '11:50 PM' },
            { id: 1, name: '23:50' },
        ];
    }


    // TODO: In future this will be fecthed from Backend
    public getDateFormats() {
        return [
            { id: 0, name: '31/12/2019' },
            { id: 1, name: '31/12/2019' },
            { id: 2, name: '31/Dec/2019' },
            { id: 3, name: '31-12-2019' },
            { id: 4, name: '12-31-2019' },
            { id: 5, name: '31-Dec-2019' }
        ];
    }

    // TODO: In future this will be fecthed from Backend
    public getCurrencySymbolPositions() {
        return [
            { id: 0, name: 'After' },
            { id: 1, name: 'Before' },
            { id: 2, name: 'Do no show' },
        ];
    }

    public spoken_language() {
        return [
            { id: 0, name: 'Abkhazian' },
            { id: 1, name: 'Afar' },
            { id: 2, name: 'Afrikaans' },
            { id: 3, name: 'Akan' },
            { id: 4, name: 'Albanian' },
            { id: 5, name: 'Amharic' },
            { id: 6, name: 'Arabic' },
            { id: 7, name: 'Aragonese' },
            { id: 8, name: 'Armenian' },
            { id: 9, name: 'Assamese' },
            { id: 10, name: 'Avaric' },
            { id: 11, name: 'Avestan' },
            { id: 12, name: 'Aymara' },
            { id: 13, name: 'Azerbaijani' },
            { id: 14, name: 'Bambara' },
            { id: 15, name: 'Bashkir' },
            { id: 16, name: 'Basque' },
            { id: 17, name: 'Belarusian' },
            { id: 18, name: 'Bengali' },
            { id: 19, name: 'Bihari languages' },
            { id: 20, name: 'Bislama' },
            { id: 21, name: 'Bokm' },
            { id: 22, name: 'Bosnian' },
            { id: 23, name: 'Breton' },
            { id: 24, name: 'Bulgarian' },
            { id: 25, name: 'Burmese' },
            { id: 26, name: 'Catalan' },
            { id: 27, name: 'Central Khmer' },
            { id: 28, name: 'Chamorro' },
            { id: 29, name: 'Chechen' },
            { id: 30, name: 'Chinese' },
            { id: 31, name: 'Chuvash' },
            { id: 32, name: 'Cornish' },
            { id: 33, name: 'Corsican' },
            { id: 34, name: 'Cree' },
            { id: 35, name: 'Croatian' },
            { id: 36, name: 'Czech' },
            { id: 37, name: 'Danish' },
            { id: 38, name: 'Dutch' },
            { id: 39, name: 'Dzongkha' },
            { id: 40, name: 'English' },
            { id: 41, name: 'Esperanto' },
            { id: 42, name: 'Estonian' },
            { id: 43, name: 'Ewe' },
            { id: 44, name: 'Faroese' },
            { id: 45, name: 'Fijian' },
            { id: 46, name: 'Finnish' },
            { id: 47, name: 'French' },
            { id: 48, name: 'Fulah' },
            { id: 48, name: 'Gaelic' },
            { id: 49, name: 'Galician' },
            { id: 50, name: 'Ganda' },
            { id: 51, name: 'Georgian' },
            { id: 52, name: 'German' },
            { id: 53, name: 'Greek' },
        ];
    }

    public getCurrencySeparators() {
        return [
            { id: 0, name: "," },
            { id: 1, name: "-" },
            { id: 2, name: "." },
            { id: 3, name: "space" },
        ];
    }

    public processNavigation(navigation: NavbarItem[]) {
        const securityContext: AppSecurityContext | null = this.getSecurityContext();
        let topLevelMenu: NavbarItem[] = [];
        if(securityContext != null) {
          this.userGroups = securityContext.groups;
          for (let menu of navigation) {
              if(this.isByPassableModule(menu.id) || this.hasAccessToModule(menu.id)) {
                  if(menu.hasOwnProperty('isDBOnlyModule') && !this.isDB()) {
                      continue;
                  }
                  if(menu.subMenu != null) {
                      const subMenu = this.processNavigation(menu.subMenu);
                      if(subMenu.length > 0) {
                          menu.subMenu = subMenu;
                          topLevelMenu.push(menu);
                      }
                  } else {
                      topLevelMenu.push(menu);
                  }
              }
          }
        }
        return topLevelMenu;
    }

    // If Admin is logged in, do not check any permission. Or Its a freely available module.
    // A Freely available module will have an id >= 1000
    private isByPassableModule(moduleId: number | undefined) {
      return (moduleId !== undefined)? this.userCarriesNoRestrictions() || moduleId >= 1000: true;
    }

    public hasAccessToModule(moduleId: number | undefined) {
      return (moduleId !== undefined)? this.allowedModuleIds.indexOf(moduleId) != -1: false;
    }

    public isModuleAllowed(moduleId: number) {
        return this.userCarriesNoRestrictions() || this.allowedModuleIds.indexOf(moduleId) != -1;
    }

    public getValidationErrorsAsList(request: HttpErrorResponse) {
        const responseErrors = request.error;
        const errorList: string[] = [];
        Object.keys(responseErrors).forEach((key: string) => {
            if (Array.isArray(responseErrors[key])) {
                responseErrors[key].forEach((errorMessage: string) => {
                    errorList.push(errorMessage);
                });
            } else {
                if (key != 'code') {
                    errorList.push(responseErrors[key]);
                }
            }
        })
        return errorList;
    }

    public getServerError(request: HttpErrorResponse) {
        return [request.error.error];
    }

    public hasValidationErrors(request: HttpErrorResponse) {
        return (request.status === 422);
    }

    public hasServerError(request: HttpErrorResponse) {
        return (request.status === 500);
    }
    public hasToManyAttemptsError(request: HttpErrorResponse) {
        return (request.status === 429);
    }
    public hasAuthenticationError(request: HttpErrorResponse) {
        return (request.status === 401);
    }

    public hasForbiddenError(request: HttpErrorResponse) {
        return (request.status === 403);
    }

    public getDefaultCurrency() {
        return this.appData?.app?.company?.c_ob_set?.default_currency;
    }

    public getRequestErrors(request: HttpErrorResponse) {
        if(this.hasServerError(request)) {

            return this.getServerError(request);
        } else if(this.hasValidationErrors(request)) {
            return this.getValidationErrorsAsList(request);
        } else if(this.hasAuthenticationError(request)) {
            return this.getServerError(request);
        }
        else if(this.hasToManyAttemptsError(request)) {
            return this.getServerError(request);

        }
        else if(this.hasForbiddenError(request)) {
            return this.getServerError(request);
        }
        return [];
    }

    public get permissions() {
        return this.RABCLStore;
    }

    public get roleId() {
        return this.appData?.app.assigned_rbacl.role_id;
    }

    public getCountryName(countryId: number) {
        const country = COUNTRIES.filter((country: any)=> country.id == countryId);
        return (country && country[0])? country[0].name: '--';
    }

    public getCountryFlag(countryName: string) {
        return (this.countryFlagMap[countryName] != null)? "./assets/images/round-flags/" + countryName.toLowerCase() + ".svg": '';
    }

    public async getFieldOptionsByTypeId(typeId: number) {
        const fieldOptionTypes: FieldOptionTypes | undefined = await this.getFieldOptions();
        return (fieldOptionTypes !== undefined)? fieldOptionTypes[typeId].fieldOptions: null;
    }

    public isAdmin() {
        return this.getUserAllGroupId().includes(UserAccessGroupEnum.Administrator);
    }

    public isCompanyOwner() {
        return this.getUserAllGroupId().includes(UserAccessGroupEnum.CompanyOwner);
    }

    public userCarriesNoRestrictions() {
        return this.isCompanyOwner() || this.isAdmin();
    }

    public getUserAllGroupId() {
        return this.userGroups.map(userGroup => userGroup.group_id);
    }

    public isDB() {
        return this.appData?.app.company?.c_id == CompaniesEnum.DB;
    }

    public getDisbaledModules() {
        const jsonSettings: any = this.appData?.app.company?.c_ob_set?.json_settings_object;
        let disabledModules = [];
        if(jsonSettings != null && 'disabled_mods' in jsonSettings) {
            disabledModules = jsonSettings.disabled_mods;
        }
        return disabledModules;
    }
}
