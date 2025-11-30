'use client'

import { useAuth } from "@/context/AuthContext";
import VideoApi from "@/lib/videoApi";
import { EllipsisVertical, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThumbnailModal from "./ThumbnailModal";
import { useRouter } from "next/navigation";
import { Video } from "@/types/video";
import UserApi from "@/lib/userApi";
import { UserResponse } from "@/types/user";
import { timeAgo } from "@/utils/time";

export function VideoCard({videoId,layout,limit}:{videoId:string, layout: "horizontal" | "vertical",limit:boolean}){
    const {user} = useAuth()
    const [showSettingVideo, setShowSettingVideo] = useState(false)
    const [showThumbnailModal, setShowThumbnailModal] = useState(false)
    const [video,setVideo] = useState<Video>()
    const [thisUser, setThisUser] = useState<UserResponse>()
    const cardRef = useRef<HTMLDivElement>(null);
    const router = useRouter()

    useEffect(()=>{
        const fetchVideo = async() => {
            try{
                const response = await VideoApi.GetVideoById(videoId)
                setVideo(response.data)
                const resUser = await UserApi.GetUserById(response.data.userId)
                setThisUser(resUser.data.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchVideo()
    },[])

    useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowSettingVideo(false);
      }
    }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []); 

    const handlethumbnailClick = () => {
        router.push(`/watch/${videoId}`)
    }

    const handleDelete = async (e: React.FormEvent) => {
        if(!video) return
        const confirmed = window.confirm(`Are you sure you want to delete this video? ${video.title}`);
        if (!confirmed) return;

        try{
        console.log("data deleting")
        const response = VideoApi.DeleteVideo(videoId)
        console.log(response)

        window.location.reload()
        }catch(error){
        console.error('Error during login:', error);
        }finally{
        setShowSettingVideo(false)
        }
    }
    return(
        
        <div>
            {video && thisUser && 
                <div className ={`flex ${layout === "horizontal" ? "flex-row gap-3" : "flex-col gap-2"} cursor-pointer`}>
                    {/* thumbnail */}
                    <div onClick={()=>handlethumbnailClick()} className={`relative ${layout === "horizontal" ? "w-1/3 h-auto flex-shrink-0" : "h-1/2"
                        } overflow-hidden rounded-md aspect-video group`}>
                          <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105"
                              style={{ backgroundImage: `url(${video.thumbnailUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s" })` }}
                            ></div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    {/* Info */}
                    <div>
                        {layout === "horizontal" &&
                            <div className="flex flex-row gap-2 justify-between w-full">
                                <div className="flex flex-col gap-2">
                                    <span className={`font-bold ${!limit ? "text-xl" : "text-md"} line-clamp-2`}>{video.title}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{video.viewCount} views • {timeAgo(video.createdAt)}</span>
                                    <div className="flex flex-row gap-2 items-center">
                                      {!limit && 
                                        <div className="w-12 bg-cover bg-center aspect-square rounded-full flex-shrink-0"
                                          style={{ backgroundImage: `url(${thisUser.avatarUrl || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"})` }}/>
                                      }
                                      <span className="text-md line-clamp-1 text-neutral-500">{thisUser.name}</span>
                                    </div>
                                    {!limit && 
                                    <div className="text-md line-clamp-1 text-neutral-500 line-clamp-2">{video.description}</div>
                                    }
                                </div>

                                {(user && user.userId === thisUser.userId) && 
                                (<div className="relative">
                                    <EllipsisVertical onClick={()=>setShowSettingVideo(true)} size={20}/>
                                    {showSettingVideo && (
                                        <div className="absolute right-0 mt-2 bg-[#2f2f2f] shadow-lg rounded-md p-2 z-50" ref={cardRef}>
                                        <button onClick={()=>{setShowThumbnailModal(true)}} className="block px-4 py-2 text-left hover:text-[#838383] w-full whitespace-nowrap">
                                            Edit Thumbnail
                                        </button>
                                        <button onClick={handleDelete} className="block px-4 py-2 text-left hover:text-[#838383] w-full whitespace-nowrap">
                                            Delete
                                        </button>
                                        </div>
                                    )}
                                </div>)}
                            </div>
                        }
                        {/* */}
                        {layout === "vertical" &&
                            <div className="flex flex-row gap-2">
                                <div className="h-12 bg-cover bg-center aspect-square rounded-full flex-shrink-0"
                                    style={{ backgroundImage: `url(${thisUser.avatarUrl || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"})` }}/>

                                <div className="flex flex-col">
                                    <span className="font-bold text-xl line-clamp-2">{video.title}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{thisUser.name}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{video.viewCount} views • {timeAgo(video.createdAt)}</span>
                                </div>
                                {(user && user.userId === thisUser.userId) && 
                                (
                                <div className="relative ml-auto">
                                    <EllipsisVertical onClick={()=>setShowSettingVideo(true)} size={20}/>
                                    {showSettingVideo && (
                                        <div className="absolute right-0 mt-2 bg-[#2f2f2f] shadow-lg rounded-md p-2 z-50" ref={cardRef}>
                                        <button onClick={()=>{setShowThumbnailModal(true)}} className="block px-4 py-2 text-left hover:text-[#838383] w-full whitespace-nowrap">
                                            Edit Thumbnail
                                        </button>
                                        <button onClick={handleDelete} className="block px-4 py-2 text-left hover:text-[#838383] w-full whitespace-nowrap">
                                            Delete
                                        </button>
                                        </div>
                                    )}
                                </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            }
            <ThumbnailModal isOpen={showThumbnailModal} onClose={() => setShowThumbnailModal(false)} videoId={videoId} />
        </div>
    )
}