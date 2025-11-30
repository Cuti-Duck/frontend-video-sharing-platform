import { ChannelCard } from "@/components/ChannelCard";
import { LiveStreamPlayer } from "@/components/LiveStreamPlayer";
import { SubscribeButton } from "@/components/SubscribeButton";
import UserApi from "@/lib/userApi";

interface LivePageProps {
  params: { id: string };
}

export default async function LivePage({ params }: LivePageProps) {
    const { id } = await params;
    const user = await UserApi.GetUserById(id)

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                {/* Main Video Section */}
                <div className="lg:col-span-7">
                    <div>
                    <LiveStreamPlayer channelId={user.data.data.channelId}/>
                    </div>    
                    {/* Video Info */}
                    <div className="flex justify-between px-3">
                    <div className="flex items-center mt-4 mb-6">
                        <ChannelCard userId={user.data.data.userId} layout="horizontal" limit={true} showButton={false}/>
                        <SubscribeButton channelId={user.data.data.channelId} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}