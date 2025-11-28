import { CommentVideoForm, PostCommentForm } from "@/types/comment"
import axiosClient from "./axiosClient"


const CommentApi = {
    GetComments:  async(data: CommentVideoForm) => {
        const params: Record<string, string | number | boolean | undefined> = {
            sortBy: data.sortBy || undefined,
            limit: data.limit,
            offset: data.offset,
            includeReplies: data.includeReplies,
            parentCommentId: data.parentCommentId || undefined
        };
        return axiosClient.get(`/videos/${data.videoId}/comments`,{ params })
    },

    PostComment: async(videoId: string, data:PostCommentForm) => axiosClient.post(`/videos/${videoId}/comments`,data),

    PutComment: async(videoId: string, commentId:string, content: string) => axiosClient.put(`/videos/${videoId}/comments/${commentId}`,{content}),

    DeleteComment: async(videoId: string, commentId:string) => axiosClient.delete(`/videos/${videoId}/comments/${commentId}`)
}
export default CommentApi