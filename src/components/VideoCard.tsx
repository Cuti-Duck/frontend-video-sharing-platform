'use client'
import { useAuth } from "@/context/AuthContext";
import VideoApi from "@/lib/videoApi";
import { Menu, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThumbnailModal from "./ThumbnailModal";
import { useRouter } from "next/navigation";


interface VideoCardProps {
  videoId: string;
  userId: string;
  thumbnailUrl:string;
  avatarUrl: string;
  title: string;
  userName: string;
  viewCount: number;
}

export function VideoCard({ videoId, userId, thumbnailUrl, avatarUrl, title, userName, viewCount }: VideoCardProps) {
  const {user, isLoading} = useAuth()
  const [showSettingVideo, setShowSettingVideo] = useState(false)
  const [showThumbnailModal, setShowThumbnailModal] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const handlethumbnailClick = () => {
    router.push(`/watch/${videoId}`)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowSettingVideo(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); 

  const handleDelete = async (e: React.FormEvent) => {
    const confirmed = window.confirm(`Are you sure you want to delete this video? ${title}`);
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

  return (
    <div className="group cursor-pointer block">
      <div onClick={() => handlethumbnailClick()}>
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}></div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
      </div>
      <div className="flex flex-row gap-2 mt-3">
        {avatarUrl && (
          <div>
            <div className="w-12 h-12 bg-cover bg-center aspect-square object-cover rounded-full"
            style={{ backgroundImage: `url(${avatarUrl})` }}></div>
          </div>)}
          
        <div>
          <h3 className="text-md font-bold line-clamp-1">{title}</h3>
          <h4 className="text-md mt-1">{userName}</h4>
          <h4 className="text-md">{viewCount} views</h4>
        </div>
        {(user?.userId === userId) && 
        (
          <div className="relative ml-auto">
            <Menu onClick={()=>setShowSettingVideo(true)} size={20}/>
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

      <ThumbnailModal isOpen={showThumbnailModal} onClose={() => setShowThumbnailModal(false)} videoId={videoId} />
    </div>
  );
}