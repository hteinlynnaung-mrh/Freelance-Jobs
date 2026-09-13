import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, showBack, right }: ScreenHeaderProps) {
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      {showBack && (
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 active:opacity-60">
          <Text className="text-2xl text-indigo-600">←</Text>
        </Pressable>
      )}
      <Text className="flex-1 text-lg font-semibold text-slate-900 dark:text-slate-100" numberOfLines={1}>{title}</Text>
      {right && <View>{right}</View>}
    </View>
  );
}
