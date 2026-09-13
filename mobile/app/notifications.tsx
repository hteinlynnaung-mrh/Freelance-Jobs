import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotifications, useMarkNotificationRead } from '../src/api/hooks/useNotifications';
import { NotificationItem } from '../src/components/shared/NotificationItem';
import { EmptyState } from '../src/components/ui/EmptyState';
import { LoadingSpinner } from '../src/components/ui/LoadingSpinner';
import { ScreenHeader } from '../src/components/ui/ScreenHeader';
import { useI18n } from '../src/i18n/I18nProvider';

export default function NotificationsScreen() {
  const { t } = useI18n();
  const { data, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const notifications = data?.data ?? [];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
      <ScreenHeader title={t('notifications')} showBack />
      {isLoading ? (
        <LoadingSpinner fullscreen />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(n) => n.id}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={() => { if (!item.readAt) markRead.mutate(item.id); }}
            />
          )}
          ListEmptyComponent={
            <EmptyState icon="🔔" title={t('noNotifications')} />
          }
        />
      )}
    </SafeAreaView>
  );
}
