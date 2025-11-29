import { ChannelCard } from "@/components/ChannelCard";
import { VideoCard } from "@/components/VideoCard";
import SearchApi from "@/lib/searchApi";
import { ChannelSearchItem } from "@/types/channel";
import { VideoSearchItem } from "@/types/video";
import Link from "next/link";

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
        <div className="flex flex-col gap-2">
            {/* Hiển thị video */}
            {videos.map((video: VideoSearchItem) => (
              <VideoCard key={video.videoId} videoId={video.videoId} layout="horizontal" limit={false}/>
            ))}
            {/* Hiển thị channel */}
            {channels.map((channel: ChannelSearchItem) => (
              <Link key={channel.channelId} href={`/channel/${channel.channelId}`}>
                <ChannelCard userId={channel.channelId} layout="horizontal" limit={false} showButton={false}/>
              </Link>
              
            ))}
        </div>
      )}
    </div>
  );
}