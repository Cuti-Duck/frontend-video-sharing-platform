'use client'
import ChannelApi from "@/lib/channelApi";
import { ChannelResponse } from "@/types/channel";
import Hls from "hls.js";
import { Radio } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";

export function LiveStreamPlayer({channelId}:{channelId:string}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [channel, setChannel] = useState<ChannelResponse>()
    const [playbackUrl, setPlaybackUrl] = useState("")
     const [isLive, setIsLive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const cleanUp = () => {
            if (hlsRef.current) {
                hlsRef.current.stopLoad();
                hlsRef.current.detachMedia();
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };

    useEffect(()=>{
        const fetchChannel= async() =>{
            setIsLoading(true)
            try{
                const resChannel = await ChannelApi.GetChannelById(channelId)
                console.log("channel",resChannel.data.data)
                setChannel(resChannel.data.data)
                setPlaybackUrl(resChannel.data.data.playbackUrl)

            }catch(error){
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchChannel()
    },[channelId])

    useEffect(() => {
    const video = videoRef.current;
    if (!video || !playbackUrl) return;;

    // Nếu là .m3u8
    if (playbackUrl.endsWith(".m3u8")) {

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari hỗ trợ native HLS
        video.src = playbackUrl;
      } else if (Hls.isSupported()) {
        // Chrome/Edge/Firefox
        const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: 10,
            liveDurationInfinity: true,
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            maxBufferSize: 60 * 1000 * 1000,
            maxBufferHole: 0.5,
            manifestLoadingTimeOut: 20000,
            manifestLoadingMaxRetry: 6,
            levelLoadingTimeOut: 20000,
            levelLoadingMaxRetry: 6,
            fragLoadingTimeOut: 20000,
            fragLoadingMaxRetry: 6,
        });

        hlsRef.current = hls;
        hls.loadSource(playbackUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("HLS manifest loaded - Stream is live!");
                setIsLive(true);
                setError(null);
                video.play().catch(console.error);
            });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
                console.log("HLS Error - Type:", data.type, "Details:", data.details, "Fatal:", data.fatal);

                if (!data.fatal) {
                    // Fix: Dùng Hls.ErrorDetails thay vì string
                    if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
                        console.log("Buffer stalled, waiting for more data...");
                        return;
                    }
                    return;
                }

                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        setError("Stream chưa bắt đầu hoặc đã kết thúc. Đang thử kết nối lại...");
                        setIsLive(false);
                        setTimeout(() => {
                            hls.startLoad();
                        }, 3000);
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log("Media error, attempting recovery...");
                        hls.recoverMediaError();
                        break;
                    default:
                        setError("Không thể phát stream. Vui lòng thử lại sau.");
                        cleanUp();
                        break;
                }
            });

        return () =>cleanUp();
      }
    } 
  }, [playbackUrl]);

   useEffect(() => {
    return () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }}
  }, []);
  console.log("MOUNT");
  useEffect(() => {
    console.log("EFFECT RUN");

    return () => console.log("UNMOUNT");
  }, []);

    if(isLoading){
        return(
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }
    return(
        <div>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                ref={videoRef}
                className="w-full h-full"
                controls
                autoPlay = {process.env.NODE_ENV === "production"}
                playsInline
                >
                </video>
            </div>
            <h1 className="flex-1 mt-4 text-2xl font-bold">LiveStream {channel?.name}</h1>
        </div>
    )
}