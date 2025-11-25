'use client'
import React, { useState } from "react";
import Modal from "./Modal";
import UserApi from "@/lib/userApi";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({isOpen, onClose}: ImageModalProps) {
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!image) return
        setIsLoading(true);

        try{
            console.log("data is sending")

            const formData = new FormData();
            formData.append('File',image);

            const response = await UserApi.PostAvatar(formData)

            console.log("success")
            window.location.reload();

        }catch (error) {
            console.error('Error during login:', error);
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Avatar">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input 
                        type="file"
                        onChange={handlePreview}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-gray-300 disabled:bg-gray-500 text-black py-2 px-4 rounded-md transition-colors"
                    >
                    {isLoading ? 'Update...' : 'Update'}
                </button>
            </form>
        </Modal>
    )
}