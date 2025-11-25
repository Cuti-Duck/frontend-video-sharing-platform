import { User, UserResponse } from "@/types/user";
import axiosClient from "./axiosClient";

const UserApi = {
    GetMe : async () => axiosClient.get("/users/me"),
    PostAvatar: async (data: FormData) => axiosClient.post("/users/avatar", data)
}

export default UserApi;