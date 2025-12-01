'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Copy, Check, ExternalLink, Upload } from "lucide-react";
import LivestreamApi from "@/lib/livestreamApi";
import LivestreamMetadataApi from "@/lib/livestreamMetadataApi";
import { useAuth } from "@/context/AuthContext";
import { useLivestream } from "@/context/LiveStreamContext";

interface CreateLivestreamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateLivestreamModal({ isOpen, onClose }: CreateLivestreamModalProps) {
    const { user } = useAuth()
    const { setStreamInfo } = useLivestream()
    const router = useRouter();
    const [step, setStep] = useState<"form" | "result">("form");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
    const [isCreating, setIsCreating] = useState(false);
    const [streamInfo, setStreamInfoLocal] = useState<{
        streamKey: string;
        ingestServer: string;
        playbackUrl: string;
        thumbnailUrl?: string;
    } | null>(null);
    const [copied, setCopied] = useState<"key" | "url" | "playback" | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError("Please select an image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const handleCreateLivestream = async () => {
        if (!title.trim()) {
            setError("Vui lòng nhập tiêu đề livestream");
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            // Step 1: Tạo livestream (lấy streamKey, ingestServer, playbackUrl)
            console.log("📝 Step 1: Creating livestream...");
            const createResponse = await LivestreamApi.CreateLivestream({
                title: title.trim(),
                description: description.trim(),
            });
            const livestreamData = createResponse.data;

            console.log("✅ Livestream created:", livestreamData);

            // Step 2: Upload metadata (title, description, thumbnail)
            console.log("📝 Step 2: Uploading metadata...");
            const metadataResponse = await LivestreamMetadataApi.CreateMetadata(
                livestreamData.livestreamId,
                {
                    title: title.trim(),
                    description: description.trim(),
                    thumbnail: thumbnail || undefined,
                }
            );

            console.log("✅ Metadata uploaded:", metadataResponse.data);

            // Combine responses
            const streamData = {
                streamKey: livestreamData.streamKey,
                ingestServer: livestreamData.ingestServer,
                playbackUrl: livestreamData.playbackUrl,
                thumbnailUrl: metadataResponse.data.thumbnailUrl,
            };

            setStreamInfoLocal(streamData);

            // Save to localStorage
            const fullData = {
                livestreamId: livestreamData.livestreamId,
                playbackUrl: livestreamData.playbackUrl,
                title: title.trim(),
                description: description.trim(),
                thumbnailUrl: metadataResponse.data.thumbnailUrl,
                streamKey: livestreamData.streamKey,
                ingestServer: livestreamData.ingestServer,
                createdAt: new Date().toISOString(),
            };

            console.log("💾 Saving to localStorage:", fullData);
            localStorage.setItem("myLivestream", JSON.stringify(fullData));

            // Update context
            setStreamInfo({
                playbackUrl: fullData.playbackUrl,
                title: fullData.title,
                description: fullData.description,
                thumbnailUrl: fullData.thumbnailUrl,
            })

            console.log("🔄 Context updated");

            window.dispatchEvent(new Event("livestreamCreated"));

            setStep("result");
        } catch (err) {
            console.error("❌ Error creating livestream:", err);
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
            router.push(`/live/${user?.userId}`);
            handleClose();
        }
    };

    const handleClose = () => {
        setStep("form");
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setThumbnailPreview("");
        setStreamInfoLocal(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-neutral-800 rounded-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b p-4">
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

                {/* Step 1: Form */}
                {step === "form" && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm mb-2">
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

                        <div>
                            <label className="block text-white text-sm mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter livestream description..."
                                rows={4}
                                className="w-full bg-neutral-900 text-white px-4 py-3 rounded-lg focus:outline-none border-1 border-white focus:ring-2 focus:ring-red-500 resize-none"
                                maxLength={500}
                            />
                            <p className="text-gray-500 text-xs mt-1 text-right">
                                {description.length}/500
                            </p>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                Thumbnail (Optional)
                            </label>
                            <div className="space-y-3">
                                <label className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors">
                                    <Upload className="w-5 h-5" />
                                    <span>Choose Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="hidden"
                                    />
                                </label>

                                {thumbnailPreview && (
                                    <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => {
                                                setThumbnail(null);
                                                setThumbnailPreview("");
                                            }}
                                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {thumbnail && (
                                    <p className="text-gray-500 text-xs">
                                        Selected: {thumbnail.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

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

                {/* Step 2: Result */}
                {step === "result" && streamInfo && (
                    <div className="space-y-6">
                        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                            <p className="text-green-400 text-center font-medium">
                                Livestream "{title}" created successfully!
                            </p>
                        </div>

                        {streamInfo.thumbnailUrl && (
                            <div className="w-full aspect-video rounded-lg overflow-hidden">
                                <img
                                    src={streamInfo.thumbnailUrl}
                                    alt="Livestream thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-white text-sm mb-2">
                                Server URL (RTMPS)
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={streamInfo.ingestServer}
                                    readOnly
                                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border-1 border-white text-sm"
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

                        <div>
                            <label className="block text-white text-sm mb-2">
                                Stream Key
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="password"
                                    value={streamInfo.streamKey}
                                    readOnly
                                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border-1 border-white text-sm"
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

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                Playback URL (Link xem stream)
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={streamInfo.playbackUrl}
                                    readOnly
                                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm border-1 border-white truncate"
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
                                className="flex-1 py-3 bg-white text-black rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleGoToStream}
                                className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
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