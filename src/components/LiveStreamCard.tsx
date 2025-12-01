'use client'
import UserApi from "@/lib/userApi";
import { ChannelResponse } from "@/types/channel";
import { UserResponse } from "@/types/user";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLivestream } from "@/context/LiveStreamContext";

export function LiveStreamCard({ channel, layout, limit }: { channel: ChannelResponse, layout: "horizontal" | "vertical", limit: boolean }) {
    const [thisUser, setThisUser] = useState<UserResponse>()
    const [title, setTitle] = useState("Livestream")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState<string>("")
    const [isLive, setIsLive] = useState(false)
    const router = useRouter()
    const { streamInfo } = useLivestream()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resUser = await UserApi.GetUserById(channel.userId)
                setThisUser(resUser.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [channel.userId])

    // Lấy livestream info từ context + localStorage
    useEffect(() => {
        console.log("=== LiveStreamCard: Checking for livestream ===");
        console.log("streamInfo from context:", streamInfo);

        if (streamInfo?.thumbnailUrl) {
            // Priority 1: Context has valid thumbnailUrl
            console.log(" Using thumbnail from context:", streamInfo.thumbnailUrl);
            setTitle(streamInfo.title || "Livestream");
            setDescription(streamInfo.description || "");
            setThumbnail(streamInfo.thumbnailUrl);
            setIsLive(true);
        } else {
            // Priority 2: Check localStorage
            const saved = localStorage.getItem("myLivestream");
            console.log("localStorage data:", saved);

            if (saved) {
                try {
                    const parsed = JSON.parse(saved);

                    if (parsed.thumbnailUrl) {
                        console.log("✅ Using thumbnail from localStorage:", parsed.thumbnailUrl);
                        setTitle(parsed.title || "Livestream");
                        setDescription(parsed.description || "");
                        setThumbnail(parsed.thumbnailUrl);
                        setIsLive(true);
                    } else {
                        console.log("⚠️ localStorage has no thumbnailUrl");
                        setIsLive(false);
                        setThumbnail("");
                    }
                } catch (e) {
                    console.error("Error parsing livestream:", e);
                    setIsLive(false);
                    setThumbnail("");
                }
            } else {
                console.log("❌ No livestream data in localStorage or context");
                setIsLive(false);
                setThumbnail("");
            }
        }
    }, [streamInfo]);

    const handlethumbnailClick = () => {
        if (!thisUser) { alert("No user found"); return; }
        router.push(`/live/${thisUser.userId}`)
    }

    return (
        <div>
            {thisUser &&
                <div className={`flex ${layout === "horizontal" ? "flex-row gap-3" : "flex-col gap-2"} cursor-pointer`}>
                    {/* thumbnail */}
                    <div onClick={() => handlethumbnailClick()} className={`relative ${layout === "horizontal" ? "w-1/3 h-auto flex-shrink-0" : "h-1/2"
                        } overflow-hidden rounded-md aspect-video group border-2 ${isLive ? "border-red-500" : "border-gray-600"}`}>
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                            style={{
                                backgroundImage: thumbnail ? `url(${thumbnail})` : "none",
                                backgroundColor: thumbnail ? "transparent" : "#1a1a1a"
                            }}
                        >
                            {/* Fallback placeholder nếu không có thumbnail */}
                            {!thumbnail && (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <div className="text-center">
                                        <Play className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                                        <p className="text-gray-500 text-sm">No thumbnail</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Overlay & Play button */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                        </div>

                        {/* Live badge */}
                        {isLive && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                                LIVE
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        {layout === "horizontal" &&
                            <div className="flex flex-row gap-2 justify-between w-full">
                                <div className="flex flex-col gap-2 flex-1">
                                    <span className={`font-bold ${!limit ? "text-xl" : "text-md"} line-clamp-2`}>
                                        {title}
                                    </span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{0} viewers</span>
                                    <div className="flex flex-row gap-2 items-center">
                                        {!limit &&
                                            <div
                                                className="w-12 bg-cover bg-center aspect-square rounded-full flex-shrink-0"
                                                style={{ backgroundImage: `url(${thisUser.avatarUrl})` }}
                                            />
                                        }
                                        <span className="text-md line-clamp-1 text-neutral-500">{thisUser.name}</span>
                                    </div>
                                </div>
                            </div>
                        }
                        {layout === "vertical" &&
                            <div className="flex flex-row gap-2">
                                <div
                                    className="h-12 bg-cover bg-center aspect-square rounded-full flex-shrink-0"
                                    style={{ backgroundImage: `url(${thisUser.avatarUrl})` }}
                                />

                                <div className="flex flex-col flex-1">
                                    <span className="font-bold text-xl line-clamp-2">{title}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{thisUser.name}</span>
                                    <span className="text-md line-clamp-1 text-neutral-500">{0} viewers</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}