"use client";

import { getUserById, getVideosByUserId} from "@/lib/mockData";
import { useState } from "react";
import { VideoCard } from "./VideoCard";

export default function TabMenu({userId}: {userId?: string}) {
    const [Tab, setTab] = useState<'videos' | 'about'>('videos');

    return (
        <div>
            <div className="flex flex-row gap-5 text-md text-gray-400 border-b border-gray-800 pb-2 mb-4">
                <button className={`hover:text-white ${Tab === "videos" ? "text-white": ""}`} onClick={() => setTab("videos")}>Video</button>
                <button className={`hover:text-white ${Tab === "about" ? "text-white": ""}`} onClick={() => setTab("about")}>About</button>
            </div>

            {Tab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Video content goes here */}
                    {getVideosByUserId(userId || "").map((video) => (
                      <VideoCard 
                                  videoId={video.videoId}
                                  thumbnailUrl={video.thumbnailUrl}
                                  title={video.title}
                                  userName={getUserById(video.userId)?.name || "Unknown"}
                                  avatarUrl={getUserById(video.userId)?.avatarUrl || "/default-avatar.png"}
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