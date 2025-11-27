'use client'

import { Comment } from "@/types/comment"
import { ChevronDown, ChevronUp, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"

export function CommentCard( {comment}: {comment:Comment} ) {
    const [comments, setComments] = useState<Comment[]>([])
    const [showReplies, setShowReplies] = useState(false)

    useEffect(()=>{
        if(comment.replies){
            setComments(comment.replies)
        }
    },[])

    const handleLikeComment = async() => {
        try{
            console.log("like comment")
        }catch(error){
            console.log(error)
        }
    }

    const handleSendComment = async() => {
        try{
            console.log("send comment")
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="flex flex-row w-full gap-2">
            <div className="w-10 h-10 rounded-full bg-center bg-cover" 
                style={{backgroundImage: `url(${comment.userAvatarUrl})` }}/>
            <div className=" flex flex-col w-full">
                <div className="flex items-center gap-3">
                    <span className="text-md">{comment.userName}</span>
                    <span className="text-sm text-[#838383]"> {comment.createdAt}</span>
                </div>
                
                <div className="mt-1 text-[15px] leading-snug">
                    <span>{comment.content}</span>
                </div>

                <div className="flex items-center gap-4 mt-2 text-[#838383]">
                    <button className="flex items-center gap-1 hover:text-white transition">
                        <ThumbsUp className="w-5 h-5" />
                    </button>
                    {comment.likeCount > 0 && <span>{comment.likeCount}</span>}                    
                </div>

                {(comments && comments.length > 0) &&
                    <div>
                        <button onClick={()=> setShowReplies(!showReplies)} className="flex items-center mt-1 text-sm text-gray-400 hover:text-gray-600 transition">
                            {showReplies ? (
                                <ChevronUp/>
                            ):(
                                <ChevronDown/>
                            )} Replies
                        </button>
                        { (showReplies) && (
                            <div>
                                {comments.map((comment: Comment)=>(
                                    <CommentCard key={comment.commentId} comment={comment}/>
                                ))}
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}