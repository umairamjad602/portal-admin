import { CompanySetting } from './company-settings.model';

export interface Company  {
    status?: any;
    id?: number;
    area_id?: number;
    name?: string;
    vat_number?: string;
    tax_identification_code?: string,
    registration_number?: string,
    primary_email?: string;
    secondary_email?: string;
    city?: string;
    country?: string;
    state?: string;
    address?: string;
    address_2?: string;
    post_box?: string;
    primary_phone?: string;
    secondary_phone?: string;
    fax?: string;
    description?: string;
    youtube_link?: string;
    facebook_link?: string;
    twitter_link?: string;
    website_link?: string;
    general_settings?: CompanySetting;
    logo?: any;
    password_confirmation?:string;
    password?:string;

}

export enum status {
    Active= 'Active',
    Inactive= 'Inactive'
}

export interface CompanyResponse {
    companies?: CompanyPager;
    message?: string;
}

export interface CompanyPager  {
    current_page?: number;
    data?: Company[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}

export enum CompaniesEnum {
    DB = 1
}
