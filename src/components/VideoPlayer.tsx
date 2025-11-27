'use client'
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoKey: string;
  thumbnailUrl: string;
  title: string;
}



export function VideoPlayer({ videoKey, thumbnailUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [quality, setQuality] = useState<"1080p" | "720p">("1080p");
  const qualities = ["1080p", "720p"] as const;
  const videoUrl = videoKey ? `${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}/${videoKey.replace(/_\d+p\.mp4$/, `_${quality}.mp4`)}` : null;

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
          autoPlay
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