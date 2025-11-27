'use client'
import { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import { VideoItems } from "@/types/video";
import { SubscribedChannel } from "@/types/subscription";
import VideoApi from "@/lib/videoApi";
import UserApi from "@/lib/userApi";
import SubscriptionApi from "@/lib/subscriptionApi";
import { UserResponse } from "@/types/user";
import { useAuth } from "@/context/AuthContext";

interface TabMenuProps {
    userId: string;
}

export default function TabMenu({ userId }: TabMenuProps) {
    const { user: currentUser } = useAuth(); // Lấy user đang đăng nhập
    const [Tab, setTab] = useState<'videos' | 'about' | 'subVideos'>('videos');
    const [user, setUser] = useState<UserResponse>();
    const [videos, setVideos] = useState<VideoItems[]>([]);
    const [subscribedVideos, setSubscribedVideos] = useState<VideoItems[]>([]);
    const [isGetting, setGetting] = useState(false);
    const [loadingSub, setLoadingSub] = useState(false);

    const isOwnProfile = currentUser?.userId === userId;

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
            } finally {
                setGetting(false)
            }
        };
        fetchVideos();
    }, [userId])

    useEffect(() => {
        const fetchSubscribedVideos = async () => {
            if (Tab === "subVideos" && isOwnProfile) {
                setLoadingSub(true);
                try {
                    const response = await SubscriptionApi.MySubscribedchannel();
                    const channels: SubscribedChannel[] = response.data?.channels || [];

                    if (channels.length > 0) {
                        const allVideos: VideoItems[] = [];

                        for (const channel of channels) {
                            try {
                                const videoResponse = await VideoApi.GetVideoByChannelId(channel.channelId);
                                const channelVideos = videoResponse.data || [];
                                const videosWithChannel = channelVideos.map((v: VideoItems) => ({
                                    ...v,
                                    channelName: channel.channelName,
                                }));
                                allVideos.push(...videosWithChannel);
                            } catch (error) {
                                console.error(`Error fetching videos for channel ${channel.channelId}:`, error);
                            }
                        }

                        // Sort theo ngày mới nhất
                        allVideos.sort((a, b) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        );

                        setSubscribedVideos(allVideos);
                    }
                } catch (error) {
                    console.error("Error fetching subscribed channels:", error);
                } finally {
                    setLoadingSub(false);
                }
            }
        };

        fetchSubscribedVideos();
    }, [Tab, isOwnProfile]);

    if (isGetting) return <div>Loading...</div>

    return (
        <div>
            <div className="flex flex-row gap-5 text-md text-gray-400 border-b border-gray-800 pb-2 mb-4">
                <button className={`hover:text-white ${Tab === "videos" ? "text-white" : ""}`} onClick={() => setTab("videos")}>Video</button>

                {isOwnProfile && (
                    <button className={`hover:text-white ${Tab === "subVideos" ? "text-white" : ""}`} onClick={() => setTab("subVideos")}>Subscribed Channel</button>
                )}

                <button className={`hover:text-white ${Tab === "about" ? "text-white" : ""}`} onClick={() => setTab("about")}>About</button>
            </div>

            {Tab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            {Tab === 'subVideos' && isOwnProfile && (
                <div>
                    {loadingSub ? (
                        <div className="flex justify-center py-10">
                            <span className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        </div>
                    ) : subscribedVideos.length === 0 ? (
                        <div className="text-center text-gray-400 py-10">
                            <p>📹 Chưa có video từ kênh đăng ký</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {subscribedVideos.map((video) => (
                                <VideoCard
                                    key={video.videoId}
                                    videoId={video.videoId}
                                    userId={video.userId}
                                    thumbnailUrl={video.thumbnailUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s"}
                                    title={video.title}
                                    userName={video.channelName || ""}
                                    avatarUrl={""}
                                    viewCount={video.viewCount}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {Tab === 'about' && (
                <div>
                    <p>About Content</p>
                </div>
            )}
        </div>
    )
}