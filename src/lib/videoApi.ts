import { VideoInfo, VideoResponse } from "@/types/video";
import axiosClient from "./axiosClient";
import axios from "axios";

const VideoApi = {
    GetVideos: async () => axiosClient.get("/videos/all"),

    GetVideosTrending: async () => {
        const params = { limit: 20 }
        return axiosClient.get("/videos/trending", { params })
    },

    GetVideoById: async (id: string) => axiosClient.get(`/videos/${id}`),

    PostVideo: async (data: VideoInfo) => axiosClient.post<VideoResponse>("/videos/create", data),

    UploadVideo: async (uploadUrl: string, file: File, onProgress?: (ProgressEvent: any) => void) => {
        return axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': 'video/mp4',
            },
            onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                );
                console.log(`Upload progress: ${percent}%`);

                if (onProgress) {
                    onProgress(progressEvent);
                }
            }
        })
    },

    GetVideoByChannelId: async (channelId: string) => axiosClient.get(`/videos/channel/${channelId}`),

    PostVideoThumbnail: async (videoId: string, data: FormData) => axiosClient.post(`/videos/${videoId}/thumbnail`, data),

    DeleteVideo: async (videoId: string) => axiosClient.delete(`/videos/${videoId}`),
    LikeVideo: (videoId: string) => axiosClient.post(`/videos/${videoId}/like`),
    GetLikeStatus: (videoId: string) => axiosClient.get(`/videos/${videoId}/like/status`),
    GetLikedVideos: () => axiosClient.get("/videos/liked")

}

export default VideoApi;