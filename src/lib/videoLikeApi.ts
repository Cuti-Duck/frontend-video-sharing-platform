import axiosClient from "./axiosClient";
import { VideoLike } from "@/types/videolike";

const LikeApi = {
    Like: async(videoId: string) => axiosClient.post(`/videos/${videoId}/like`),

    GetLikeVideo: async(videoId: string) => axiosClient.get<VideoLike>(`/videos/${videoId}/like/status`),

    GetVideoLiked: async() => axiosClient.get(`/videos/liked`)
}

export default LikeApi