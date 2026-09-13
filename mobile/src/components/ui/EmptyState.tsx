import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onPress: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-16 px-6 gap-4">
      {icon && <Text className="text-5xl">{icon}</Text>}
      <Text className="text-xl font-semibold text-slate-800 dark:text-slate-100 text-center">{title}</Text>
      {description && (
        <Text className="text-slate-500 dark:text-slate-400 text-center leading-relaxed">{description}</Text>
      )}
      {action && <Button label={action.label} onPress={action.onPress} variant="secondary" />}
    </View>
  );
}
