import { SubcribeButton } from "./SubcribeButton";

interface ChannelCardProps {
    userId: string;
    avatarUrl: string;
    name: string;
    subscribersCount: number;
    videoCount: number;
}

export function ChannelCard( {userId, avatarUrl, name, subscribersCount, videoCount}: ChannelCardProps) {
    return (
        <div className="flex items-center gap-6">
            <div className="w-[50%] sm:w-[40%] md:w-[30%] lg:w-[10%]">
                <img src={avatarUrl} alt={name} className="w-full h-auto aspect-square object-cover rounded-full"/>
            </div>
            
            <div className="flex flex-col gap-2">
                <div className="text-5xl font-bold">{name}</div>
                <div className="text-xl text-gray-500">{subscribersCount} subscribers • {videoCount} videos</div>
                <div className="w-[20%]"><SubcribeButton userId={userId}/></div>
            </div>
        </div>
    );
}