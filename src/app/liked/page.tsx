'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { VideoCard } from "@/components/VideoCard";
import VideoApi from "@/lib/videoApi";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";

interface LikedVideo {
    videoId: string;
    title: string;
    thumbnailUrl: string | null;
    likedAt: string;
    likeCount: number;
    viewCount: number;
    channelName: string;
    userId?: string;
}

export default function LikedVideosPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [likedVideos, setLikedVideos] = useState<LikedVideo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            if (!isAuthenticated) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await VideoApi.GetLikedVideos();
                const data = response.data;

                setLikedVideos(data.videos || []);
                setTotalCount(data.totalCount || 0);
            } catch (err) {
                console.error("Error fetching liked videos:", err);
                setError("Không thể tải danh sách video đã thích");
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading) {
            fetchLikedVideos();
        }
    }, [isAuthenticated, authLoading]);

    // Loading state
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-black p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <ThumbsUp className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold text-white">Video đã thích</h1>
                    </div>
                    <div className="flex justify-center py-20">
                        <span className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    </div>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <ThumbsUp className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold text-white">Video đã thích</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20">
                        <ThumbsUp className="w-20 h-20 text-gray-600 mb-4" />
                        <p className="text-gray-400 text-lg mb-4">Đăng nhập để xem video đã thích</p>
                        <Link
                            href="/auth/login"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-black p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <ThumbsUp className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold text-white">Video đã thích</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-red-500 text-lg">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Empty state
    if (likedVideos.length === 0) {
        return (
            <div className="min-h-screen bg-black p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <ThumbsUp className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold text-white">Video đã thích</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20">
                        <ThumbsUp className="w-20 h-20 text-gray-600 mb-4" />
                        <p className="text-gray-400 text-lg mb-2">Chưa có video đã thích</p>
                        <p className="text-gray-500 text-sm">Hãy like video để thêm vào danh sách này</p>
                    </div>
                </div>
            </div>
        );
    }

    // Success state with videos
    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <ThumbsUp className="w-8 h-8 text-blue-500" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">Video đã thích</h1>
                            <p className="text-gray-400 text-sm">{totalCount} video</p>
                        </div>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {likedVideos.map((video) => (
                        <VideoCard
                            key={video.videoId}
                            videoId={video.videoId}
                            userId={video.userId || ""}
                            thumbnailUrl={video.thumbnailUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s"}
                            title={video.title}
                            userName={video.channelName}
                            avatarUrl=""
                            viewCount={video.viewCount}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}