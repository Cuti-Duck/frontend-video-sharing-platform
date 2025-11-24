'use client'

import { ChannelCard } from "@/components/ChannelCard";
import TabMenu from "@/components/TabMenu";
import { useAuth } from "@/context/AuthContext";
import { notFound } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    notFound();
  }

  return (
    <div className="flex flex-col items-right gap-6 p-6">
        <ChannelCard userId={user.userId} 
                    avatarUrl={user.avatarUrl} 
                    name={user.name} 
                    subscribersCount= {0}
                    videoCount={0} 
        />

      
      {/* TAB HEADER */}
        <TabMenu userId={user.userId}/>
    </div>
  );
}