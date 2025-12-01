import { VideoPlayer } from "@/components/VideoPlayer";
import { LikeButton } from "@/components/LikeButton";
import { DescriptionCard } from "@/components/DescriptionCard";
import VideoApi from "@/lib/videoApi";
import UserApi from "@/lib/userApi";
import { VideoItems } from "@/types/video";
import { SubscribeButton } from "@/components/SubscribeButton";
import { CommentFrame } from "@/components/CommentFrame";
import { VideoCard } from "@/components/VideoCard";
import { ChannelCard } from "@/components/ChannelCard";

interface WatchPageProps {
  params: { id: string };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = await VideoApi.GetVideoById(id)
  const user = await UserApi.GetUserById(video.data.userId)
  const videos = await VideoApi.GetVideosTrending(40)
  const relatedVideos = videos.data.filter((v: VideoItems) => v.videoId !== video.data.videoId)
  

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        {/* Main Video Section */}
        <div className="lg:col-span-7">
          <div>
            <VideoPlayer 
            videoId={video.data.videoId}
            videoKey={video.data.key}
            thumbnailUrl={video.data.thumbnailUrl}
            title={video.data.title}
            playbackUrl={video.data.playbackUrl}
          />
          </div>
          
        
          {/* Video Info */}
          <div className="flex justify-between px-3">
            <div className="flex items-center mt-4 mb-6">
                <ChannelCard userId={user.data.data.userId} layout="horizontal" limit={true} showButton={false}/>
              <SubscribeButton channelId={user.data.data.channelId} />
            </div>
            <div className="flex items-center">
              <LikeButton videoId={video.data.videoId} likeCount={video.data.likeCount}/>
            </div>
          </div>
            
          {/* Video Description */}
          <div className="px-3 py-1">
            <DescriptionCard 
              viewCount={video.data.viewCount}
              uploadAt={video.data.createdAt}
              description={video.data.description}
            />
          </div>
          {/* Comment */}
          <div>
            <CommentFrame videoId={video.data.videoId}/>
          </div>
        </div>
        
        {/* Related Videos Sidebar */}
        <div className="flex flex-col lg:col-span-3 gap-2">  
          {relatedVideos.map((v: VideoItems) => (
              <VideoCard key={v.videoId} videoId={v.videoId} layout="horizontal" limit={true}/>
          ))}
        </div>
      </div>
    </div>
  )
}