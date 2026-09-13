import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useConversations } from '../../../src/api/hooks/useConversations';
import { useAuth } from '../../../src/auth/AuthContext';
import { Avatar } from '../../../src/components/shared/Avatar';
import { EmptyState } from '../../../src/components/ui/EmptyState';
import { ErrorBanner } from '../../../src/components/ui/ErrorBanner';
import { LoadingSpinner } from '../../../src/components/ui/LoadingSpinner';
import { useI18n } from '../../../src/i18n/I18nProvider';

export default function MessagesScreen() {
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const { data, isLoading, error } = useConversations();
  const conversations = data?.data ?? [];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top']}>
      <View className="px-4 pt-4 pb-2 bg-white dark:bg-slate-900">
        <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('messages')}</Text>
      </View>
      {error && <ErrorBanner message={t('somethingWentWrong')} />}
      {isLoading ? (
        <LoadingSpinner fullscreen />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(c) => c.id}
          renderItem={({ item: conv }) => {
            const other = conv.participants.find((p) => p.userId !== user?.id);
            const otherName = other?.user.freelancerProfile?.displayName ?? other?.user.clientProfile?.displayName ?? other?.user.email ?? 'Unknown';
            const otherAvatar = other?.user.freelancerProfile?.avatarUrl ?? other?.user.clientProfile?.avatarUrl;
            const lastMsg = conv.messages[0];
            return (
              <Pressable
                onPress={() => router.push(`/(tabs)/messages/${conv.id}`)}
                className="flex-row items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 active:opacity-70"
              >
                <Avatar uri={otherAvatar} name={otherName} size="md" />
                <View className="flex-1 gap-0.5">
                  <Text className="font-semibold text-slate-900 dark:text-slate-100" numberOfLines={1}>{otherName}</Text>
                  {lastMsg && <Text className="text-sm text-slate-400" numberOfLines={1}>{lastMsg.body}</Text>}
                </View>
                <Text className="text-xs text-slate-400">
                  {lastMsg ? new Date(lastMsg.createdAt).toLocaleDateString() : ''}
                </Text>
              </Pressable>
            );
          }}
          ListEmptyComponent={<EmptyState icon="💬" title={t('noMessages')} />}
        />
      )}
    </SafeAreaView>
  );
}
