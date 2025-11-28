'use client'
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoCardProps {
  videoId: string; 
  thumbnailUrl: string; 
  title: string; 
  userName: string; 
  viewCount: number;
  uploadAt: string;
}

export function SmallVideoCard({ videoId, thumbnailUrl, title, userName, viewCount, uploadAt}: VideoCardProps) {
  const router = useRouter();
  const handleThumbnailClick = () => {
    router.push(`/watch/${videoId}`)
  }

  return (
    <div onClick={()=>handleThumbnailClick()} className="flex gap-3 mb-3 group w-full">
      <div className="relative w-1/2 h-auto aspect-video rounded overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}>

        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
          <Play className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-start">
        <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
        <h4 className="text-xs text-gray-600 mt-1">{userName}</h4>
        <h4 className="text-xs text-gray-500 truncate">{viewCount} views • {uploadAt}</h4>
      </div>
    </div>
  );
}