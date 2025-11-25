interface CustomButtonProps {
  content: string;
  userId: string;
  onClick?: () => void;
}

export function CustomButton({content, userId, onClick }: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white font-medium px-6 py-2 rounded-full
        hover:bg-gray-200 transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-gray-300
      "> 
        <p className="font-bold text-black">{content}</p>
    </button>
  );
}