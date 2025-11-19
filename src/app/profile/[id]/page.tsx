import { ChannelCard } from "@/components/ChannelCard";
import { getUserById, getVideoCountByUserId } from "@/lib/mockData";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col items-right gap-6 p-6">
        <ChannelCard userId={user.id} 
                    avatarUrl={user.avatarUrl} 
                    name={user.name} 
                    subscribersCount={user.subscribersCount} 
                    videoCount={getVideoCountByUserId(user.id)} 
        />

      

    </div>
  );
}