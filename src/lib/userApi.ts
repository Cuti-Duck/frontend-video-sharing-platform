import { User, UserResponse } from "@/types/user";
import axiosClient from "./axiosClient";

const UserApi = {
    GetMe : async () => axiosClient.get("/users/me")
}

export default UserApi;