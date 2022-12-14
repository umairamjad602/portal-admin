import { FieldOption } from "./field-option.model";

export interface Account {
    last_trade_date: string;
    is_online: boolean;
    desk: string;
    first_deposit_date: string;
    last_comment: string;
    last_comment_date: string;
    partner: string;
    promo_code: string;
    selected: any;
    id: number;
    account_name: string;
    middle_name: string;
    last_name: string;
    assignedTo: any;
    notify_owner: string;
    brand_id: number;
    email_opt_out: boolean;
    member_of: string;
    ip: string;
    ownership: string;
    registration_country: number;
    account_type_requested: string;
    website_language: FieldOption;
    account_status: number;
    recovery_question: FieldOption;
    recovery_answer: string;
    document_verified: number;
    compliance_completed: boolean;
    trading_disabled: boolean;
    brand_name: string;
    password_for_email: string;
    password_recovery_token: string;
    requested_leverage: string;
    client_category: string;
    account_type: string;
    client_type: number;
    password_recovery_token_created_at: string;
    id_type: FieldOption;
    introducing_broker: string;

    account_stage: number;

    original_retention_owner: string;
    account_enabled: boolean;
    address: string;
    addtional_information: string;
    anticipated_account_turnover_annually: string;
    assigned_id: string;
    city: string;
    confirm_password: string;
    deleted_at: string;
    document_status: number;
    ftd_amount: string;
    ftd_currency: string;
    ftd_date: string;
    ftd_owner: string;
    ftd_status: boolean;
    fund_method_country: string;
    ib_id: string;
    last_deposit_date: string;
    mobile: string;
    password: string;
    password_confirmation: string;
    password_last_changed_at: string;
    password_last_changed_by: string;
    phone: string;
    primary_tp_account: string;
    proof_of_identity: string;
    proof_of_residence: string;
    provider_name: string;
    redeposit_status: boolean;
    secondary_income: string;
    secondary_income_specify: string;
    secondary_source_of_income: string;
    secondary_source_of_income_specify: string;
    state: string;
    trading_status: number;
    user_id: number;
    verification_status: string;
    zip: string;
    account_description: string;
    description: string;
    created_at: any;
    accountContactInformation: AccountContactInformation;
    accountPersonalInformation: AccountPersonalInformation;
    accountTradingExperience: AccountTradingExperience;
    accountLegalInformation: AccountLegalInformation;
    accountLeadConversion: AccountLeadConversion;
    accountMarketingDetails: AccountMarketingDetails;
    user: UserModel;
    number_of_trading_accounts: number;
    favoriteAccounts: FavoriteAccount;
    assigned_to: number;
    created_by: number;
    meta_trader_client_id?: any;
    meta_trader_default_trading_account_id?: any;
    last_modified_by: number;
    account_identification: string;
    tradingAccounts: any[];
    trading_status_id?: number
    secondary_income_id?: number
    secondary_source_of_income_id?: number
    anticipated_account_turnover_annually_id?: number
    fund_method_country_id?: number
    proof_of_residence_id?: number
    proof_of_identity_id?: number
    document_status_id?: number
    account_type_requested_id?: number
    account_status_id?: number
    account_type_id?: number
    id_type_id?: number
    account_stage_id?: number
    client_type_id?: number
    registration_country_id?: number
    encrypted_password?: string
}

export interface AccountContactInformation {
    account_id: number;
    address: string;
    address_2: string;
    city: string;
    country: FieldOption;
    created_at: Date;
    deleted_at: string;
    email_confirmed: boolean;
    id: number;
    mobile: string;
    po_box: string;
    postal_code: string;
    prefix: string;
    primary_email: string;
    primary_phone: string;
    secondary_email: string;
    secondary_phone: string;
    skype_id: string;
    flag: string;
    state: string;
    country_id: number;
    updated_at: boolean;
}

export interface AccountPersonalInformation {
    account_id: number;
    business_profile: string;
    citizenship: string;
    country_of_birth: string;
    country_of_tax_residency: number;
    date_of_birth: string;
    deleted_at: string;
    education_level: string;
    expected_outgoing_country: string;
    field_of_study: FieldOption;
    id: number;
    identification_number: string;
    name_of_own_company: string;
    national_client_identifier: string;
    nationality: string;
    occupation: string;
    place_of_birth: string;
    position: string;
    profession_or_industry: FieldOption;
    professional_status: FieldOption;
    recieve_newsletters: boolean;
    source_of_income: string;
    sources_of_income: string;
    spoken_language: string;
    tax_number: string;
    us_citizen: boolean;
    education_level_id: number;
    professional_status_id: number;
    profession_or_industry_id: number;
    field_of_study_id: number;
    position_id: number;
    spoken_language_id: number;
    country_of_tax_residency_id: number;
}

