import { Bell } from "lucide-react";

interface SubcribeButtonProps {
    userId: string;
  onClick?: () => void;
}

export function SubcribeButton({userId, onClick }: SubcribeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white text-black font-medium px-6 py-2 rounded-full
        hover:bg-gray-200 transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-gray-300
      "> 
        <p className="font-bold">Subscribe</p>
    </button>
  );
}