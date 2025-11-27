"use client";

import Link from "next/link";
import { Home, TrendingUp, Clock, ThumbsUp, User, Settings, Radio } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import LivestreamApi from "@/lib/livestreamApi";
import { useLivestream } from "@/context/LiveStreamContext";

interface MyLivestream {
  playbackUrl: string;
  title?: string;
  description?: string;
}

export function SideBar() {
  const { isExpanded } = useSidebar();
  const { isAuthenticated, user } = useAuth();
  const [myLivestream, setMyLivestream] = useState<MyLivestream | null>(null);
  const { isStreaming, streamInfo } = useLivestream();

  // Check livestream từ localStorage
  useEffect(() => {
    const checkMyLivestream = () => {
      if (!isAuthenticated) {
        setMyLivestream(null);
        return;
      }

      try {
        const savedStream = localStorage.getItem("myLivestream");
        if (savedStream) {
          const parsed = JSON.parse(savedStream);
          if (parsed.playbackUrl) {
            setMyLivestream(parsed);
          }
        }
      } catch (error) {
        console.error("Error reading localStorage:", error);
        setMyLivestream(null);
      }
    };

    checkMyLivestream();

    window.addEventListener("livestreamCreated", checkMyLivestream);
    window.addEventListener("storage", checkMyLivestream);

    return () => {
      window.removeEventListener("livestreamCreated", checkMyLivestream);
      window.removeEventListener("storage", checkMyLivestream);
    };
  }, [isAuthenticated]);

  const getLivestreamUrl = () => {
    const stream = streamInfo || myLivestream;
    if (!stream) return "/live";

    const params = new URLSearchParams();
    params.set("url", stream.playbackUrl);
    if (stream.title) params.set("title", stream.title);
    if (stream.description) params.set("description", stream.description);

    return `/live?${params.toString()}`;
  };

  // Kiểm tra có stream info không (đã tạo livestream)
  const hasStreamInfo = !!(streamInfo || myLivestream);

  return (
    <aside
      className={`flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? "w-64" : "w-20"}`}
      style={{ height: "calc(100vh - 64px)" }}
    >
      <nav className="px-2 py-4 h-full">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className={`flex items-center rounded-lg hover:bg-[#838383] transition-colors
              ${isExpanded ? "px-3 py-2" : "p-2 justify-center"}`}
          >
            <Home className="w-5 h-5" />
            {isExpanded && <span className="ml-3">Trang chủ</span>}
          </Link>

          <Link
            href="/trending"
            className={`flex items-center rounded-lg hover:bg-[#838383] transition-colors
              ${isExpanded ? "px-3 py-2" : "p-2 justify-center"}`}
          >
            <TrendingUp className="w-5 h-5" />
            {isExpanded && <span className="ml-3">Thịnh hành</span>}
          </Link>

          {/* remaining items only visible when expanded */}
          <div
            className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
          >

            {isExpanded && (
              <>
                <Link href="/history" className="flex items-center px-3 py-2 rounded-lg hover:bg-[#838383]">
                  <Clock className="w-5 h-5" />
                  <span className="ml-3">Lịch sử</span>
                </Link>

                <Link href="/liked" className="flex items-center px-3 py-2 rounded-lg hover:bg-[#838383]">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="ml-3">Video đã thích</span>
                </Link>

                {/* Livestream - đỏ chỉ khi OBS đang stream thực sự */}
                <Link
                  href={hasStreamInfo ? getLivestreamUrl() : "#"}
                  onClick={(e) => {
                    if (!hasStreamInfo) {
                      e.preventDefault();
                    }
                  }}
                  className={`flex items-center px-3 py-2 rounded-lg hover:bg-[#838383] transition-colors
                    ${isStreaming ? "bg-red-900/30" : ""}`}
                >
                  <div className="relative">
                    <Radio className={`w-5 h-5 ${isStreaming ? "text-red-500" : "text-white"}`} />
                    {isStreaming && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <span className={`ml-3 ${isStreaming ? "text-red-400" : "text-white"}`}>
                    {isStreaming ? "Đang Live" : "Livestream"}
                  </span>
                </Link>


                <hr className="my-3 border-gray-700" />

                {isAuthenticated && user ? (
                  <>
                    <Link href={`/channel/${user.userId}`} className="flex items-center px-3 py-2 rounded-lg hover:bg-[#838383]">
                      <User className="w-5 h-5" />
                      <span className="ml-3">Kênh của tôi</span>
                    </Link>

                    <Link href="/setting" className="flex items-center px-3 py-2 rounded-lg hover:bg-[#838383]">
                      <Settings className="w-5 h-5" />
                      <span className="ml-3">Cài đặt</span>
                    </Link>
                  </>
                ) : (
                  <Link href="/auth/login" className="flex items-center px-3 py-2 rounded-lg hover:bg-[#838383]">
                    <User className="w-5 h-5" />
                    <span className="ml-3">Đăng nhập</span>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}