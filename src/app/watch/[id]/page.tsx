import { VideoPlayer } from "@/components/VideoPlayer";
import { SmallVideoCard } from "@/components/SmallVideoCard";
import { getVideoById, getRelatedVideos } from "@/lib/mockData";
import { notFound } from "next/navigation";

interface WatchPageProps {
  params: { id: string };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = getVideoById(id);
  
  if (!video) {
    notFound();
  }

  return (
    <div className="mr-auto px-1 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
        {/* Main Video Section */}
        <div className="lg:col-span-3">
          <VideoPlayer 
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
          />
          
          {/* Video Info */}
          <div className="mt-4">
            <h1 className="text-xl font-semibold">{video.title}</h1>
            <p className="text-gray-600 text-sm mt-1">
              {video.viewCount.toLocaleString()} lượt xem • {video.uploadedAt}
            </p>
          </div>
        </div>
        
        {/* Related Videos Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold mb-4">Video liên quan</h3>
          {/* Related videos sẽ thêm sau */}
          {getRelatedVideos(video.id).map((videos) => (
              <SmallVideoCard key={videos.id} video={videos} />
          ))}
        </div>
      </div>
    </div>
  );
}