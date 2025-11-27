'use client'
import LikeApi from "@/lib/videoLikeApi";
import { ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";

export function LikeButton({ videoId, likeCount}: { videoId: string, likeCount: number}) {
    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState(likeCount);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchLikeStatus = async () => {
            try{
                const response = await LikeApi.GetLikeVideo(videoId)

                setIsLiked(response.data.isLiked)

            }catch(error){
                console.log(error)
            }
        }
        fetchLikeStatus();
    },[])

    const handleLike = async () => {
        try{
            const response = LikeApi.Like(videoId)
            console.log("click like",response)
            setIsLiked(!isLiked)
            setLike(isLiked ? like - 1 : like + 1)
        }catch(error){
            console.log("need login",error)
        }
    }

    return (
        <div className="flex items-center gap-1">
            <button onClick={handleLike} className="flex items-center gap-3 bg-[#D1D5DB]/20 text-white font-medium px-6 py-2 hover:bg-[#838383] rounded-full">
                
                {(isLiked) ? (
                    <ThumbsUp fill="white" className="w-full" />
                ) : (
                    <ThumbsUp className="w-full" />
                )}
                <p className="font-bold text-md">{like}</p>
            </button>
        </div>
    )
}   