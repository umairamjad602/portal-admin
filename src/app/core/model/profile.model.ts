
export interface Overview {
  client_id: number;
  left_referrals: number;
  right_referrals: number;
  total_deposits: number;
  total_withdrawals: number;
  referral_income: number;
  balance: number;
  total_users: number;
  ib_wallet: number;
  roi_wallet: number;
  etrade_wallet: number;
}

export interface ShortProfile {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  unkow: string;
}

export interface Profile {
  id: number;
  type: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  user_name: string;
  password: string;
  confirm_password: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  city: string;
  zip: string;
  referrals_activation: boolean;
  referrals_issued: string;
  referrals_joined: string;
  referrals_expired: string;
  left_joined_referrals: string;
  right_joined_referrals: string;
  country: string;
  balance: number;
  is_signup_fee_paid: string;
  total_deposits: number;
  total_withdrawals: number;
  last_deposit_amount: number;
  last_withdrawal_amount: number;
  network_id: string;
  referral_id: number;
  belongd_to: number;
  last_deposit_on: string;
  last_withdrawal_on: string;
  network: Peer[];
  overview: Overview;
  roi_rate: number;
  daily_roi: number;
  is_daily_roi_enabled: boolean;
  daily_roi_credited_on: string;
  daily_roi_last_income: number;
}

export interface Client {
  profile: Profile;
}

export interface Peer {
  id: number;
  direction: string;
  client_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  balance: number;
  total_deposits: number;
  total_withdrawals: number;
  network: Peer[];
  created_at: string;
}


export interface Registration {
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  email: string;
  referral: string;
}
export interface InternalServerError {
    message: string;
    email: string;
    log_id:string;
  }

export interface ReferralIncome {
  client_id: number;
  first_name: string;
  last_name: string;
  depositor_id: number;
  amount_deposited: number;
  commission_percentage: number;
  income: number;
  direction: string;
  created_at: string;
  updated_at: string;
}

export interface BinaryIncome {
  client_id: number;
  right_balance: number;
  left_balance: number;
  balanced_amount: number;
  percentage: number;
  income: number;
  created_at: string;
  updated_at: string;
}


export interface TestObject {
  first: 1;
  second: 2;
}
