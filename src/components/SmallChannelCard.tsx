import Link from "next/link";

export function SmallChannelCard({userId, avatarUrl, name, subscribersCount }: { userId: string; avatarUrl: string; name: string; subscribersCount: number }) {
    return (
        <Link href={`/profile/${userId}`}>
        <div className="inline-flex items-center gap-4 p-4 rounded-lg shadow transition-shadow cursor-pointer">
            <div className="w-15  flex-shrink-0">
                <img src={avatarUrl} alt={name} className="w-full aspect-square object-cover rounded-full"/>
            </div>
            <div className="flex flex-col min-w-0">
                <p className="font-medium text-base sm:text-lg line-clamp-1">{name}</p>
                <p className="text-sm text-gray-500">{subscribersCount} subcribers</p>
            </div>
        </div>
        </Link>
    );
}