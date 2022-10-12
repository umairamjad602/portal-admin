export interface Groups {
    id: number;
    group_name: string;
    is_default: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserGroup {
    group_id: number;
}

export interface UserGroupsResponse {
    groups: UserGroup[];
}

export enum UserAccessGroupEnum {
    Administrator = 1,
    Modrator = 2,
    Employee = 3,
    CompanyOwner = 4,
    Guest = 5
}
