import { SigninPayload, SigninResponse } from "@/@types/auth-repository";
import { http } from "@/utils/http";

export const AuthRepository = {
  Signin: async (body: SigninPayload) => {
    const response = await http.post<SigninResponse>('/authentication', body);

    return response.data;
  }
}