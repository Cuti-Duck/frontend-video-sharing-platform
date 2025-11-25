import { useState } from "react"
import Modal from "./Modal"
import VideoApi from "@/lib/videoApi"

interface UploadVideoModalProp{
    isOpen: boolean
    onClose: () => void
    channelId: string
}

export default function UploadVideoModal({isOpen, onClose, channelId}: UploadVideoModalProp) {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [url,setUrl] = useState('');
    const [video,setVideo] = useState<File|null>(null);
    const [isStepUpload,setStepUpload] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const handleGetUrl = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        console.log("submit");
        try{
            console.log("data sending")
            const response = await VideoApi.PostVideo({channelId,title,description});
            console.log(response);
            setUrl(response.data.uploadUrl)
            setStepUpload(true);

        }catch (error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!video) return;
        setIsLoading(true)

        try{
            console.log("video is sending")
            const response = await VideoApi.UploadVideo(url, video);
            console.log(response, "success");
        }catch (error){
            console.log(error)
        }finally{
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
                        <label className="block text-sm font-medium mb-1">Title</label>
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
                        />
                    </div>
                    <div className="text-right text-[#838383]">
                        <span onClick={()=>(setStepUpload(false))} className="hover:text-white">back</span>
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
        ):(
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