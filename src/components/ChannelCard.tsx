'use client'

import { useAuth } from "@/context/AuthContext"
import ChannelApi from "@/lib/channelApi"
import UserApi from "@/lib/userApi"
import { ChannelResponse } from "@/types/channel"
import { UserResponse } from "@/types/user"
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CustomButton } from "./CustomButton"
import AvatarModal from "./AvatarModal"
import UpdateProfileModal from "./UpdateProfileModal"
import { SubscribeButton } from "./SubscribeButton"

export function ChannelCard({userId,layout,limit, showButton}:{userId:string, layout: "horizontal" | "vertical",limit:boolean, showButton:boolean}) {
    const {user} = useAuth()
    const [thisUser, setThisUser] = useState<UserResponse>()
    const [channel,setChannel] = useState<ChannelResponse>()
    const [showImageModal,setShowImageModal] = useState(false)
    const [showUpdateProfileModal,setShowUpdateProfileModal] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const response = await UserApi.GetUserById(userId)
                setThisUser(response.data.data)
                const resChannel = await ChannelApi.GetChannelById(response.data.data.channelId)
                setChannel(resChannel.data.data)

            }catch(error){
                console.log(error)
            }
        }
        fetchUser()
    },[])

    const handleChannelClick = () => {
        if(!channel) return
        router.push(`/channel/${channel.channelId}`)
    }

    return(
        <div>
            {thisUser && channel && 
                <div onClick={()=>handleChannelClick()} className={`inline-flex ${layout === "horizontal" ? "flex-row gap-3" : "flex-col gap-2"} cursor-pointer hover:bg-neutral-800 rounded-md p-2`}>
                    {/* avatar */}
                    <div className={`${limit ? "w-15":"w-50"} bg-black bg-cover bg-center aspect-square rounded-full flex-shrink-0`}
                        style={{ backgroundImage: `url(${thisUser.avatarUrl || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"})` }}/>
                    {/* Info */}
                    <div>
                        {layout === "horizontal" && !limit &&
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-5xl line-clamp-1">{thisUser.name}</span>
                                <span className="flex gap-2 text-md line-clamp-1 text-neutral-500"> <Mail size={20}/> {thisUser.email}</span>
                                <span className="text-md line-clamp-1 text-neutral-500">{channel.subscriberCount} subscribers • {channel.videoCount} videos</span>
                                {showButton && user && user.userId===userId ? (
                                    <div className="flex flex-row items-center gap-3">
                                        <CustomButton content="Update Profile" userId={userId} onClick={()=>{setShowUpdateProfileModal(true)}}/>
                                        <CustomButton content="Upload Avatar" userId={userId} onClick={()=>{setShowImageModal(true)}}/>
                                    </div>
                                ):(
                                    <div className="w-[20%]"><SubscribeButton channelId={thisUser.channelId}/></div>
                                )}
                            </div>
                        }
                        {layout === "horizontal" && limit &&
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-xl line-clamp-1">{thisUser.name}</span>
                                <span className="text-md line-clamp-1 text-neutral-500">{channel.subscriberCount} subscribers</span>
                            </div>
                        }
                        {layout === "vertical" &&
                            <div className="flex flex-col">
                                <span className="font-bold text-xl line-clamp-1">{thisUser.name}</span>
                                <span className="text-md line-clamp-1 text-neutral-500">{channel.subscriberCount} subscribers • {channel.videoCount} videos</span>
                            </div>
                        }
                    </div>
                    <AvatarModal isOpen={showImageModal} onClose={()=> {setShowImageModal(false)}}/>
                    <UpdateProfileModal isOpen={showUpdateProfileModal} onClose={()=>{setShowUpdateProfileModal(false)}}
                        name={thisUser.name} gender={thisUser.gender} birthDate={thisUser.birthDate} phoneNumber={thisUser.phoneNumber}/> 
                </div>
            }
        </div>
    )
}