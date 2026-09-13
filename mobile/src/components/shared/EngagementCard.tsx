import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { Engagement, EngagementStatus } from '../../api/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

const statusColor: Record<EngagementStatus, 'default' | 'green' | 'yellow' | 'red' | 'indigo' | 'blue'> = {
  ACTIVE: 'green', SUBMITTED_FOR_REVIEW: 'yellow', COMPLETED: 'indigo', CANCELLED: 'red',
};

interface EngagementCardProps { engagement: Engagement; }

export function EngagementCard({ engagement }: EngagementCardProps) {
  const router = useRouter();
  const other = engagement.freelancer.freelancerProfile?.displayName ??
    engagement.client.clientProfile?.displayName ?? 'Counterpart';
  return (
    <Pressable onPress={() => router.push(`/(tabs)/engagements/${engagement.id}`)} className="active:opacity-80">
      <Card className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 font-semibold text-slate-900 dark:text-slate-100" numberOfLines={1}>
            {engagement.project.title}
          </Text>
          <Badge label={engagement.status.replace('_', ' ')} color={statusColor[engagement.status]} />
        </View>
        <Text className="text-sm text-slate-500 dark:text-slate-400">{other}</Text>
        {engagement.startDate && (
          <Text className="text-xs text-slate-400">Started {new Date(engagement.startDate).toLocaleDateString()}</Text>
        )}
      </Card>
    </Pressable>
  );
}
