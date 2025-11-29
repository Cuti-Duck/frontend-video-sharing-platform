import { ChannelResponse } from "@/types/channel"
import axiosClient from "./axiosClient"

const ChannelApi = {
    GetChannelById: async(channelId: string) => axiosClient.get(`/channels/${channelId}`),

    GetAllChannel: async() => axiosClient.get<ChannelResponse[]>(`/channels/getall`),

    PutDescription: async(description: string) => axiosClient.put(`/channels/update-description`,{description})
}
export default ChannelApi