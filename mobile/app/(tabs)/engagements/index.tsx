import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEngagements } from '../../../src/api/hooks/useEngagements';
import { EngagementCard } from '../../../src/components/shared/EngagementCard';
import { EmptyState } from '../../../src/components/ui/EmptyState';
import { ErrorBanner } from '../../../src/components/ui/ErrorBanner';
import { LoadingSpinner } from '../../../src/components/ui/LoadingSpinner';
import { useI18n } from '../../../src/i18n/I18nProvider';

export default function EngagementsScreen() {
  const { t } = useI18n();
  const { data, isLoading, error, refetch } = useEngagements();
  const engagements = data?.data ?? [];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top']}>
      <View className="px-4 pt-4 pb-2 bg-white dark:bg-slate-900">
        <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('engagements')}</Text>
      </View>
      {error && <ErrorBanner message={t('somethingWentWrong')} onRetry={refetch} retryLabel={t('retry')} />}
      {isLoading ? (
        <LoadingSpinner fullscreen />
      ) : (
        <FlatList
          data={engagements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-4 pt-3">
              <EngagementCard engagement={item} />
            </View>
          )}
          ListEmptyComponent={<EmptyState icon="🤝" title={t('noEngagements')} />}
          contentContainerClassName="pb-8"
        />
      )}
    </SafeAreaView>
  );
}
