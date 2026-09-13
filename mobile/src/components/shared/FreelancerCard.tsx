import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { FreelancerProfile } from '../../api/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from './Avatar';
import { CurrencyBadge } from './CurrencyBadge';

interface FreelancerCardProps { profile: FreelancerProfile; }

export function FreelancerCard({ profile }: FreelancerCardProps) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/(tabs)/freelancers/${profile.userId}`)} className="active:opacity-80">
      <Card className="gap-3">
        <View className="flex-row gap-3 items-start">
          <Avatar uri={profile.avatarUrl} name={profile.displayName} size="md" />
          <View className="flex-1 gap-1">
            <Text className="font-semibold text-slate-900 dark:text-slate-100" numberOfLines={1}>{profile.displayName}</Text>
            {profile.headline && (
              <Text className="text-sm text-slate-500 dark:text-slate-400" numberOfLines={2}>{profile.headline}</Text>
            )}
          </View>
        </View>
        {profile.hourlyRateMinor != null && profile.currency && (
          <CurrencyBadge amountMinor={profile.hourlyRateMinor} currency={profile.currency} type="HOURLY" compact />
        )}
        {profile.skills.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {profile.skills.slice(0, 4).map((s) => (
              <Badge key={s.skill.id} label={s.skill.name} />
            ))}
          </View>
        )}
      </Card>
    </Pressable>
  );
}
