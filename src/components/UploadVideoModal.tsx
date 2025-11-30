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
    const [isStepUpload, setStepUpload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);


    const handleGetUrl = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        console.log("submit");
        try {
            console.log("data sending")
            const response = await VideoApi.PostVideo({ channelId, title, description });
            console.log(response);
            setUrl(response.data.uploadUrl)
            setStepUpload(true);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!video) return;
        setIsLoading(true)
        setProgress(0)

        try {
            console.log("video is sending")
            const response = await VideoApi.UploadVideo(url, video, (progressEvent) => {
                if (progressEvent.total && progressEvent.total > 0) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(percentCompleted);
                }
            });
            console.log(response, "success");

            window.location.reload()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            onClose()
        }
    }

    return (
        <div>
            {isStepUpload ? (
                <Modal isOpen={isOpen} onClose={onClose} title={"Upload Video"}>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Video File</label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setVideo(e.target.files[0]);
                                    }
                                }}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={isLoading}
                            />
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
                                    ></div>
                                </div>
                            </div>
                        )}

                        <div className="text-right text-[#838383]">
                            <span onClick={() => (setStepUpload(false))} className="hover:text-white cursor-pointer">back</span>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-gray-300 disabled:bg-gray-500 text-black py-2 px-4 rounded-md transition-colors"
                        >
                            {isLoading ? `Uploading ${progress}%...` : 'Upload'}
                        </button>
                    </form>
                </Modal>
            ) : (
                <Modal isOpen={isOpen} onClose={onClose} title={"Upload Video"}>
                    <form onSubmit={handleGetUrl} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-gray-300 disabled:bg-gray-500 text-black py-2 px-4 rounded-md transition-colors"
                        >
                            {isLoading ? 'Next..' : 'Next'}
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    )
}