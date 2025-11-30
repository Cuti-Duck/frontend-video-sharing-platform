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
    const [step, setStep] = useState<"form" | "result">("form");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [streamInfo, setStreamInfo] = useState<{
        streamKey: string;
        ingestServer: string;
        playbackUrl: string;
    } | null>(null);
    const [copied, setCopied] = useState<"key" | "url" | "playback" | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreateLivestream = async () => {
        if (!title.trim()) {
            setError("Vui lòng nhập tiêu đề livestream");
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            const response = await LivestreamApi.CreateLivestream({
                title: title.trim(),
                description: description.trim(),
            });
            const data = response.data;

            console.log("Livestream data:", data);

            setStreamInfo({
                streamKey: data.streamKey,
                ingestServer: data.ingestServer,
                playbackUrl: data.playbackUrl,
            });

            localStorage.setItem("myLivestream", JSON.stringify({
                playbackUrl: data.playbackUrl,
                title: title.trim(),
                description: description.trim(),
            }));

            window.dispatchEvent(new Event("livestreamCreated"));

            setStep("result");
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
            const encodedUrl = encodeURIComponent(streamInfo.playbackUrl);
            const encodedTitle = encodeURIComponent(title);
            router.push(`/live?url=${encodedUrl}&title=${encodedTitle}`);
            handleClose();
        }
    };

    const handleClose = () => {
        setStep("form");
        setTitle("");
        setDescription("");
        setStreamInfo(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black rounded-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto border border-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-white">Create Livestream</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Step 1: Form nhập thông tin */}
                {step === "form" && (
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                Livestream Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                maxLength={100}
                            />
                            <p className="text-gray-500 text-xs mt-1 text-right">
                                {title.length}/100
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                maxLength={500}
                            />
                            <p className="text-gray-500 text-xs mt-1 text-right">
                                {description.length}/500
                            </p>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        {/* Create Button */}
                        <button
                            onClick={handleCreateLivestream}
                            disabled={isCreating || !title.trim()}
                            className={`
                                 w-full py-3 bg-white text-black rounded-lg font-medium
                                hover:bg-gray-200 transition-colors
                                ${(isCreating || !title.trim()) ? "opacity-50 cursor-not-allowed" : ""}
                            `}
                        >
                            {isCreating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Creating...
                                </span>
                            ) : (
                                "Create Livestream"
                            )}
                        </button>
                    </div>
                )}

                {/* Step 2: Kết quả */}
                {step === "result" && streamInfo && (
                    <div className="space-y-6">
                        {/* Success Message */}
                        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                            <p className="text-green-400 text-center font-medium">
                                Livestream "{title}" created successfully!
                            </p>
                        </div>

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
                                Keep your Stream Key secret! Do not share with others.
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
                                <li>Open OBS → Settings → Stream</li>
                                <li>Service: <span className="text-white">Custom</span></li>
                                <li>Server: <span className="text-white">Paste Server URL above</span></li>
                                <li>Stream Key: <span className="text-white">Paste Stream Key above</span></li>
                                <li>Click <span className="text-green-400">Start Streaming</span></li>
                            </ol>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleGoToStream}
                                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Watch Stream
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}