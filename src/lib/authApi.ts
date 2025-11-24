import { Login, LoginResponse, Register, RegisterResponse, VerifyEmail } from "@/types/auth";
import axiosClient from "./axiosClient";

const AuthApi = {
    Register: (data: Register) => axiosClient.post<RegisterResponse>("/auths/register", data),
    VerifyEmail: (data: VerifyEmail) => axiosClient.post("/auths/confirm", data),
    Login: (data: Login) => axiosClient.post<LoginResponse>("/auths/login", data),
}

export default AuthApi;