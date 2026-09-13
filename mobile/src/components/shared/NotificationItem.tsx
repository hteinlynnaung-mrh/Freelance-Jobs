import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Notification } from '../../api/types';

interface NotificationItemProps {
  notification: Notification;
  onPress?: () => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const isRead = !!notification.readAt;
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-3 flex-row gap-3 items-start border-b border-slate-100 dark:border-slate-800 ${
        isRead ? '' : 'bg-indigo-50 dark:bg-indigo-900/20'
      } active:opacity-70`}
    >
      {!isRead && <View className="mt-2 w-2 h-2 rounded-full bg-indigo-500" />}
      {isRead && <View className="mt-2 w-2 h-2" />}
      <View className="flex-1 gap-1">
        <Text className="font-medium text-slate-900 dark:text-slate-100 text-sm">{notification.title}</Text>
        <Text className="text-slate-500 dark:text-slate-400 text-sm">{notification.body}</Text>
        <Text className="text-xs text-slate-400">{new Date(notification.createdAt).toLocaleDateString()}</Text>
      </View>
    </Pressable>
  );
}
