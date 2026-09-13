import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFreelancers } from '../../../src/api/hooks/useProfiles';
import { FreelancerCard } from '../../../src/components/shared/FreelancerCard';
import { EmptyState } from '../../../src/components/ui/EmptyState';
import { ErrorBanner } from '../../../src/components/ui/ErrorBanner';
import { LoadingSpinner } from '../../../src/components/ui/LoadingSpinner';
import { useI18n } from '../../../src/i18n/I18nProvider';

export default function FreelancersScreen() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const { data, isLoading, error, refetch } = useFreelancers({ q: query || undefined });
  const profiles = data?.data ?? [];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['top']}>
      <View className="px-4 pt-4 pb-2 bg-white dark:bg-slate-900 gap-3">
        <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('freelancers')}</Text>
        <View className="flex-row items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-3 gap-2">
          <Text className="text-slate-400 text-lg">🔍</Text>
          <TextInput
            className="flex-1 py-3 text-slate-900 dark:text-slate-100 text-base"
            placeholder={t('searchProjects')}
            placeholderTextColor="#94a3b8"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>
      {error && <ErrorBanner message={t('somethingWentWrong')} onRetry={refetch} />}
      {isLoading ? (
        <LoadingSpinner fullscreen />
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-4 pt-3">
              <FreelancerCard profile={item} />
            </View>
          )}
          ListEmptyComponent={<EmptyState icon="👥" title={t('noFreelancers')} />}
          contentContainerClassName="pb-8"
        />
      )}
    </SafeAreaView>
  );
}
