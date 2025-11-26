'use client'

import { useAuth } from "@/context/AuthContext"
import SubscriptionApi from "@/lib/subscriptionApi"
import { Subscriber } from "@/types/subscription"
import { useEffect, useState } from "react"

export function SubscribeButton({channelId}: {channelId: string}) {
    const {user} = useAuth()
    const [isSubscribed, setSubscribed] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        const checkSubscribe = async () => {
            try{
                const response = await SubscriptionApi.GetSubscriber(channelId)
                const subscribers = response.data.subscribers
                console.log(subscribers)
                setSubscribed(user ? subscribers.some((sub: Subscriber) => sub.channelId === user.channelId) : false)
            }catch(error){
                console.log(error)
            }}
        checkSubscribe();
    },[channelId])

    const handleSubscribe = async () => {
        try{
            console.log("run")
            setLoading(true)
            const response = await SubscriptionApi.Subscribe(channelId)
            console.log("subscribe",response)
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
            const response = await SubscriptionApi.UnSubscribe(channelId)
            console.log("unsubscribe",response)
            setSubscribed(false)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    } 

    return(
        <div>
        {(user && user.channelId !== channelId ) ? (
                <div>
                    {isSubscribed ? (
                    <button
                    className="
                        bg-black font-medium px-6 py-2 rounded-full
                        hover:bg-gray-700 transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={()=>handleUnSubscribe()}> 
                        <span className="font-bold text-white">{isLoading ? "loading...":"UnSubscribe"}</span>
                    </button>
                ):(
                    <button
                    className="
                        bg-white font-medium px-6 py-2 rounded-full
                        hover:bg-gray-200 transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={()=>handleSubscribe()}> 
                        <span className="font-bold text-black">{isLoading ? "loading...":"Subscribe"}</span>
                    </button>
                    )}
                </div>
        ):(
            // khong hien
            <div></div>
        )}
        </div>
    )
}