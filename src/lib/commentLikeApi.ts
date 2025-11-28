import { CountCommentLike, LikeComment } from "@/types/commentLike"
import axiosClient from "./axiosClient"

const CommentLikeApi = {
    LikeComment: async(data: LikeComment) => axiosClient.post(`/videos/${data.videoId}/comments/${data.commentId}/like`),

    GetLikeCount: async(commentId: string) => axiosClient.get<CountCommentLike>(`/comments/${commentId}/likes/count`),

    GetLiked: async(videoId: string,commentId: string) => axiosClient.get(`/videos/${videoId}/comments/${commentId}/like/status`),
}
export default CommentLikeApi