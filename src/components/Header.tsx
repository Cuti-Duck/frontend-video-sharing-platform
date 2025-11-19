"use client";

import Link from "next/link";
import { Search, Upload, User } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

export function Header() {
  const { toggleSidebar } = useSidebar();
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" className="flex-shrink-0">
          <g fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="8" width="48" height="10" fill="#a0e9ff" stroke="#000" />
            <rect x="4" y="18" width="48" height="30" fill="white" stroke="#000" />
            <rect x="4" y="48" width="48" height="8" fill="#a0e9ff" stroke="#000" />
            <circle cx="10" cy="13" r="1" fill="black" stroke="none" />
            <circle cx="15" cy="13" r="1" fill="black" stroke="none" />
            <circle cx="20" cy="13" r="1" fill="black" stroke="none" />
            <polygon points="23,26 38,33 23,40" fill="#00aeff" stroke="#000" />
            <circle cx="50" cy="17" r="10" fill="#ffdd40" stroke="#000" />
            <line x1="50" y1="12" x2="44" y2="20" stroke="#000" />
            <line x1="44" y1="20" x2="56" y2="20" stroke="#000" />
            <circle cx="50" cy="12" r="2" fill="white" stroke="#000" />
            <circle cx="44" cy="20" r="2" fill="white" stroke="#000" />
            <circle cx="56" cy="20" r="2" fill="white" stroke="#000" />
          </g>
        </svg>

        <Link href="/" className="text-xl font-bold text-white-800 flex-shrink-0">
          VideoShare
        </Link>

        {/* Thanh tìm kiếm ở giữa */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm video..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Các nút bên phải */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <Link href="/upload" className="flex items-center space-x-1 text-white-800 hover:text-red-600">
            <Upload className="w-5 h-5" />
            <span>Upload</span>
          </Link>
          <Link href="/auth/login" className="flex items-center space-x-1 text-white-800 hover:text-red-600">
            <User className="w-5 h-5" />
            <span>Đăng nhập</span>
          </Link>
        </div>
      </div>
    </header>

  );
}