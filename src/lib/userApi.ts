import { User, UserProfile, UserResponse } from "@/types/user";
import axiosClient from "./axiosClient";

const UserApi = {
    GetMe : async () => axiosClient.get("/users/me"),
    PostAvatar: async (data: FormData) => axiosClient.post("/users/avatar", data),
    PutProfile: async (data: UserProfile) => axiosClient.put("/users/update-profile", data)
}

export default UserApi;