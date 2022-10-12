import { Account } from "./account.model";
import { Company } from "./company.model";
import { Department } from "./department.model";
import { UserCalendarSetting } from "./user-calender-setting.model";

export interface User {
    id: number;
    reports_to: number;
    company?: Company;
    manager_id?: number;
    desk_id?: number;
    department_id?: number;
    group_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: any;
    password?: string;
    password_confirmation?: string;
    last_login_at: Date;
    secret_2fa: string;
    type_of_authentication: TypeOfAuthentication;
    password_recovery_token_created_at: Date;
    password_recovery_token: string;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    street_address: string;
    city: string;
    state: string;
    country: string;
    starting_date_of_week: string;
    day_starts_at: string;
    date_format: string;
    calendar_hour_format: string;
    title: string;
    fax: string;
    department: string;
    departments?: Department[];
    other_email: string;
    secondary_email: string;
    office_phone: string;
    mobile_phone: string;
    home_phone: string;
    server_name: string;
    user_name: string;
    promo_code?: string;
    from_email: string;
    whitelist_ip_addresses?: string[];
    address: address;
    currency_number_details: currency_number_details;
    extra_info?: extra_info;
    calendar_settings?: UserCalendarSetting;
    status?: Status;
    brand_id: number;
    role_id: number;
    account?: Account;
}

export enum TypeOfAuthentication {
    email = 'email',
    sms = 'sms',
    google_authenticator = 'Google Authenticator',
    none = 'none'
}

export enum Status {
    Active = 'Active',
    Inactive = 'Inactive'
}


export interface TwoFAQRCodeResponse {
    key: string;
    qr_code: string;
}

export interface TwoFAEmailCodeResponse {
    message: string;
    code?: string;
}



export interface currency_number_details {
    currency: string;
    symbol_placement: string;
    truncate_trailing_zeros: string;
    decimal_separator: string;
    digit_grouping_saparator: string;
    digit_grouping_pattern: string;
    number_of_currency_decimals: string;

}
export interface UserDigest {
    id: number;
    first_name?: string;
    last_name: string;
    email?: string;
}

export interface extra_info {
    crm_phone_extension: string;
    default_record_view: string;
    department: string;
    documents: string;
    fax: string;
    home_phone: string;
    id: number;
    internal_mail_composer: boolean;
    language: string;
    left_panel_hide: boolean;
    mobile_phone: string;
    office_phone: string;
    other_email: string;
    report_to: number;
    row_height: string;
    secondary_email: string;
    secondary_phone: string;
    signature: string;
    theme: string;
    title: string;
    user_id: number;
}
export interface address {
    country: number;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
}

export interface UserResponse {
  profile?: User;
  user?: User;
  message?: string;
}

export interface LoginHistoryResponse {
  login_history?: LoginHistoryPager;
  count?: Number;
}

export interface UsersResponse {
  records?: UsersPager;
  message?: string;
}
export interface UsersPager {
  current_page: number;
  data: User[];
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

export interface LoginHistoryPager {
  current_page: number;
  data: LoginHistory[];
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

export interface LoginHistory {
  id: number;
  type: string;
  user_id: number;
  ip: string;
  device?: any;
  status: string;
  login_time: string;
  logout_time?: any;
  user: UserDigest;
  created_at: Date;
  updated_at: Date;
}

export interface LoginHistoryFilter {
  page?: number;
  per_page?: number;
  date?: string;
  ip?: string;
  user_id?: number;
  to ?: number;
  from?: number;
}


export interface UserPref {
  deposit_by_day: boolean;
  latest_activities: boolean;
  deposit_by_assignee: boolean;
  monthly_deposit_withdraw: boolean;
  daily_deposit_withdraw: boolean;
  lead_by_status: boolean;
  ticket_by_status: boolean;
  favourite_leads: boolean;
  favourite_Accounts: boolean;
  clients_by_status: boolean;
  preferred_currency: string;
}
export interface UserPrefResponse {
  user_preference: UserPref;
}
