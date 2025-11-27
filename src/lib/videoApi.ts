import { VideoInfo, VideoResponse } from "@/types/video";
import axiosClient from "./axiosClient";
import axios from "axios";

const VideoApi = {
    GetVideos: async () => axiosClient.get("/videos/all"),

    GetVideoById: async (id: string) => axiosClient.get(`/videos/${id}`),

    PostVideo: async (data: VideoInfo) => axiosClient.post<VideoResponse>("/videos/create", data),

    UploadVideo: async (uploadUrl: string, file: File) => {
        return axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': 'video/mp4',
            },
            onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                );
                console.log(`Upload progress: ${percent}%`);
            }
        })
    },

    GetVideoByChannelId: async (channelId: string) => axiosClient.get(`/videos/channel/${channelId}`),

    PostVideoThumbnail: async (videoId: string, data: FormData) => axiosClient.post(`/videos/${videoId}/thumbnail`, data),

    DeleteVideo: async (videoId: string) => axiosClient.delete(`/videos/${videoId}`),
    LikeVideo: (videoId: string) => axiosClient.post(`/videos/${videoId}/like`),
    GetLikeStatus: (videoId: string) => axiosClient.get(`/videos/${videoId}/like/status`)

}

export default VideoApi;