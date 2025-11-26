'use client'
import { ProfileCard } from "@/components/ProfileCard";
import TabMenu from "@/components/TabMenu";
import { useAuth } from "@/context/AuthContext";
import VideoApi from "@/lib/videoApi";
import { VideoItems } from "@/types/video";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();  
  const [videos, setVideos] = useState<VideoItems[]>([]);
  const [videoCount, setVideoCount] = useState(0);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    if(user){
      const fetchVideos = async() => {
        try{
          const response = await VideoApi.GetVideoByChannelId(user.userId);
          setVideos(response.data);
          setVideoCount(response.data.length);
        }catch (error){
          console.log(error)
        }finally{
          setLoadingVideos(false);
        }
      };
      fetchVideos();
    }
  },[user]);

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
                    gender={user.gender}
                    birthDate={user.birthDate}
                    phoneNumber={user.phoneNumber} 
                    subscribersCount= {0}
                    videoCount={videoCount} 
        />

      
      {/* TAB HEADER */}
        <TabMenu userId={user.userId} videos={videos}/>
    </div>
  );
}