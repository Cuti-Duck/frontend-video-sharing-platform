import { Play } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  videoId: string;
  thumbnailUrl:string;
  title: string;
  userName: string;
  viewCount: number;
}

export function VideoCard({ videoId, thumbnailUrl, title, userName, viewCount }: VideoCardProps) {
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
      <div className="mt-3">
        <h3 className="font-medium line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{userName}</p>
        <p className="text-sm text-gray-500">{viewCount} views</p>
      </div>
    </Link>
  );
}