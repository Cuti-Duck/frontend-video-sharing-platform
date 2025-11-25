'use client'
import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dừng video khi component unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div>
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
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
    </div>
    
  );
}