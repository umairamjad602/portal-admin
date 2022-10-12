import { User } from "./authentication.model";
import { CompanySetting } from "./company-settings.model";
import { FieldOptionTypes } from "./field-option.model";
import { UserGroup } from "./groups.model";
import { MediaType } from "./media.model";
import { Module, Role, Profile, AssignedRole } from "./RBACL.model";

export interface AppData {
    app: App;
}
export interface App {
    company: CompanySettingsObject,
    modules: Module[];
    users: User[];
    media_types: MediaType[];
    field_options: FieldOptionTypes;
    security_context: AppSecurityContext;
    rbacl: { roles: Role[], profiles: Profile[] },
    assigned_rbacl: AssignedRole,
    preferences: object;
}
export interface CompanySettingsObject {
    c_id?: number;
    c_ob_set?: CompanySetting;
}

export interface AppSecurityContext {
    groups: UserGroup[];
}
