'use client'

import { useAuth } from "@/context/AuthContext"
import CommentApi from "@/lib/commentApi";
import { Comment, CommentVideoForm, PostCommentForm } from "@/types/comment";
import { ArrowDownNarrowWide } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { CommentCard } from "./CommentCard";
import { TextAreaComment } from "./TextAreaComment";


export function CommentFrame({videoId} : {videoId:string}) {
    const [totalComment,setTotalComment] = useState(0)
    const [comments,setComments] = useState<Comment[]>([])
    const [showSort, setShowSort] = useState(false)
    const [sort,setSort] = useState<"recent"|"oldest"|"popular">("recent")
    const [newComment, setNewComment] = useState("")
    const { user } = useAuth()
    const menuRef = useRef(null);

    useEffect(()=>{
        fetchCommentVideo();
    }, [])

    const fetchCommentVideo = async() => {
        try{
            const data: CommentVideoForm = {
                videoId: videoId,
                sortBy: sort,
                limit: 20,
                offset: 0,
                includeReplies: false,
                parentCommentId: undefined
            }
            const response = await CommentApi.GetComments(data)
            setTotalComment(response.data.rootCommentsCount)
            setComments(response.data.comments)
        }catch(error){
            console.log(error)
        }finally{

        }
    }

    const handleSendComment = async() => {
        if(!user) {alert("Please login to comment"); return}
        try{
            const data: PostCommentForm = {
                content: newComment,
                parentCommentId: ""
            }
            const response = await CommentApi.PostComment(videoId, data)
            console.log(response)
            setNewComment("")
            fetchCommentVideo()

        }catch(error){
            console.log(error)
        }
    }

    const handleSortComment = async(sortType: "recent"|"oldest"|"popular") => {
        try{
            const data: CommentVideoForm = {
                    videoId: videoId,
                    sortBy: sortType,
                    limit: 20,
                    offset: 0,
                    includeReplies: false,
                    parentCommentId: undefined
                }
                const response = await CommentApi.GetComments(data)
                setTotalComment(response.data.rootCommentsCount)
                setComments(response.data.comments)
                setSort(sortType)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="flex flex-col gap-5">
            {/*total comment*/}
            <div className="flex flex-row gap-4 items-center">
                <span className="font-bold text-2xl">{totalComment} Comments</span>
                <div onClick={()=> setShowSort(!showSort)} className="flex relative">
                    <ArrowDownNarrowWide/>
                    <span className="text-xl">sort by</span>
                    {showSort && 
                    <div className="absolute top-full shadow-lg flex flex-col gap-2 bg-[#2f2f2f]" ref={menuRef}>
                        <button onClick={()=> handleSortComment("recent")} className="text-xl hover:bg-[#838383]">Recent</button>
                        <button onClick={()=> handleSortComment("oldest")} className="text-xl hover:bg-[#838383]">Oldest</button>
                        <button onClick={()=> handleSortComment("popular")} className="text-xl hover:bg-[#838383]">Popular</button>
                    </div>
                    }
                </div>
                
            </div>
            {/*input comment*/}
            <div className="flex flex-row gap-5 items-top   ">
                {user && <div className="w-10 h-10 rounded-full bg-center bg-cover" 
                    style={{ backgroundImage: `url(${user.avatarUrl})` }}/>}
                <div className="flex-1">
                    <TextAreaComment value={newComment} setValue={setNewComment} handle={handleSendComment} />
                </div>
            </div>
            {/*comment*/}           
            <div>
                {comments && comments.map((comment: Comment)=>(
                    <CommentCard key={comment.commentId} comment={comment} fetchComment={()=>fetchCommentVideo()}/>
                ))}
            </div>
        </div>
    )
}   