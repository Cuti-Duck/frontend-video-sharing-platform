import { Play } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  videoId: string; 
  thumbnailUrl: string; 
  title: string; 
  userName: string; 
  viewCount: number;
  uploadAt: string;
}

export function SmallVideoCard({ videoId, thumbnailUrl, title, userName, viewCount, uploadAt }: VideoCardProps) {
  return (
    <Link href={`/watch/${videoId}`} className="flex gap-2 mb-3">
      <div className="w-[50%] aspect-video bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <img 
          src={thumbnailUrl}
          alt={title}
          className="w-full object-cover transition-transform"
        />
        <div className="bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-6 h-6 text-white" />
        </div>
      </div>  
      <div className="flex-1">
        <h3 className="font-bold line-clamp-2 text-lg">{title}</h3>
        <p className="text-md text-gray-600 mt-1">{userName}</p>
        <p className="text-md text-gray-500">{viewCount} views • {uploadAt}</p>
      </div>
    </Link>
  );
}