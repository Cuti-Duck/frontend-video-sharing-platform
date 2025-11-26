import { ChannelCard } from "@/components/ChannelCard";
import TabMenu from "@/components/TabMenu";
// import { getUserById, getVideoCountByUserId } from "@/lib/mockData";
import UserApi from "@/lib/userApi";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = await UserApi.GetUserById(id);

  console.log("user", user.data)
  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col items-right gap-6 p-6">
        <ChannelCard userId={user.data.data.userId} 
                    avatarUrl={user.data.data.avatarUrl} 
                    name={user.data.data.name} 
                    subscribersCount={user.data.data.subscribersCount || 0} 
                    videoCount={user.data.data.videoCount || 0}
                    email={user.data.data.email} 
        />

      
      {/* TAB HEADER */}
        <TabMenu userId={id} channelId={user.data.data.channelId}/>
    </div>
  );
}