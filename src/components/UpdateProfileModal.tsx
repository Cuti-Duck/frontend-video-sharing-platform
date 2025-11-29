import { useState } from "react";
import Modal from "./Modal";
import UserApi from "@/lib/userApi";

interface UpdateProfileModalProp{
    isOpen: boolean,
    onClose: () => void
    name?: string,
    gender?: string,
    birthDate?: string,
    phoneNumber?: string
}

export default function UpdateProfileModal({isOpen,onClose, 
                                            name:initName,
                                            gender: initGender, 
                                            birthDate: initBirthDate, 
                                            phoneNumber: initPhoneNumber}: UpdateProfileModalProp){

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(initName || '');
    const [gender, setGender] = useState(initGender || '');
    const [birthDate, setBirthDate] = useState(initBirthDate || '');
    const [phoneNumber, setPhoneNumber] = useState(initPhoneNumber || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            console.log("data is sending for update profile");
            const response = await UserApi.PutProfile({name, gender, birthDate, phoneNumber});
            console.log("success");
            window.location.reload();

        }catch (error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Profile">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Birthdate</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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