import { SigninParams, SiginResponse } from "../models/Auth";
import { POST } from "./methods";

async function signin(payload: SigninParams) {
  const result = await POST<SigninParams, SiginResponse>({ payload, endpoint: "auth/login" })
  return {
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
  }
}

export { signin };