export interface AccountTradingExperience {
    Have_Experienced_With_Trading_Using_A_Stop_Price: boolean;
    account_id: number;
    average_leverage_level_of_past_investments: string;
    cfds_trading_frequency: FieldOption;
    contract_$10000_leverage_1_50_margin_4: string;
    deleted_at: string;
    experience_in_cfds_average: string;
    experience_in_cfds_frequency: string;
    experience_in_other_derivatives_average: string;
    experience_in_other_derivatives_frequency: string;
    experience_in_shares_bonds_average: string;
    experience_in_shares_bonds_frequency: string;
    experience_or_qualification_in_trading: boolean;
    experience_question_4: FieldOption;
    experience_question_5: FieldOption;
    experience_question_6: FieldOption;
    experience_question_7: FieldOption;
    experience_question_8: FieldOption;
    forex_trading_frequency: FieldOption;
    have_Experienced_With_Trading_Using_Take_Profit: boolean;
    have_experienced_trading_pos_options_and_ror: boolean;
    have_experienced_with_trading_at_limited_cost: boolean;
    have_experienced_with_trading_at_market_prices: boolean;
    have_experienced_with_trading_using_trailing_stop: boolean;
    have_previously_traded_cfds: boolean;
    higher_leverage_equals_higher_volume: string;
    how_would_the_client_feel_after_lost_of_deposit: string;
    id: number;
    in_the_past_2_years: FieldOption;
    knowledge_of_cfds: boolean;
    lbl_past_year_transactions_number: string;
    lbl_past_year_transactions_value: string;
    level_of_experience: FieldOption;
    options_trading_frequency: FieldOption;
    position_close_equity_reach_maintenance_margin: string;
    related_education_level: string;
    betting_trading_frequency: FieldOption;
    size_financial_instrument: FieldOption;
    percentage_money_risk_losing: FieldOption;
    working_in_financial_industry: boolean;
    yearly_volume: string;
    years_in_financial_industry: string;
    level_of_experience_id: number;
    in_the_past_2_years_id: number;
    size_financial_instrument_id: number;
    percentage_money_risk_losing_id: number;
    experience_question_4_id: number;
    experience_question_5_id: number;
    experience_question_6_id: number;
    experience_question_7_id: number;
    experience_question_8_id: number;
    cfds_trading_frequency_id: number;
    forex_trading_frequency_id: number;
    betting_trading_frequency_id: number;
    options_trading_frequency_id: number;
}

export interface AccountLegalInformation {
    risk_reward_profile_investing: FieldOption;
    accepted_client_agreement: boolean;
    accepted_client_categorization_policy: boolean;
    accepted_complaint_handling_procedure: boolean;
    accepted_conflict_of_interest_policy: boolean;
    accepted_cookies_policy: boolean;
    accepted_investor_compensation_fund: boolean;
    accepted_mandatory_information: boolean;
    accepted_order_execution_policy: boolean;
    accepted_privacy_policy: boolean;
    accepted_risk_disclosure: boolean;
    accepted_statement: boolean;
    accepted_terms_conditions: boolean;
    account_id: number;
    amount_annual_income: string;
    annual_income: string;
    appropriateness_risk_warning: boolean;
    average_yearly_net_disposable_income: string;
    cookies_policy: boolean;
    country_of_origin: string;
    deleted_at: string;
    deposit_country: FieldOption;
    estimated_amount_detail: string;
    estimated_deposit_amount: string;
    expected_activity_of_account: string;
    expected_fund_method: string;
    id: number;
    investment_awareness: string;
    investment_objectives: string;
    location_of_real_estate: string;
    net_disposable_income: string;
    net_worth: string;
    net_worth_detail: string;
    other_source_of_income: string;
    own_real_estate: string;
    politically_exposed: boolean;
    preferred_method_for_receving_updates: string;
    purpose_of_investment: FieldOption;
    risk_level: FieldOption;
    risk_reward_profile_in_crm: string;
    soecify_name_of_institution: string;
    sole_beneficiary_of_account: boolean;
    what_are_your_investment_objectives: string;
    withdrawal_destination_different_from_funding_origin: string;
    years_of_work: string;
    annual_income_id: number;
    net_worth_id: number;
    purpose_of_investment_id: number;
    estimated_deposit_amount_id: number;
    risk_level_id: number;
    risk_reward_profile_investing_id: number;
    deposit_country_id: number;
}

export interface AccountLeadConversion {
    account_id: number;
    external_lead_id: string;
    id: number;
    lead_creation_time: string;
    lead_id: string;
    lead_source: string;
    lead_supplier: string;
    page_url: string;
}

export interface AccountMarketingDetails {
    account_id: number;
    ad_group: string;
    ad_id: string;
    ad_size: string;
    affiliate_id: string;
    agent_account: string;
    banner_id: string;
    campaign_id: string;
    deleted_at: string;
    demo_registration_ext_notify: string;
    ftd_ext_notify: string;
    gcl_id: string;
    id: number;
    lead_ext_notify: string;
    lead_notification_url: string;
    live_registration_ext_notify: string;
    media: string;
    mtg_1: string;
    mtg_2: string;
    network: string;
    priority: string;
    profile: string;
    referral_channel: FieldOption;
    referrer_id: string;
    sem_mt: string;
    sem_position: string;
    sem_sq: string;
    utm_campaign: string;
    utm_category: string;
    utm_content: string;
    utm_medium: string;
    utm_source: string;
    utm_term: string;
    zone: string;
    referral_channel_id: number;
}

export interface UserModel {
    company_id: string;
    default_outlet: string;
    deleted_at: string;
    drive_session_id: string;
    email: string;
    email_code: string;
    email_verification_token: string;
    email_verification_token_created_at: string;
    email_verified: boolean;
    first_name: string;
    middle_name: string;
    last_name: string;
    google_session_id: string;
    id: number;
    username: string;
    status?:string;
    role_id: number;
    type_id: number;
    reports_to: number;
    email_opt_out?: any;
    registration_ip?: any;
    website_language: string;
    website_language_id: number;
    recovery_question?: any;
    recovery_answer?: any;
    type_of_authentication: string;
    last_login_at?: any;
    created_at: Date;
    updated_at: Date;
}

export enum ftd_currency {
    EUR = 'EUR',
    USD = 'USD'
}

export interface FavoriteAccount {
    account_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    id: number;
}

