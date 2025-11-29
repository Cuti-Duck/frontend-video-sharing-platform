import { ChannelCard } from "@/components/ChannelCard";
import TabMenu from "@/components/TabMenu";

interface ChannelParam{
  params:  {id: string}
}

export default async function ChannelPage({ params, }: ChannelParam) {
  const {id} = await params

  return (
    <div className="flex flex-col items-right gap-6 p-6">
        <ChannelCard userId={id} layout="horizontal" limit={false} showButton={true}/>
      {/* TAB HEADER */}
        <TabMenu userId={id}/>
    </div>
  );
}