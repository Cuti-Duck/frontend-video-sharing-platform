import { Video } from "@/types";
import { Play } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} className="group cursor-pointer block">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{video.author.name}</p>
        <p className="text-sm text-gray-500">{video.viewCount} views</p>
      </div>
    </Link>
  );
}