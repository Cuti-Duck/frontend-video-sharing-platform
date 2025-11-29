import axiosClient from "./axiosClient";

interface CreateLivestreamData {
    title: string;
    description?: string;
}

const LivestreamApi = {
    CreateLivestream: (data?: CreateLivestreamData) =>
        axiosClient.post("/livestreams/create", data),

    GetMyLivestream: () => axiosClient.get("/livestreams/my-channel"),
}

export default LivestreamApi;