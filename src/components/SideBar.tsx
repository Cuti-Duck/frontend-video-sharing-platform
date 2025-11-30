"use client";

import Link from "next/link";
import { Home,ThumbsUp, User} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";

export function SideBar() {
  const { isExpanded } = useSidebar();
  const { isAuthenticated, user } = useAuth();

  return (
    <aside
      // aside is part of the flex layout, won't overlay the main content
      className={`flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "w-64" : "w-0 md:w-15"} `}
      style={{ height: "calc(100vh - 64px)" }}>
      <nav className="px-2 py-4 h-full">
        <div className="flex flex-col gap-1">
          <Link href="/" className={`flex items-center rounded-lg hover:bg-[#838383] transition-colors
              ${isExpanded ? "px-3 py-2" : "p-2 justify-center"}`}
          >
            <Home className="w-5 h-5" />
            {isExpanded && <span className="ml-3">Home page</span>}
          </Link>
              
          <Link href="/liked" className={`flex items-center rounded-lg hover:bg-[#838383] transition-colors
              ${isExpanded ? "px-3 py-2" : "p-2 justify-center"}`}>
            <ThumbsUp className="w-5 h-5" />
            {isExpanded && <span className="ml-3">Liked video</span>}
          </Link>
          <hr className="my-3 border-gray-700" />

          {isAuthenticated && user &&
            <>
              <Link href={`/channel/${user.userId}`} className={`flex items-center rounded-lg hover:bg-[#838383] transition-colors
              ${isExpanded ? "px-3 py-2" : "p-2 justify-center"}`}>
                <User className="w-5 h-5" />
                {isExpanded && <span className="ml-3">My channel</span>}
              </Link>

            </>
          } 
        </div>
        {/* </div> */}
      </nav>
    </aside>
  );
}