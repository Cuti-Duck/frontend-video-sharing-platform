import axiosClient from "./axiosClient";

const VideoApi = {
    GetVideos: async () => axiosClient.get("/videos/all"),
    GetVideoById: async (id: string) => axiosClient.get(`/videos/${id}`),
}