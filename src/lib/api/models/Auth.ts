export interface SigninParams {
  account: string;
  password: string;
}

export interface SiginResponse {
  access_token: string;
  refresh_token: string;
}

export interface SignupParams {
  first_name: string;
  last_name: string;
  account: string;
  password: string;
  password_confirmation: string;
}

export type SignupResponse = unknown;
