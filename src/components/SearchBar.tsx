"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Điều hướng đến trang kết quả tìm kiếm
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex-1 flex justify-center px-2">
      <form onSubmit={handleSubmit} className="w-full max-w-md relative">
        {/* Icon Search */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search video..."
          className="
            w-full pl-10 pr-4 py-2
            border border-gray-300 rounded-full
            bg-gray-800 text-white
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-500
            transition-colors duration-200
          "
        />

        {/* Optional: nút submit ẩn, dùng Enter */}
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
}
