'use client';

import { timeAgo } from "@/utils/time";
import { useState } from "react";

interface DescriptionCardProps {
    viewCount: number;
    uploadAt: string;
    description: string;
}

export function DescriptionCard({viewCount, uploadAt, description}: DescriptionCardProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);
    return (
        <div className="bg-[#D1D5DB]/20 rounded-lg px-4 py-3 mb-6">
            <h3 className="text-lg font-bold">{viewCount} views • {timeAgo(uploadAt)}</h3>
            <p className={`text-md ${expanded ? "line-clamp-none" : "line-clamp-2"} transition-all`}>{description}</p>
            {description.split(" ").length > 20 && (
                <button
                onClick={toggleExpanded}
                className="text-white text-sm mt-2 hover:underline"
                >
                {expanded ? "Show less" : "Show more"}
                </button>
            )}
        </div>
    );
}