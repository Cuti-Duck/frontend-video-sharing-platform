import { ChannelCard } from "@/components/ChannelCard";
import TabMenu from "@/components/TabMenu";
import { getUserById, getVideoCountByUserId } from "@/lib/mockData";
import UserApi from "@/lib/userApi";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col items-right gap-6 p-6">
        <ChannelCard userId={user.userId} 
                    avatarUrl={user.avatarUrl} 
                    name={user.name} 
                    subscribersCount={user.subscribersCount} 
                    videoCount={getVideoCountByUserId(user.userId)} 
        />

      
      {/* TAB HEADER */}
        <TabMenu userId={user.userId}/>
    </div>
  );
}