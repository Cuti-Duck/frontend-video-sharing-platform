import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react"

interface DownDropMenuProps{
    userId?: string,
    avatarUrl?: string,
    name?: string,
    logout: () => void
}

export function DownDropMenu({userId, avatarUrl, name, logout}: DownDropMenuProps){
    const router = useRouter()
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = async () => {
        await logout()
        router.push("/")
    }

    return(
        <div className="relative inline-block text-left" ref={menuRef}>
            <button onClick={() => setOpen(!isOpen)}
                    className="text-white px-4 py-2 rounded-md focus:outline-none">

                <img src={avatarUrl} alt="avatar" className="w-10 aspect-square object-cover rounded-full"/>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-[#2f2f2f] rounded-md shadow-lg z-10">
                    <Link onClick={() =>setOpen(false)} href={`/profile`} className="block px-4 py-2 hover:bg-[#838383]">Trang chủ</Link>
                    <Link onClick={() =>setOpen(false)} href={`/`} className="block px-4 py-2 hover:bg-[#838383]">Chỉnh sửa</Link>
                    <button onClick={handleLogout} className="block px-4 py-2 hover:bg-[#838383]">Logout</button>
                </div>
            )}
    </div>
    )
}