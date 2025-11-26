
import { ChannelCard } from "@/components/ChannelCard";
import TabMenu from "@/components/TabMenu";
import UserApi from "@/lib/userApi";
import VideoApi from "@/lib/videoApi";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = await UserApi.GetUserById(id);
  const videos = (await VideoApi.GetVideoByChannelId(id)).data;
  const videoCount = videos.length;

  console.log("user", user.data)
  console.log("Videos", videos, "Length Video", videoCount)

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col items-right gap-6 p-6">
        <ChannelCard userId={user.data.data.userId} 
                    avatarUrl={user.data.data.avatarUrl} 
                    name={user.data.data.name} 
                    subscribersCount={user.data.data.subscribersCount || 0} 
                    videoCount={videoCount}
                    email={user.data.data.email}
                    channelId={user.data.data.channelId} 
        />

      
      {/* TAB HEADER */}
        <TabMenu userId={id} videos={videos}/>
    </div>
  );
}