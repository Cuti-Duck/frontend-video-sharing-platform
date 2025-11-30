'use client'

import VideoApi from "@/lib/videoApi"
import { VideoItems } from "@/types/video"
import { useEffect, useState } from "react"
import { VideoCard } from "./VideoCard"
import ChannelApi from "@/lib/channelApi"
import { ChannelResponse } from "@/types/channel"
import { LiveStreamCard } from "./LiveStreamCard"

export function MainVideoFrame() {
    const [videos, setVideos] = useState([])
    const [channels, setChannels] = useState<ChannelResponse[]>([])

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await VideoApi.GetVideosTrending()
            setVideos(response.data)
            const resChannel = await ChannelApi.GetAllChannel()
            setChannels(resChannel.data)
        }
        fetchVideos()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels
            .filter((channel: ChannelResponse) => channel.isLive)
            .sort((a: ChannelResponse, b: ChannelResponse) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((channel: ChannelResponse) => (
                <LiveStreamCard key={channel.channelId} channel={channel} layout="vertical" limit={false}/>
            ))}
            
            {videos.map((video: VideoItems) => (
                <VideoCard key={video.videoId} videoId={video.videoId} layout="vertical" limit={false}/>
            ))}
            
        </div>        
    )
}