export interface Livestream {
    livestreamId: string;
    channelId: string;
    title: string;
    description?: string;
    streamKey?: string;
    streamUrl?: string;
    status: "pending" | "live" | "ended";
    viewerCount?: number;
    createdAt: string;
    endedAt?: string;
}

export interface CreateLivestreamResponse {
    livestreamId: string;
    streamKey: string;
    streamUrl: string;
    ingestUrl: string;
}  