'use client'
import ViewApi from "@/lib/viewApi";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoId: string
  videoKey: string;
  thumbnailUrl: string;
  playbackUrl: string;
  title: string;
}

export function VideoPlayer({videoId, videoKey, thumbnailUrl, title, playbackUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [quality, setQuality] = useState<"1080p" | "720p">("1080p");
  const qualities = ["1080p", "720p"] as const;
  const videoUrl = videoKey ? `${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}/${videoKey.replace(/_\d+p\.mp4$/, `_${quality}.mp4`)}` : playbackUrl;
  const [viewCounted, setViewCounted] = useState(false);

  // 🔥 Check % xem và gọi API tăng view
  useEffect(() => {
  if (!videoRef.current) return;

  const video = videoRef.current;
  let watchedSeconds = 0;

  const checkView = async () => {
    if (viewCounted) return;

    const duration = video.duration;
    const current = video.currentTime;

    if (!duration) return;
    const percent = current / duration;
    watchedSeconds += 1;
    // console.log("⏱ Watched:", watchedSeconds, "sec", " | ", Math.round(percent * 100), "%");
    // Điều kiện 1: xem tối thiểu 30%
    const enoughPercent = percent >= 0.3;
    // Điều kiện 2: xem tối thiểu 10 giây
    const enoughTime = watchedSeconds >= 10;
    if (enoughPercent && enoughTime) {
      console.log("📈 Tăng view...");
      try {
        const response = await ViewApi.PostView(videoId);
        console.log("OK:", response);
        setViewCounted(true);
      } catch (e) {
        console.error("Lỗi tăng view:", e);
      }
    }
  };
  const interval = setInterval(checkView, 1000);
  return () => clearInterval(interval);
}, [videoKey, viewCounted]);
  // ---------------------------------------------------------------
  //change hls 
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Nếu là .m3u8
    if (videoUrl.endsWith(".m3u8")) {

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari hỗ trợ native HLS
        video.src = videoUrl;
      } else if (Hls.isSupported()) {
        // Chrome/Edge/Firefox
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        return () => hls.destroy();
      }
    } 
    else {
      // Nếu là mp4
      video.src = videoUrl;
    }

  }, [videoUrl]);


  // Dừng video khi component unmount
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

  return (
    <div>
      { videoUrl ? (
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef}
          className="w-full h-full"
          controls
          autoPlay = {process.env.NODE_ENV === "production"}
          poster={thumbnailUrl}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Trình duyệt không hỗ trợ video.
        </video>
      </div>
      ):(
      <div className="p-4 text-center text-red-500">
        <img src = "https://i.ytimg.com/vi/srUn8qIvjY8/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&rs=AOn4CLCpZ2roouS5dPNZaLGvrUM8ls6lxg"/>
      </div>
      )}
      
      <div className="flex py-2">
        <h1 className="flex-1 mt-4 text-2xl font-bold">{title}</h1>
  
        <select value={quality} onChange={(e) =>setQuality(e.target.value as "1080p" | "720p")} 
          className="border px-3 py-2 rounded-md ml-auto">
            {qualities.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}