"use client";

import Link from "next/link";
import { Bell, Upload, User } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { DownDropMenu } from "./DownDropMenu";
import UploadVideoModal from "./UploadVideoModal";
import { Video } from "lucide-react";
import CreateLivestreamModal from "./CreateLivestreamModal";
import SearchBar from "./SearchBar";
import { useNotification } from "@/context/NotificationContext";
import { NotificationPanel } from "./NotificationPanel";
import { useRouter } from "next/navigation";


export function Header() {
  const { toggleSidebar } = useSidebar();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUpdateVideo, setShowUpdateVideo] = useState(false);
  const [showLivestream, setShowLivestream] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { unreadCount } = useNotification();

  console.log('Header - Auth state:', { user, isAuthenticated, isLoading });

  const router = useRouter()
  return (
    <header className="border-gray-200 sticky top-0 z-50">
      <div className="bg-black px-4 py-3 flex items-center justify-between">

        <button
          aria-label="Menu"
          onClick={toggleSidebar}
          className="p-2 hover:bg-yt-button-hover rounded-full"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        {/* Logo bên trái */}
        <div onClick={()=>router.push("/")}  className="flex flex-row items-center cursor-default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" className="flex-shrink-0">
              <g fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8" width="48" height="10" fill="#fdba74" stroke="#000" />
                <rect x="4" y="18" width="48" height="30" fill="#fdba74" stroke="#000" />
                <rect x="4" y="48" width="48" height="8" fill="#fdba74" stroke="#000" />
                <circle cx="10" cy="13" r="1" fill="black" stroke="none" />
                <circle cx="15" cy="13" r="1" fill="black" stroke="none" />
                <circle cx="20" cy="13" r="1" fill="black" stroke="none" /> 
                <polygon points="23,26 38,33 23,40" fill="#ffffffff" stroke="#000" />
                {/* <circle cx="50" cy="17" r="10" fill="#ffdd40" stroke="#000" />
                <line x1="50" y1="12" x2="44" y2="20" stroke="#000" />
                <line x1="44" y1="20" x2="56" y2="20" stroke="#000" />
                <circle cx="50" cy="12" r="2" fill="white" stroke="#000" />
                <circle cx="44" cy="20" r="2" fill="white" stroke="#000" />
                <circle cx="56" cy="20" r="2" fill="white" stroke="#000" /> */}
              </g>
            </svg>

              <div className="hidden md:flex flex-row ml-2">
                <span className="text-xl font-bold">Video</span>
                <span className="text-xl font-bold bg-orange-300 text-black">Share</span>
              </div>
        </div>
        

        

        {/* Thanh tìm kiếm ở giữa */}
        <div className="flex-1 mx-2 sm:mx-4">
          <SearchBar />
        </div>

        {/* Các nút bên phải */}
        <div className="flex flex-row items-center flex-shrink-0">

          {isLoading ? (
            <span className="text-white text-sm">Loading...</span>
          ) : user ? (
            <div className="flex items-center gap-5">
              <button onClick={() => setShowUpdateVideo(true)} title="Upload video" className="flex items-center space-x-1 text-white-800 hover:text-[#838383]">
                <Upload className="w-5 h-5" />
              </button>

              <button onClick={() => setShowLivestream(true)} className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors" title="Create Livestream">
                <Video className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <Bell className="w-6 h-6 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <DownDropMenu user={user} logout={logout} ></DownDropMenu>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="flex items-center space-x-1 text-white-800 hover:text-[#838383]">
              <User className="w-5 h-5" />
              <span>Đăng nhập</span>
            </button>
          )}
        </div>
      </div>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
      {user &&
        <UploadVideoModal
          isOpen={showUpdateVideo}
          onClose={() => setShowUpdateVideo(false)}
          channelId={user.channelId}
        />
      }

      {user && (
        <>
          <UploadVideoModal
            isOpen={showUpdateVideo}
            onClose={() => setShowUpdateVideo(false)}
            channelId={user.channelId}
          />
          <CreateLivestreamModal
            isOpen={showLivestream}
            onClose={() => setShowLivestream(false)}
          />
        </>
      )}

       <NotificationPanel isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </header>

  );
}