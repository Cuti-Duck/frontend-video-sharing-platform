import { useState } from "react";
import { CustomButton } from "./CustomButton";
import AvatarModal from "./AvatarModal";
import UpdateProfileModal from "./UpdateProfileModal";

interface ChannelCardProps {
    userId: string;
    avatarUrl: string;
    name: string;
    gender?: string;
    birthDate?: string;
    phoneNumber?: string;
    subscribersCount: number;
    videoCount: number;
}

export function ProfileCard( {userId, avatarUrl, name, gender, birthDate, phoneNumber, subscribersCount, videoCount}: ChannelCardProps) {
    const [showImageModal,setShowImageModal] = useState(false)
    const [showUpdateProfileModal,setShowUpdateProfileModal] = useState(false)

    return (
        <div>
            <div className="flex items-center gap-6">
                <div className="w-[50%] sm:w-[40%] md:w-[30%] lg:w-[10%]">
                    <img src={avatarUrl} alt={name} className="w-full h-auto aspect-square object-cover rounded-full"/>
                </div>
                
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-bold">{name}</h1>
                    <h4 className="text-xl">{subscribersCount} subscribers • {videoCount} videos</h4>
                    <div className="flex flex-row items-center gap-3">
                        <CustomButton content="Update Profile" userId={userId} onClick={()=>{setShowUpdateProfileModal(true)}}/>
                        <CustomButton content="Upload Avatar" userId={userId} onClick={()=>{setShowImageModal(true)}}/>
                    </div>
                </div>
            </div>
            <AvatarModal isOpen={showImageModal} onClose={()=> {setShowImageModal(false)}}/>
            <UpdateProfileModal isOpen={showUpdateProfileModal} onClose={()=>{setShowUpdateProfileModal(false)}}
                                name={name} gender={gender} birthDate={birthDate} phoneNumber={phoneNumber}/> 
                                
        </div>
        
    );
}