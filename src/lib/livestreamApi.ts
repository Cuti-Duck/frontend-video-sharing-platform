import axiosClient from "./axiosClient";

interface CreateLivestreamData {
    title: string;
    description?: string;
}

const LivestreamApi = {
    CreateLivestream: (data?: CreateLivestreamData) =>
        axiosClient.post("/livestreams/create", data),

    // Các API khác nếu có
    GetLivestreams: () => axiosClient.get("/livestreams"),
    GetLivestreamById: (id: string) => axiosClient.get(`/livestreams/${id}`),
    EndLivestream: (id: string) => axiosClient.post(`/livestreams/${id}/end`),
}

export default LivestreamApi;