'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import Hls from "hls.js";
import { Radio, Share2, Copy, Check } from "lucide-react";

function LivestreamPlayer() {
    const searchParams = useSearchParams();
    const playbackUrl = searchParams.get("url");
    const title = searchParams.get("title");
    const description = searchParams.get("description");

    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isLive, setIsLive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

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

                if (!data.fatal) {
                    if (data.details === "bufferStalledError") {
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
                        cleanup();
                        break;
                }
            });

            video.addEventListener("waiting", () => {
                console.log("Video waiting for data...");
            });

            video.addEventListener("playing", () => {
                console.log("Video playing");
                setError(null);
            });

        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = decodeURIComponent(playbackUrl);
            video.addEventListener("loadedmetadata", () => {
                setIsLive(true);
                video.play().catch(console.error);
            });
        }

        return cleanup;
    }, [playbackUrl]);

    const handleShareStream = async () => {
        const shareUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (!playbackUrl) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <p className="text-white text-xl">Không tìm thấy URL stream</p>
            </div>
        );
    }

    const decodedTitle = title ? decodeURIComponent(title) : "Livestream";
    const decodedDescription = description ? decodeURIComponent(description) : "";

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-6xl mx-auto p-4">
                {/* Live Badge & Title */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
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

                    {/* Share Button */}
                    <button
                        onClick={handleShareStream}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-green-500 text-sm">Đã copy!</span>
                            </>
                        ) : (
                            <>
                                <Share2 className="w-4 h-4 text-white" />
                                <span className="text-white text-sm">Chia sẻ</span>
                            </>
                        )}
                    </button>
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
                <div className="mt-6 border-b border-gray-800 pb-6">
                    <h1 className="text-2xl font-bold text-white">{decodedTitle}</h1>

                    {decodedDescription && (
                        <div className="mt-4 bg-gray-800/50 rounded-lg p-4">
                            <h3 className="text-gray-400 text-sm mb-2">Mô tả</h3>
                            <p className="text-white whitespace-pre-wrap">{decodedDescription}</p>
                        </div>
                    )}
                </div>

                {/* Share Link Section */}
                <div className="mt-6">
                    <h3 className="text-gray-400 text-sm mb-2">Link xem stream</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={window.location.href}
                            readOnly
                            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm truncate"
                        />
                        <button
                            onClick={handleShareStream}
                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            {copied ? (
                                <Check className="w-5 h-5 text-green-500" />
                            ) : (
                                <Copy className="w-5 h-5 text-white" />
                            )}
                        </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
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