import { SigninPayload, SigninResponse } from "@/@types/repositories/auth";
import { http } from "@/utils/http";

export const AuthRepository = {
  Signin: async (body: SigninPayload) =>
    http.post<SigninResponse>("/authentication", body),
};
