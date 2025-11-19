import { ThumbsDown, ThumbsUp } from "lucide-react";

export function LikeButton({ videoId, likeCount }: { videoId: string, likeCount: number }) {
    return (
        <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 bg-[#D1D5DB]/20 text-white font-medium px-6 py-2 hover:bg-[#D1D5DB] rounded-l-full">
                <ThumbsUp className="w-[100%]" />
                <p className="font-bold text-xl">{likeCount}</p>
            </button>

            <button className="bg-[#D1D5DB]/20 text-white font-medium px-6 py-2 hover:bg-[#D1D5DB] rounded-r-full">
                <ThumbsDown className="w-[100%]" />
            </button>
        </div>
    )
}   