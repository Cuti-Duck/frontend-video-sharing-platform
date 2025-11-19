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
        <div className="flex gap-6">
            <img src={avatarUrl} alt={name} className="w-[10%] aspect-square object-cover rounded-full"/>
            <div className="flex flex-col gap-2">
                <div className="text-5xl font-bold">{name}</div>
                <div className="text-xl text-gray-500">{subscribersCount} subscribers • {videoCount} videos</div>
                <div className="w-[20%]"><SubcribeButton userId={userId}/></div>
            </div>
        </div>
    );
}