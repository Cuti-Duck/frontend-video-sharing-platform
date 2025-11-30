'use client'
import UserApi from "@/lib/userApi";
import { ChannelResponse } from "@/types/channel";
import { UserResponse } from "@/types/user";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LiveStreamCard({channel, layout, limit}: {channel: ChannelResponse, layout: "horizontal" | "vertical",limit:boolean}) {
    const [thisUser, setThisUser] = useState<UserResponse>()
    const router = useRouter()
    const title = "LiveStream"

     useEffect(()=>{
        const fetchVideo = async() => {
            try{
                const resUser = await UserApi.GetUserById(channel.userId)
                setThisUser(resUser.data.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchVideo()
    },[])

    const handlethumbnailClick = () => {
        if(!thisUser) { alert("No user found"); return; }
        router.push(`/live/${thisUser.userId}`)
    }

    return(
        <div>
            {thisUser && 
                <div className ={`flex ${layout === "horizontal" ? "flex-row gap-3" : "flex-col gap-2"} cursor-pointer`}>
                    {/* thumbnail */}
                    <div onClick={()=>handlethumbnailClick()} className={`relative ${layout === "horizontal" ? "w-1/3 h-auto flex-shrink-0" : "h-1/2"
                        } overflow-hidden rounded-md aspect-video group border-2 border-red-500`}>
                          <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105"
                              style={{ backgroundImage: `url(${thisUser.avatarUrl})` }}
                            ></div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    {/* Info */}
                    <div>
                        {layout === "horizontal" &&
                            <div className="flex flex-row gap-2 justify-between w-full">
                                <div className="flex flex-col gap-2">
                                    <span className={`font-bold ${!limit ? "text-xl" : "text-md"} line-clamp-2`}>{title}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{0} views</span>
                                    <div className="flex flex-row gap-2 items-center">
                                      {!limit && 
                                        <div className="w-12 bg-cover bg-center aspect-square rounded-full flex-shrink-0"
                                          style={{ backgroundImage: `url(${thisUser.avatarUrl || "https://static.vecteezy.com/system/resources/thumb…fault-avatar-icon-of-social-media-user-vector.jpg"})` }}/>
                                      }
                                      <span className="text-md line-clamp-1 text-neutral-500">{thisUser.name}</span>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* */}
                        {layout === "vertical" &&
                            <div className="flex flex-row gap-2">
                                <div className="h-12 bg-cover bg-center aspect-square rounded-full flex-shrink-0"
                                    style={{ backgroundImage: `url(${channel.avatarUrl || "https://static.vecteezy.com/system/resources/thumb…fault-avatar-icon-of-social-media-user-vector.jpg"})` }}/>

                                <div className="flex flex-col">
                                    <span className="font-bold text-xl line-clamp-2">{title}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{thisUser.name}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{0} views</span>
                                </div>
                                
                            </div>
                        }
                    </div>
                </div>
                }
        </div>
    )
}