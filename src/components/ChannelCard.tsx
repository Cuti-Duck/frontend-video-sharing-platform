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
                <h1 className="text-5xl font-bold">{name}</h1>
                <h4 className="text-xl">{subscribersCount} subscribers • {videoCount} videos</h4>
                <div className="w-[20%]"><SubcribeButton userId={userId}/></div>
            </div>
        </div>
    );
}