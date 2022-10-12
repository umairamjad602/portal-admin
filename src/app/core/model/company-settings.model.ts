import { Time } from '@angular/common';

export interface CompanySetting {
    // General Settings
    id?: number;
    company_id?: number;
    json_settings_object?: string;

    vat_number?: string;
    date_format?: string;
    time_format?: string;
    default_currency?: string;
    allow_over_selling?: boolean;

    // Email Settings
    from_name?: string;
    from_email?: string;
    email_log?: boolean;

    // Localization setting
    decimal_seperator?: string;
    thousands_seperator?: string;
    display_currency_symbol?: string;
    rtl_support?: string;

    // Printing setting
    print_group?: boolean;
    print_category?: boolean;
    print_item?: boolean;
    invoice_prefix?: string;

    // Branding
    company_logo?: string;
    invoice_logo?: string;

    // working hours
    start_time?: Time;
    end_time?: Time;
}

export enum setting {
    GeneralSetting,
    EmailSetting,
    LocalizationSetting,
    BarcodeSetting,
    PrintSetting,
    AlertSetting,
    BrandingSetting,
    WorkingHoursSetting
}

export interface CompanySettingResponse  {
    companySetting?: CompanySettingPager;
    message?: string;
}

export interface CompanySettingPager  {
    current_page?: number;
    data?: CompanySetting[];
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
