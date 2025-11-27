'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Copy, Check, Video, ExternalLink } from "lucide-react";
import LivestreamApi from "@/lib/livestreamApi";

interface CreateLivestreamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateLivestreamModal({ isOpen, onClose }: CreateLivestreamModalProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [streamInfo, setStreamInfo] = useState<{
        streamKey: string;
        ingestServer: string;
        playbackUrl: string;
    } | null>(null);
    const [copied, setCopied] = useState<"key" | "url" | "playback" | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreateLivestream = async () => {
        setIsCreating(true);
        setError(null);

        try {
            const response = await LivestreamApi.CreateLivestream();
            const data = response.data;

            console.log("Livestream data:", data);

            setStreamInfo({
                streamKey: data.streamKey,
                ingestServer: data.ingestServer,
                playbackUrl: data.playbackUrl,
            });
        } catch (err) {
            console.error("Error creating livestream:", err);
            setError("Không thể tạo livestream. Vui lòng thử lại!");
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopy = async (text: string, type: "key" | "url" | "playback") => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleGoToStream = () => {
        if (streamInfo?.playbackUrl) {
            // Encode playbackUrl để truyền qua query param
            const encodedUrl = encodeURIComponent(streamInfo.playbackUrl);
            router.push(`/live?url=${encodedUrl}`);
            handleClose();
        }
    };

    const handleClose = () => {
        setStreamInfo(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-lg p-6 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Video className="w-6 h-6 text-red-500" />
                        <h2 className="text-xl font-bold text-white">Tạo Livestream</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                {!streamInfo ? (
                    <div className="text-center py-8">
                        <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 mb-6">
                            Nhấn nút bên dưới để tạo phiên livestream mới
                        </p>

                        {error && (
                            <p className="text-red-500 mb-4">{error}</p>
                        )}

                        <button
                            onClick={handleCreateLivestream}
                            disabled={isCreating}
                            className={`
                                px-6 py-3 bg-red-600 text-white rounded-lg font-medium
                                hover:bg-red-700 transition-colors
                                ${isCreating ? "opacity-50 cursor-not-allowed" : ""}
                            `}
                        >
                            {isCreating ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Đang tạo...
                                </span>
                            ) : (
                                "Tạo Livestream"
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {/* Ingest Server (Stream URL) */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                Server URL (RTMPS)
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={streamInfo.ingestServer}
                                    readOnly
                                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
                                />
                                <button
                                    onClick={() => handleCopy(streamInfo.ingestServer, "url")}
                                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                    {copied === "url" ? (
                                        <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Stream Key */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                Stream Key
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="password"
                                    value={streamInfo.streamKey}
                                    readOnly
                                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm"
                                />
                                <button
                                    onClick={() => handleCopy(streamInfo.streamKey, "key")}
                                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                    {copied === "key" ? (
                                        <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            </div>
                            <p className="text-yellow-500 text-xs mt-2">
                                Giữ bí mật Stream Key! Không chia sẻ với người khác.
                            </p>
                        </div>

                        {/* Playback URL */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                Playback URL (Link xem stream)
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={streamInfo.playbackUrl}
                                    readOnly
                                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm truncate"
                                />
                                <button
                                    onClick={() => handleCopy(streamInfo.playbackUrl, "playback")}
                                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                    {copied === "playback" ? (
                                        <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-gray-800 rounded-lg p-4">
                            <h3 className="text-white font-medium mb-2">Hướng dẫn OBS:</h3>
                            <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
                                <li>Mở OBS → Settings → Stream</li>
                                <li>Service: <span className="text-white">Custom</span></li>
                                <li>Server: <span className="text-white">Dán Server URL ở trên</span></li>
                                <li>Stream Key: <span className="text-white">Dán Stream Key ở trên</span></li>
                                <li>Nhấn <span className="text-green-400">Start Streaming</span></li>
                            </ol>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleGoToStream}
                                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Xem Stream
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}