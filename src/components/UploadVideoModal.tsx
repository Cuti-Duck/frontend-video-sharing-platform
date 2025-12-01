import { useState } from "react"
import Modal from "./Modal"
import VideoApi from "@/lib/videoApi"

interface UploadVideoModalProp {
    isOpen: boolean
    onClose: () => void
    channelId: string
}

export default function UploadVideoModal({ isOpen, onClose, channelId }: UploadVideoModalProp) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Combined submit - PostVideo + UploadVideo
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title.trim()) {
            alert("Please enter title");
            return;
        }
        if (!description.trim()) {
            alert("Please enter description");
            return;
        }
        if (!video) {
            alert("Please select a video file");
            return;
        }

        setIsLoading(true);
        setProgress(0);

        try {
            // Step 1: Get upload URL
            console.log("Getting upload URL...");
            const urlResponse = await VideoApi.PostVideo({
                channelId,
                title: title.trim(),
                description: description.trim()
            });
            const uploadUrl = urlResponse.data.uploadUrl;
            console.log("Upload URL received:", uploadUrl);

            // Step 2: Upload video
            console.log("Uploading video...");
            const uploadResponse = await VideoApi.UploadVideo(
                uploadUrl,
                video,
                (progressEvent) => {
                    if (progressEvent.total && progressEvent.total > 0) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    }
                }
            );
            console.log("Upload success:", uploadResponse);

            // Success
            setTimeout(() => {
                handleClose();
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setUrl('');
        setVideo(null);
        setProgress(0);
        setIsLoading(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={"Upload Video"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isLoading}
                        maxLength={100}
                    />
                    <p className="text-gray-500 text-xs mt-1 text-right">
                        {title.length}/100
                    </p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        required
                        disabled={isLoading}
                        maxLength={500}
                    />
                    <p className="text-gray-500 text-xs mt-1 text-right">
                        {description.length}/500
                    </p>
                </div>

                {/* Video File */}
                <div>
                    <label className="block text-sm font-medium mb-1">Video File</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setVideo(e.target.files[0]);
                            }
                        }}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isLoading}
                    />
                    {video && (
                        <p className="text-gray-500 text-xs mt-1">
                            Selected: {video.name}
                        </p>
                    )}
                </div>

                {/* Progress Bar */}
                {isLoading && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Uploading...</span>
                            <span className="text-sm font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Upload Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-gray-300 disabled:bg-gray-500 text-black py-2 px-4 rounded-md transition-colors font-medium"
                >
                    {isLoading ? `Uploading ${progress}%...` : 'Upload'}
                </button>
            </form>
        </Modal>
    );
}