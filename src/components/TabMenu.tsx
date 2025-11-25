"use client";

import { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import { VideoItems } from "@/types/video";
import VideoApi from "@/lib/videoApi";

export default function TabMenu({userId, channelId}: {userId: string, channelId:string}) {
    const [Tab, setTab] = useState<'videos' | 'about'>('videos');
    const [videos, setVideos] = useState<VideoItems[]>([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true)
            try{
                console.log("getting video")
                const response = await VideoApi.getVideoByChannelId(channelId)
                setVideos(response.data)

                console.log("success",response)

            }catch(error){
                console.error("Error fetching videos:", error);
            }finally{
                setLoading(false)
            }
        }
        fetchVideos();
    }, [channelId]);

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <div className="flex flex-row gap-5 text-md text-gray-400 border-b border-gray-800 pb-2 mb-4">
                <button className={`hover:text-white ${Tab === "videos" ? "text-white": ""}`} onClick={() => setTab("videos")}>Video</button>
                <button className={`hover:text-white ${Tab === "about" ? "text-white": ""}`} onClick={() => setTab("about")}>About</button>
            </div>

            {Tab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Video content goes here */}
                    {videos.map((video) => (
                        <VideoCard
                            videoId={video.videoId}
                            thumbnailUrl={video.thumbnailUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s"}
                            title={video.title}
                            userName={""}
                            avatarUrl={""}
                            viewCount={video.viewCount}
                            key={video.videoId}
                        />
                    ))}
                </div>
            )}

            {Tab === 'about' && (
                <div>
                    {/* About content goes here */}
                    <p>About Content</p>
                </div>
            )}
        </div>
    )
}