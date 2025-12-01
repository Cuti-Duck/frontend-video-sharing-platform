import axiosClient from "./axiosClient";

interface CreateLivestreamMetadata {
    title: string;
    description?: string;
    thumbnail?: File;
}

interface LivestreamMetadataResponse {
    message: string;
    streamSession: {
        streamId: string;
        title: string;
        description?: string;
        thumbnailUrl?: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    }
}

const LivestreamMetadataApi = {
    CreateMetadata: async (livestreamId: string, data: CreateLivestreamMetadata) => {
        const formData = new FormData();

        if (data.title) formData.append("title", data.title);
        if (data.description) formData.append("description", data.description);
        if (data.thumbnail) {
            console.log("📸 Appending thumbnail:", data.thumbnail.name);
            formData.append("thumbnail", data.thumbnail);
        }

        try {
            console.log("📤 Sending metadata to /livestreams/metadata");

            const response = await axiosClient.post<LivestreamMetadataResponse>(
                "/livestreams/metadata",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log("=== METADATA API RESPONSE ===");
            console.log("Full response:", response.data);

            // API trả về { message, streamSession: { streamId, title, description, thumbnailUrl, ... } }
            const streamSession = response.data.streamSession;

            console.log("=== EXTRACTED DATA ===");
            console.log("streamId:", streamSession.streamId);
            console.log("title:", streamSession.title);
            console.log("description:", streamSession.description);
            console.log("thumbnailUrl:", streamSession.thumbnailUrl);

            // Normalize response
            const normalized = {
                livestreamId: streamSession.streamId,
                title: streamSession.title || data.title,
                description: streamSession.description || data.description,
                thumbnailUrl: streamSession.thumbnailUrl || "",
            };

            console.log("✅ Normalized metadata:", normalized);

            return {
                ...response,
                data: normalized,
            };
        } catch (error) {
            console.error("=== METADATA API ERROR ===");
            console.error("Error:", error);
            throw error;
        }
    },

    GetMetadata: (livestreamId: string) => {
        return axiosClient.get(`/livestreams/${livestreamId}/metadata`);
    },

    UpdateTitle: (livestreamId: string, title: string) => {
        return axiosClient.put(`/livestreams/${livestreamId}/metadata`, { title });
    },

    UpdateDescription: (livestreamId: string, description: string) => {
        return axiosClient.put(`/livestreams/${livestreamId}/metadata`, { description });
    },

    UploadThumbnail: async (livestreamId: string, thumbnail: File) => {
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);

        return axiosClient.post(
            `/livestreams/${livestreamId}/metadata/thumbnail`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    },
}

export default LivestreamMetadataApi;