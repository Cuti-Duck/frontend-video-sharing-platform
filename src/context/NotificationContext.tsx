'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import NotificationApi from "@/lib/notificationApi";
import { Notification } from "@/types/notification";

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    fetchNotifications: (unreadOnly?: boolean) => Promise<void>;
    markAsRead: (notificationId: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (notificationId: string) => Promise<void>;
    refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Lấy danh sách thông báo
    const fetchNotifications = async (unreadOnly: boolean = false) => {
        try {
            setIsLoading(true);
            const response = await NotificationApi.GetNotifications({
                unreadOnly,
                limit: 20,
            });

            console.log("API Response:", response);
            console.log("Response Data:", response.data);

            let notifs = [];

            if (response.data?.data?.notifications && Array.isArray(response.data.data.notifications)) {
                notifs = response.data.data.notifications;
                console.log("Parsed from response.data.data.notifications");
            } else if (response.data?.notifications && Array.isArray(response.data.notifications)) {
                notifs = response.data.notifications;
                console.log("Parsed from response.data.notifications");
            } else if (Array.isArray(response.data?.data)) {
                notifs = response.data.data;
                console.log("Parsed from response.data.data");
            } else if (Array.isArray(response.data)) {
                notifs = response.data;
                console.log("Parsed from response.data");
            }

            console.log("Final notifs:", notifs);
            notifs.forEach((n: any) => {
                console.log(`Notification: ${n.title}, RelatedVideoId: ${n.relatedVideoId}`);
            });
            setNotifications(notifs);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setNotifications([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Lấy số lượng thông báo chưa đọc
    const fetchUnreadCount = async () => {
        try {
            const response = await NotificationApi.GetUnreadCount();

            console.log("Unread API Response:", response);

            let count = 0;
            if (response.data?.data?.unreadCount !== undefined) {
                count = response.data.data.unreadCount;
            } else if (response.data?.unreadCount !== undefined) {
                count = response.data.unreadCount;
            } else if (response.data?.count !== undefined) {
                count = response.data.count;
            } else if (typeof response.data === 'number') {
                count = response.data;
            }

            console.log("Final unread count:", count);
            setUnreadCount(count);
        } catch (error) {
            console.error("Error fetching unread count:", error);
        }
    };

    // Đánh dấu một thông báo là đã đọc
    const markAsRead = async (notificationId: string) => {
        try {
            await NotificationApi.MarkAsRead(notificationId);
            setNotifications((prev) =>
                prev.map((n) =>
                    n.notificationId === notificationId ? { ...n, isRead: true } : n
                )
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // Đánh dấu tất cả thông báo là đã đọc
    const markAllAsRead = async () => {
        try {
            await NotificationApi.MarkAllAsRead();
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, isRead: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking all as read:", error);
        }
    };

    // Xóa một thông báo
    const deleteNotification = async (notificationId: string) => {
        try {
            await NotificationApi.DeleteNotification(notificationId);
            setNotifications((prev) =>
                prev.filter((n) => n.notificationId !== notificationId)
            );
            const deleted = notifications.find((n) => n.notificationId === notificationId);
            if (deleted && !deleted.isRead) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    // Refresh tất cả thông báo
    const refreshNotifications = async () => {
        await Promise.all([
            fetchNotifications(),
            fetchUnreadCount(),
        ]);
    };

    // Load notifications khi component mount - GỌI 1 LẦN DUY NHẤT
    useEffect(() => {
        console.log("NotificationContext mounted - fetching notifications");
        refreshNotifications();

        // Poll mỗi 10 giây để lấy thông báo mới
        const interval = setInterval(() => {
            console.log("Polling notifications...");
            refreshNotifications();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                isLoading,
                fetchNotifications,
                markAsRead,
                markAllAsRead,
                deleteNotification,
                refreshNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within NotificationProvider");
    }
    return context;
}