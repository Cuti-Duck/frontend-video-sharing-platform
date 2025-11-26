'use client'

import { Mail } from "lucide-react";
import { SubscribeButton } from "./SubscribeButton";
import { CustomButton } from "./CustomButton";
import { useEffect, useState } from "react";
import AvatarModal from "./AvatarModal";
import UpdateProfileModal from "./UpdateProfileModal";
import { useAuth } from "@/context/AuthContext";
import { UserResponse } from "@/types/user";
import UserApi from "@/lib/userApi";
import VideoApi from "@/lib/videoApi";
import SubscriptionApi from "@/lib/subscriptionApi";

export function ChannelCard( {userId}: {userId:string}) {
    const {user,isLoading} = useAuth()
    const [isGetting, setGetting] = useState(false)
    const [showImageModal,setShowImageModal] = useState(false)
    const [showUpdateProfileModal,setShowUpdateProfileModal] = useState(false)
    const [thisUser, setThisUser] = useState<UserResponse>()
    const [videoCount, setVideoCount] = useState(0)
    const [subscriberCount, setSubscribeCount] = useState(0)
    
    useEffect(()=>{
        const fetchUser = async() => {
            try{
                setGetting(true)
                const response = await UserApi.GetUserById(userId)
                setThisUser(response.data.data)
                const resVideo = await VideoApi.GetVideoByChannelId(response.data.data.channelId)
                setVideoCount(resVideo.data.length)
                const resSub = await SubscriptionApi.GetSubscriber(response.data.data.channelId)
                setSubscribeCount(resSub.data.totalCount)

            }catch(error){
                console.log(error)
            }finally{
                setGetting(false)
            }
        }
        fetchUser();
    },[userId])
    
    if(isLoading || isGetting) return <div>Loading...</div>
    if(!thisUser) return <div>Not find this user...</div>

    return (
        <div className="flex items-center gap-6">
            <div className="w-[50%] sm:w-[40%] md:w-[30%] lg:w-[10%]">
                <img src={thisUser.avatarUrl} alt={thisUser.name} className="w-full h-auto aspect-square object-cover rounded-full"/>
            </div>
            
            <div className="flex flex-col gap-2">
                <h1 className="text-5xl font-bold">{thisUser.name}</h1>
                <h4 className="text-xl flex items-center"><Mail size={20}/>: {thisUser.email}</h4>
                <h4 className="text-xl">{subscriberCount} subscribers • {videoCount} videos</h4>
                {user && user.userId===userId ? (
                    <div className="flex flex-row items-center gap-3">
                        <CustomButton content="Update Profile" userId={userId} onClick={()=>{setShowUpdateProfileModal(true)}}/>
                        <CustomButton content="Upload Avatar" userId={userId} onClick={()=>{setShowImageModal(true)}}/>
                    </div>
                ):(
                    <div className="w-[20%]"><SubscribeButton channelId={thisUser.channelId}/></div>
                )}
            </div>
            <AvatarModal isOpen={showImageModal} onClose={()=> {setShowImageModal(false)}}/>
            <UpdateProfileModal isOpen={showUpdateProfileModal} onClose={()=>{setShowUpdateProfileModal(false)}}
                                name={thisUser.name} gender={thisUser.gender} birthDate={thisUser.birthDate} phoneNumber={thisUser.phoneNumber}/> 
        </div>
    );
}