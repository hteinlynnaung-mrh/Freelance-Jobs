import React from 'react';
import { Image, Text, View } from 'react-native';

interface AvatarProps {
  uri?: string | null;
  name?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = { sm: 32, md: 40, lg: 56, xl: 80 };
const textSizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl', xl: 'text-3xl' };

export function Avatar({ uri, name, size = 'md' }: AvatarProps) {
  const px = sizes[size];
  const initials = name?.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() ?? '?';
  if (uri) {
    return <Image source={{ uri }} style={{ width: px, height: px, borderRadius: px / 2 }} />;
  }
  return (
    <View
      className="bg-indigo-100 dark:bg-indigo-900 items-center justify-center"
      style={{ width: px, height: px, borderRadius: px / 2 }}
    >
      <Text className={`${textSizes[size]} font-semibold text-indigo-700 dark:text-indigo-300`}>{initials}</Text>
    </View>
  );
}
