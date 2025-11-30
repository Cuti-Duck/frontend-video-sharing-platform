'use client'

import { useNotification } from "@/context/NotificationContext";
import { Bell, X, Check, CheckCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
    const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, isLoading } = useNotification();
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const filteredNotifications = filter === "unread"
        ? notifications.filter((n) => !n.isRead)
        : notifications;

    const handleNotificationClick = async (notification: any) => {
        if (!notification.isRead) {
            await markAsRead(notification.notificationId);
        }
        if (notification.actionUrl) {
            window.location.href = notification.actionUrl;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="absolute right-0 top-0 h-screen w-96 bg-black border-l border-gray-800 shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <Bell className="w-6 h-6 text-white" />
                        <h2 className="text-lg font-bold text-white">Notifications</h2>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filters & Actions */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === "all"
                                    ? "bg-white text-black"
                                    : "bg-gray-800 text-gray-400 hover:text-white"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("unread")}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === "unread"
                                    ? "bg-white text-black"
                                    : "bg-gray-800 text-gray-400 hover:text-white"
                                }`}
                        >
                            Unread
                        </button>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                        >
                            <CheckCheck className="w-4 h-4" />
                            Mark all read
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Bell className="w-12 h-12 mb-2 opacity-50" />
                            <p>No notifications</p>
                        </div>
                    ) : (
                        <div className="space-y-1 p-2">
                            {filteredNotifications.map((notification) => (
                                <div
                                    key={notification.notificationId}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${notification.isRead
                                            ? "bg-gray-900 hover:bg-gray-800"
                                            : "bg-gray-800 hover:bg-gray-700"
                                        }`}
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex-1">
                                            <p className="text-white font-medium text-sm">
                                                {notification.title}
                                            </p>
                                            <p className="text-gray-400 text-xs mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-gray-500 text-xs mt-2">
                                                {new Date(notification.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-1">
                                            {!notification.isRead && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markAsRead(notification.notificationId);
                                                    }}
                                                    className="p-1 text-blue-500 hover:bg-gray-700 rounded"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteNotification(notification.notificationId);
                                                }}
                                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}