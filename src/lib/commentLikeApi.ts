import { CountCommentLike, LikeComment } from "@/types/commentLike"
import axiosClient from "./axiosClient"

const CommentApi = {
    LikeComment: async(data: LikeComment) => axiosClient.post(`/videos/${data.videoId}/comments/${data.commentId}/like`),

    GetLikeCount: async(commentId: string) => axiosClient.get<CountCommentLike>(`/comments/${commentId}/likes/count`)
}
export default CommentApi