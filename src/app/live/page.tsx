'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import Hls from "hls.js";
import { Radio } from "lucide-react";

function LivestreamPlayer() {
    const searchParams = useSearchParams();
    const playbackUrl = searchParams.get("url");
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isLive, setIsLive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !playbackUrl) return;

        const decodedUrl = decodeURIComponent(playbackUrl);

        const cleanup = () => {
            if (hlsRef.current) {
                hlsRef.current.stopLoad();
                hlsRef.current.detachMedia();
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };

        if (Hls.isSupported()) {
            cleanup();

            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                liveSyncDurationCount: 3,
            });

            hlsRef.current = hls;
            hls.loadSource(decodedUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("HLS manifest loaded - Stream is live!");
                setIsLive(true);
                setError(null);
                video.play().catch(console.error);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS Error:", data);
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            setError("Stream chưa bắt đầu hoặc đã kết thúc. Đang thử kết nối lại...");
                            setIsLive(false);
                            // Retry sau 5 giây
                            setTimeout(() => {
                                hls.loadSource(decodedUrl);
                            }, 5000);
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
                            break;
                        default:
                            setError("Không thể phát stream. Vui lòng thử lại sau.");
                            cleanup();
                            break;
                    }
                }
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari
            video.src = decodedUrl;
            video.addEventListener("loadedmetadata", () => {
                setIsLive(true);
                video.play().catch(console.error);
            });
        }

        return cleanup;
    }, [playbackUrl]);

    if (!playbackUrl) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <p className="text-white text-xl">Không tìm thấy URL stream</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-6xl mx-auto p-4">
                {/* Live Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isLive ? "bg-red-600" : "bg-gray-600"}`}>
                        <Radio className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">
                            {isLive ? "LIVE" : "OFFLINE"}
                        </span>
                    </div>
                    {isLive && (
                        <span className="text-gray-400 text-sm">Đang phát trực tiếp</span>
                    )}
                </div>

                {/* Video Player */}
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                    <video
                        ref={videoRef}
                        className="w-full h-full"
                        controls
                        autoPlay
                        muted
                        playsInline
                    />

                    {/* Error/Loading Overlay */}
                    {error && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                            <div className="text-center">
                                <Radio className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-pulse" />
                                <p className="text-white mb-2">{error}</p>
                                <p className="text-gray-400 text-sm">
                                    Hãy đảm bảo bạn đã bắt đầu stream từ OBS
                                </p>
                            </div>
                        </div>
                    )}

                    {!isLive && !error && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                            <div className="text-center">
                                <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin block mx-auto mb-4"></span>
                                <p className="text-white">Đang kết nối đến stream...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stream Info */}
                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-white">Livestream của bạn</h1>
                    <p className="text-gray-400 mt-2">
                        Chia sẻ link này để người khác có thể xem stream của bạn
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LivePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-black">
                <span className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            </div>
        }>
            <LivestreamPlayer />
        </Suspense>
    );
}