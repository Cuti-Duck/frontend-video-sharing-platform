import { Video } from "@/types";
import { Play } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  video: Video;
}

export function SmallVideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} className="group cursor-pointer flex gap-3 mb-4">
      <div className="relative w-40 aspect-video bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <img 
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold line-clamp-2 text-md">{video.title}</h3>
        <p className="text-xs text-gray-600 mt-1">{video.author.name}</p>
        <p className="text-xs text-gray-500">{video.viewCount} views</p>
      </div>
    </Link>
  );
}