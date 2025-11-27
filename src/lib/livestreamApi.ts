import axiosClient from "./axiosClient";

const LivestreamApi = {
    CreateLivestream: () => axiosClient.post("/livestreams/create"),

    // Các API khác nếu có
    GetLivestreams: () => axiosClient.get("/livestreams"),
    GetLivestreamById: (id: string) => axiosClient.get(`/livestreams/${id}`),
    EndLivestream: (id: string) => axiosClient.post(`/livestreams/${id}/end`),
}

export default LivestreamApi;