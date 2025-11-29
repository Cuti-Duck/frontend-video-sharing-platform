'use client'

import VideoApi from "@/lib/videoApi"
import { VideoItems } from "@/types/video"
import { useEffect, useState } from "react"
import { VideoCard } from "./VideoCard"

export function MainVideoFrame() {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await VideoApi.GetVideosTrending()
            setVideos(response.data)
        }
        fetchVideos()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video: VideoItems) => (
            <VideoCard key={video.videoId} videoId={video.videoId} layout="vertical" limit={false}/>
        ))}
        </div>        
    )
}