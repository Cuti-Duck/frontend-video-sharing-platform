import { VideoPlayer } from "@/components/VideoPlayer";
import { SmallVideoCard } from "@/components/SmallVideoCard";
import { getVideoById, getRelatedVideos, getUserById } from "@/lib/mockData";
import { notFound } from "next/navigation";
import { SmallChannelCard } from "@/components/SmallChannelCard";
import { SubcribeButton } from "@/components/SubcribeButton";
import { LikeButton } from "@/components/LikeButton";
import { DescriptionCard } from "@/components/DescriptionCard";

interface WatchPageProps {
  params: { id: string };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = getVideoById(id);
  const user = getUserById(video?.userId || "");
  
  if (!video) {
    notFound();
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
        {/* Main Video Section */}
        <div className="lg:col-span-3">
          <VideoPlayer 
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
          />
          
          {/* Video Info */}
          <div className="flex justify-between px-3">
            <div className="flex items-center mt-4 mb-6">
              <SmallChannelCard
                userId={user?.userId || ""}
                avatarUrl={user?.avatarUrl || ""}   
                name={user?.name || "Unknown"}
                subscribersCount={user?.subscribersCount || 0}
                />
              <SubcribeButton userId={user?.userId || ""}/>
            </div>
            <div className="flex items-center">
              <LikeButton videoId={video.videoId} likeCount={video.likeCount} />
            </div>
          </div>
            
          {/* Video Description */}
          <div className="px-3 py-1">
            <DescriptionCard 
              viewCount={video.viewCount}
              uploadAt={video.createdAt}
              description={video.description}
            />
          </div>
        </div>
        
        {/* Related Videos Sidebar */}
        <div className="lg:col-span-1">
          
          {getRelatedVideos(video.videoId).map((videos) => (
              <SmallVideoCard 
                key={videos.videoId}
                videoId={videos.videoId}
                thumbnailUrl={videos.thumbnailUrl}
                title={videos.title}
                userName={getUserById(videos.userId)?.name || "Unknown"}
                viewCount={video.viewCount}
                uploadAt={video.createdAt} />
          ))}
        </div>
      </div>
    </div>
  );
}