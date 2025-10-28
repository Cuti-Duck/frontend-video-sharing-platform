"use client";

import Link from "next/link";
import { Home, TrendingUp, Clock, ThumbsUp, User, Settings } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

export function SideBar() {
  const { isExpanded } = useSidebar();

  return (
    <aside
      // aside is part of the flex layout, won't overlay the main content
      className={`flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? "w-64" : "w-20"}`}
      style={{ height: "calc(100vh - 64px)" }} // match header height (64px)
    >
      <nav className="px-2 py-4 h-full">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors
              ${isExpanded ? "px-3 py-2" : "p-2 justify-center"}`}
          >
            <Home className="w-5 h-5" />
            {isExpanded && <span className="ml-3">Trang chủ</span>}
          </Link>

          <Link
            href="/trending"
            className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors
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
                <Link href="/history" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                  <Clock className="w-5 h-5" />
                  <span className="ml-3">Lịch sử</span>
                </Link>

                <Link href="/liked" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="ml-3">Video đã thích</span>
                </Link>

                <hr className="my-3" />

                <Link href="/profile" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                  <User className="w-5 h-5" />
                  <span className="ml-3">Kênh của tôi</span>
                </Link>

                <Link href="/settings" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                  <Settings className="w-5 h-5" />
                  <span className="ml-3">Cài đặt</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}