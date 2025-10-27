interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video 
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
  );
}