import axiosClient from "./axiosClient"

const ViewApi = {
    PostView: async(videoId: string) => axiosClient.post(`/videos/${videoId}/views`),

    GetView: async(videoId: string) => axiosClient.get(`/videos/${videoId}/views`)
}
export default ViewApi