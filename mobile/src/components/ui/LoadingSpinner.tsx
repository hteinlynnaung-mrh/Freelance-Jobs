import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'small' | 'large';
  fullscreen?: boolean;
}

export function LoadingSpinner({ label, size = 'large', fullscreen }: LoadingSpinnerProps) {
  return (
    <View className={`items-center justify-center gap-3 ${fullscreen ? 'flex-1' : 'py-12'}`}>
      <ActivityIndicator size={size} color="#6366f1" />
      {label && <Text className="text-slate-500 dark:text-slate-400 text-sm">{label}</Text>}
    </View>
  );
}
