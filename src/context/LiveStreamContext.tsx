"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LivestreamContextType {
    isStreaming: boolean;
    setIsStreaming: (value: boolean) => void;
    streamInfo: {
        playbackUrl: string;
        title?: string;
        description?: string;
        thumbnailUrl?: string;
    } | null;
    setStreamInfo: (info: { playbackUrl: string; title?: string; description?: string; thumbnailUrl?: string; } | null) => void;
}

const LivestreamContext = createContext<LivestreamContextType | undefined>(undefined);

export function LivestreamProvider({ children }: { children: ReactNode }) {
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamInfo, setStreamInfo] = useState<{
        playbackUrl: string;
        title?: string;
        description?: string;
        thumbnailUrl?: string;
    } | null>(null);

    // Load từ localStorage khi mount
    useEffect(() => {
        const saved = localStorage.getItem("myLivestream");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setStreamInfo(parsed);
            } catch (e) {
                console.error("Error parsing livestream data:", e);
            }
        }

        const savedStreaming = localStorage.getItem("isStreaming");
        if (savedStreaming === "true") {
            setIsStreaming(true);
        }
    }, []);

    // Sync isStreaming với localStorage
    useEffect(() => {
        localStorage.setItem("isStreaming", isStreaming.toString());
    }, [isStreaming]);

    return (
        <LivestreamContext.Provider value={{ isStreaming, setIsStreaming, streamInfo, setStreamInfo }}>
            {children}
        </LivestreamContext.Provider>
    );
}

export function useLivestream() {
    const context = useContext(LivestreamContext);
    if (!context) {
        throw new Error("useLivestream must be used within LivestreamProvider");
    }
    return context;
}