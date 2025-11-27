'use client'

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import VideoApi from "@/lib/videoApi";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
    videoId: string;
    likeCount: number;
}

export function LikeButton({ videoId, likeCount: initialLikeCount }: LikeButtonProps) {
    const { isAuthenticated } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkLikeStatus = async () => {
            if (!isAuthenticated || !videoId) return;

            try {
                const response = await VideoApi.GetLikeStatus(videoId);
                setIsLiked(response.data?.isLiked || response.data === true);
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        };

        checkLikeStatus();
    }, [videoId, isAuthenticated]);

    const handleLike = async () => {
        if (!isAuthenticated) {
            alert("Vui lòng đăng nhập để like video!");
            return;
        }

        if (isLoading) return;

        setIsLoading(true);

        try {
            await VideoApi.LikeVideo(videoId);

            if (isLiked) {
                // Unlike
                setLikeCount(prev => prev - 1);
                setIsLiked(false);
            } else {
                // Like
                setLikeCount(prev => prev + 1);
                setIsLiked(true);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={isLoading}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-full transition-all
                ${isLiked
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
        >
            <ThumbsUp
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
            />
            <span>{likeCount}</span>
        </button>
    );
}