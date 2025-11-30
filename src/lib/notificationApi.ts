import axiosClient from "./axiosClient";

interface GetNotificationsParams {
    unreadOnly?: boolean;
    limit?: number;
    cursor?: string;
}

const NotificationApi = {
    // Lấy danh sách thông báo
    GetNotifications: (params?: GetNotificationsParams) =>
        axiosClient.get("/notifications", { params }),

    // Lấy số lượng thông báo chưa đọc
    GetUnreadCount: () =>
        axiosClient.get("/notifications/unread-count"),

    // Đánh dấu một thông báo là đã đọc
    MarkAsRead: (notificationId: string) =>
        axiosClient.put(`/notifications/${notificationId}/read`),

    // Đánh dấu tất cả thông báo là đã đọc
    MarkAllAsRead: () =>
        axiosClient.put("/notifications/read-all"),

    // Xóa một thông báo
    DeleteNotification: (notificationId: string) =>
        axiosClient.delete(`/notifications/${notificationId}`),
};

export default NotificationApi;