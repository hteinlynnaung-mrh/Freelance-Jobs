import { Redirect } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../src/auth/AuthContext';
import { LoadingSpinner } from '../src/components/ui/LoadingSpinner';

export default function Index() {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) {
    return (
      <View className="flex-1 bg-white dark:bg-slate-900">
        <LoadingSpinner fullscreen label="Loading Archer…" />
      </View>
    );
  }
  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/login'} />;
}
