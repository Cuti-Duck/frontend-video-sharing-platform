import { ChannelCard } from "@/components/ChannelCard";
import { SmallVideoCard } from "@/components/SmallVideoCard";
import SearchApi from "@/lib/searchApi";
import { ChannelSearchItem } from "@/types/channel";
import { VideoSearchItem } from "@/types/video";

interface SearchPageProps {
  searchParams: { query?: string };
}

export default async function SearchPage({searchParams}: SearchPageProps) {
  const query = searchParams.query || "";
  let videos = [];
  let channels = [];

  if (query) {
    // Gọi API tìm kiếm
    const response = await SearchApi.Search({
      q: query,
      type: undefined,
      sortBy: "relevance",
      limit: 20,
      offset: 0
    }); // giả sử trả về list video

    videos = response.data.videos
    channels = response.data.channels
  }

  return (
    <div>
      {videos.length === 0 && channels.length === 0 ? (
        <p>Không có kết quả nào.</p>
      ) : (
        <div>
            {/* Hiển thị video */}
            {videos.map((video: VideoSearchItem) => (
              <SmallVideoCard 
                key={video.videoId}
                videoId={video.videoId} 
                thumbnailUrl={video.thumbnailUrl} 
                title={video.title} 
                userName={video.channelName} 
                viewCount={video.viewCount}
                uploadAt={video.createdAt} />
            ))}
            {/* Hiển thị channel */}
            {channels.map((channel: ChannelSearchItem) => (
              <ChannelCard
                key={channel.channelId}
                userId={channel.channelId} />
            ))}
        </div>
      )}
    </div>
  );
}