import Link from "next/link";
import { Home, TrendingUp, Clock, ThumbsUp, User, Settings } from "lucide-react";

export function SideBar() {
  return (
    <aside className="w-64 h-screen sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-2">
        <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-white-800">
          <Home className="w-5 h-5" />
          <span>Trang chủ</span>
        </Link>
        
        <Link href="/trending" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-white-800">
          <TrendingUp className="w-5 h-5" />
          <span>Thịnh hành</span>
        </Link>
        
        <Link href="/history" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-white-800">
          <Clock className="w-5 h-5" />
          <span>Lịch sử</span>
        </Link>
        
        <Link href="/liked" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-white-800">
          <ThumbsUp className="w-5 h-5" />
          <span>Video đã thích</span>
        </Link>
        
        <hr className="my-4" />
        
        <Link href="/profile" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-white-800">
          <User className="w-5 h-5" />
          <span>Kênh của tôi</span>
        </Link>
        
        <Link href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-white-800">
          <Settings className="w-5 h-5" />
          <span>Cài đặt</span>
        </Link>
      </nav>
    </aside>
  );
}