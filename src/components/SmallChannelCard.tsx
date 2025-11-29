import SubscriptionApi from "@/lib/subscriptionApi";
import Link from "next/link";

export async function SmallChannelCard({userId, avatarUrl, name, channelId }: { userId: string; avatarUrl: string; name: string; channelId: string }) {
    const resSub = await SubscriptionApi.GetSubscriber(channelId)
    const subscriberCount = resSub.data.totalCount;

    return (
        <Link href={`/channel/${userId}`}>
        <div className="inline-flex items-center gap-4 p-4 rounded-lg shadow transition-shadow cursor-pointer">
            <div className="w-15  flex-shrink-0">
                <img src={avatarUrl} alt={name} className="w-full aspect-square object-cover rounded-full"/>
            </div>
            <div className="flex flex-col min-w-0">
                <p className="font-medium text-base sm:text-lg line-clamp-1">{name}</p>
                <p className="text-sm text-gray-500">{subscriberCount} subscribers</p>
            </div>
        </div>
        </Link>
    );
}