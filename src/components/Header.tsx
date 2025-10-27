import Link from "next/link";
import { Search, Upload, User } from "lucide-react";

export function Header() {
  return (
    <header className="border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        
        {/* Logo bên trái */}
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