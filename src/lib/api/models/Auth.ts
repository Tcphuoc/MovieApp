export interface SigninParams {
  account: string,
  password: string
}

export interface SiginResponse {
  access_token: string,
  refresh_token: string
}
