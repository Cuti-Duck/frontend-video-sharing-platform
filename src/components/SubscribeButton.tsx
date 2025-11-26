'use client'

import { useAuth } from "@/context/AuthContext"
import SubscriptionApi from "@/lib/subscriptionApi"
import { useEffect, useState } from "react"


export function SubscribeButton({channelId}: {channelId: string}) {
    const {user} = useAuth()
    const [isSubscribed, setSubscribed] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        const checkSubscription = async () => {
            try{
                const response = await SubscriptionApi.MySubscribedchannel()
                console.log(response.data)

              
            }catch(error){
                console.log(error)
            }
        }
    },[])

    const handleSubscribe = async () => {
        try{
            setLoading(true)
            setSubscribed(true)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handleUnSubscribe = async () => {
        try{
            setLoading(true)
            setSubscribed(false)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    } 

    return(
        <div>
        {user ? (
            <div>
            {isSubscribed ? (
                <button
                className="
                    bg-black font-medium px-6 py-2 rounded-full
                    hover:bg-gray-200 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={()=>handleUnSubscribe}> 
                    <span className="font-bold text-white">{isLoading ? "loading...":"UnSubscribe"}</span>
                </button>
            ):(
                <button
                className="
                    bg-white font-medium px-6 py-2 rounded-full
                    hover:bg-gray-200 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={()=>handleSubscribe}> 
                    <span className="font-bold text-black">{isLoading ? "loading...":"Subscribe"}</span>
                </button>
            )}
            </div>
        ):(
            <div></div>
        )}
        </div>
        
    )
}