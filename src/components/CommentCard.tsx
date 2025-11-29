'use client'

import { useAuth } from "@/context/AuthContext"
import { Comment, CommentVideoForm, PostCommentForm } from "@/types/comment"
import { ChevronDown, ChevronUp, EllipsisVertical, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"
import { TextAreaComment } from "./TextAreaComment"
import CommentApi from "@/lib/commentApi"
import CommentLikeApi from "@/lib/commentLikeApi"
import { timeAgo } from "@/utils/time"
import { UserResponse } from "@/types/user"
import UserApi from "@/lib/userApi"

export function CommentCard( {comment, fetchComment}: {comment:Comment, fetchComment: ()=> void} ) {
    const { user } = useAuth()
    const [comments, setComments] = useState<Comment[]>(comment.replies||[])
    const [thisUser, setThisUser] = useState<UserResponse>()
    const [showReplies, setShowReplies] = useState(false)
    const [showAction, setShowAction] = useState<"menu"|"edit"|"reply"|"none">("none")
    const [editComment, setEditComment] = useState(comment.content)
    const [content,setContent] = useState(comment.content)
    const [repliesCount,setRepliesCount] = useState(comment.replyCount)
    const [newComment,setNewComment] = useState("")
    const [likeCount,setLikeCount] = useState(comment.likeCount)
    const [liked,setLiked] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const fetchUser = async() => {
            setLoading(true)
            try{
                const response = await UserApi.GetUserById(comment.userId)
                setThisUser(response.data.data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
        handleLiked()
    },[])

    const handleLiked = async() => {
            if(!user) return
            try{
                const response = await CommentLikeApi.GetLiked(comment.videoId,comment.commentId) 
                const data = response.data.liked 
                setLiked(data)
                console.log("liked", response)
            }catch(error){
                console.log(error)
            }
        }

    const fetchCommentReplies = async() => {
        try{
            const data: CommentVideoForm = {
                videoId: comment.videoId,
                sortBy: "recent",
                limit: 5,
                offset: 0,
                includeReplies: false,
                parentCommentId: comment.commentId
            }
            const response = await CommentApi.GetComments(data)
            
            console.log("comment",response)
            setComments(response.data.comments)

        }catch(error){
            console.log(error)
        }
    }

    const handleShowReplies = async() => {
        const temp = !showReplies
        setShowReplies(temp)
        if(temp){
            console.log("show reply")
            fetchCommentReplies()
        }
    }

    const handleLikeComment = async() => {
        if(!user) {alert("Please login to comment"); return}
        try{
            const data = {
                videoId: comment.videoId,
                commentId: comment.commentId
            }
            const response = await CommentLikeApi.LikeComment(data)
            console.log("like",response)
            setLiked(response.data.liked)
            setLikeCount(response.data.likeCount)

        }catch(error){
            console.log(error)
        }
    }

    const handleSendComment = async() => {
        if(!user) {alert("Please login to comment"); return}
        try{
            const data: PostCommentForm = {
                content: newComment,
                parentCommentId: comment.commentId
            }
            const response = await CommentApi.PostComment(comment.videoId, data)
            setNewComment("")
            setShowAction("none")
            setRepliesCount(repliesCount+1)
            fetchCommentReplies()
            console.log("send comment", response)
        }catch(error){
            console.log(error)
        }
    }

    const handleEditComment = async() => {
        if(!user) {alert("Please login to comment"); return}
        try{
            const response = await CommentApi.PutComment(comment.videoId,comment.commentId,editComment)
            setContent(editComment)
            setEditComment("")
            setShowAction("none")
            fetchComment()
            console.log("edit comment",response)
        }catch(error){
            console.log(error)
        }
    }

    const handleDeleteComment = async() => {
        if(!user) {alert("Please login to comment"); return}

        const confirmed = window.confirm("Are you sure you want to delete this comment?");
        if(!confirmed) return;
        try{
            const response = await CommentApi.DeleteComment(comment.videoId, comment.commentId)
            console.log("delete comment", response)
            fetchComment()
        }catch(error){
            console.log(error)
        }
    }

    const toggle = (type: "menu"|"edit"|"reply"|"none") => {
        if(type === "menu"){
            if(showAction === "menu" || showAction==="edit"){
                setShowAction("none")
            }else{
                setShowAction("menu")
            }
        }
        if(type === "edit"){
            setShowAction("edit")
        }
        if(type === "reply"){
            if(showAction === "reply"){
                setShowAction("none")
            }else{
                setShowAction("reply")
            }
        }
    }
    if(loading){return <div>Loading...</div>}
    if(!thisUser){return <div></div>}
    return(
        <div className="flex flex-col">
            <div className="flex flex-row w-full gap-2">
                {/*avatar*/}
                <div className="w-10 h-10 rounded-full bg-center bg-cover" 
                    style={{backgroundImage: `url(${thisUser.avatarUrl})` }}/>
                {/*content*/}
                <div className=" flex flex-col w-full">
                    {/*Name CreatAt*/}
                    <div className="flex items-center gap-3">
                        <span className="text-md">{thisUser.name}</span>
                        <span className="text-sm text-[#838383]"> {timeAgo(comment.createdAt)}</span>
                    </div>
                    {/*Content*/}
                    <div className="mt-1 text-[15px] leading-snug">      
                            <span>{content}</span>
                    </div>
                    {/*Like*/}
                    <div className="flex items-center gap-4 mt-2 text-[#838383]">
                        <button onClick={()=>handleLikeComment()} className="flex items-center gap-1 hover:text-white transition">
                            {liked ? (
                                <ThumbsUp className="w-5 h-5 fill-white" />
                            ):(
                                <ThumbsUp className="w-5 h-5" />
                            )}
                        </button>
                        {likeCount > 0 && <span>{likeCount}</span>}

                        <button onClick={()=>toggle("reply")}>Reply</button>                    
                    </div>
                    {/*Show Replies*/}
                    {(repliesCount > 0) &&
                        <div>
                            <button onClick={()=> handleShowReplies()} className="flex items-center mt-1 text-sm text-gray-400 hover:text-gray-600 transition">
                                {showReplies===true ? (
                                    <ChevronUp/>
                                ):(
                                    <ChevronDown/>
                                )} Replies
                            </button>
                            { showReplies===true && (
                                <div>
                                    {
                                    comments.map((comment: Comment)=>(
                                        <CommentCard key={comment.commentId} comment={comment} fetchComment={()=>fetchCommentReplies()}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    }
                </div>

                {(user && user.userId === thisUser.userId) &&
                    <div className="flex flex-col gap-2 rounded items-end">
                        <button onClick={()=> toggle("menu")} className="rounded transition">
                            <EllipsisVertical/>
                        </button>
                        
                        {showAction===("menu") &&
                            <div className="flex flex-col bg-neutral-800 rounded p-2 gap-1 transition-all">
                                <button onClick={()=>toggle("edit")} className=" text-left px-4 py-2 hover:bg-neutral-700">
                                    Edit
                                </button>
                                <button onClick={()=>handleDeleteComment()} className=" text-left px-4 py-2 hover:bg-neutral-700">
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
            {showAction==="edit" &&
                <div className="flex-1">
                    <TextAreaComment value={editComment} setValue={setEditComment} handle={handleEditComment} />
                </div>
            }
            {showAction==="reply" &&
                <div className="flex-1">
                    <TextAreaComment value={newComment} setValue={setNewComment} handle={handleSendComment} />
                </div>
            }

        </div>
    )
}