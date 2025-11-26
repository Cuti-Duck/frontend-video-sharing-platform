'use client'
import { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import { VideoItems } from "@/types/video";
import VideoApi from "@/lib/videoApi";
import UserApi from "@/lib/userApi";
import { UserResponse } from "@/types/user";

interface TabMenuProps {
    userId: string;
}

export default function TabMenu({userId}: TabMenuProps) {
    const [Tab, setTab] = useState<'videos' | 'about'>('videos');
    const [user, setUser] = useState<UserResponse>();
    const [videos, setVideos] = useState<VideoItems[]>([]);
    const [isGetting, setGetting] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setGetting(true)
                const response = await UserApi.GetUserById(userId);
                setUser(response.data.data)
                const resVideo = await VideoApi.GetVideoByChannelId(response.data.data.channelId)
                setVideos(resVideo.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }finally{
                setGetting(false)
            }
        };
        fetchVideos();
    }, [userId])

    if(isGetting) return <div>Loading...</div>

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
                            userId={userId}
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