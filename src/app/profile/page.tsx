'use client'

import { ProfileCard } from "@/components/ProfileCard";
import TabMenu from "@/components/TabMenu";
import { useAuth } from "@/context/AuthContext";
import { notFound } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!user){
    return notFound();
  }

  return (
    <div className="flex flex-col items-right gap-6 p-6">
        <ProfileCard userId={user.userId} 
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