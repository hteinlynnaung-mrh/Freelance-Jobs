import React from 'react';
import { Text, View } from 'react-native';

type Color = 'default' | 'green' | 'yellow' | 'red' | 'indigo' | 'blue';

interface BadgeProps {
  label: string;
  color?: Color;
  className?: string;
}

const colorMap: Record<Color, { bg: string; text: string }> = {
  default: { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-600 dark:text-slate-300' },
  green:   { bg: 'bg-emerald-100 dark:bg-emerald-900', text: 'text-emerald-700 dark:text-emerald-300' },
  yellow:  { bg: 'bg-amber-100 dark:bg-amber-900', text: 'text-amber-700 dark:text-amber-300' },
  red:     { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300' },
  indigo:  { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-700 dark:text-indigo-300' },
  blue:    { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300' },
};

export function Badge({ label, color = 'default', className }: BadgeProps) {
  const { bg, text } = colorMap[color];
  return (
    <View className={`${bg} px-2 py-1 rounded-md self-start ${className ?? ''}`}>
      <Text className={`${text} text-xs font-medium`}>{label}</Text>
    </View>
  );
}
