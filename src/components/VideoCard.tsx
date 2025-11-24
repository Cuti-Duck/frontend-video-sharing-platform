import { Play } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  videoId: string;
  thumbnailUrl:string;
  avatarUrl: string;
  title: string;
  userName: string;
  viewCount: number;
}

export function VideoCard({ videoId, thumbnailUrl, avatarUrl, title, userName, viewCount }: VideoCardProps) {
  return (
    <Link href={`/watch/${videoId}`} className="group cursor-pointer block">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="flex flex-row gap-2 mt-3">
        <div className="w-[10%]">
          <img 
            src={avatarUrl} 
            alt={userName} 
            className="w-full aspect-square object-cover rounded-full"
          />
        </div>  
        <div>
          <h3 className="text-md font-bold line-clamp-1">{title}</h3>
          <h4 className="text-md mt-1">{userName}</h4>
          <h4 className="text-md">{viewCount} views</h4>
        </div>
      </div>
    </Link>
  );
}