import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './Button';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorBanner({ message, onRetry, retryLabel = 'Retry' }: ErrorBannerProps) {
  return (
    <View className="mx-4 mt-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-4 gap-2">
      <Text className="text-red-700 dark:text-red-300 font-medium">{message}</Text>
      {onRetry && (
        <Button label={retryLabel} onPress={onRetry} variant="danger" size="sm" />
      )}
    </View>
  );
}
