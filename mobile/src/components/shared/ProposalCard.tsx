import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { Proposal, ProposalStatus } from '../../api/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CurrencyBadge } from './CurrencyBadge';

const statusColor: Record<ProposalStatus, 'default' | 'green' | 'yellow' | 'red' | 'indigo' | 'blue'> = {
  SUBMITTED: 'blue', SHORTLISTED: 'indigo', REJECTED: 'red', WITHDRAWN: 'default', ACCEPTED: 'green',
};

interface ProposalCardProps { proposal: Proposal; }

export function ProposalCard({ proposal }: ProposalCardProps) {
  const router = useRouter();
  const name = proposal.freelancer.freelancerProfile?.displayName ?? proposal.freelancer.email;
  return (
    <Pressable onPress={() => router.push(`/(tabs)/proposals/${proposal.id}`)} className="active:opacity-80">
      <Card className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 font-semibold text-slate-900 dark:text-slate-100" numberOfLines={1}>
            {proposal.project.title}
          </Text>
          <Badge label={proposal.status} color={statusColor[proposal.status]} />
        </View>
        <Text className="text-sm text-slate-500 dark:text-slate-400">By {name}</Text>
        <View className="flex-row items-center gap-3">
          <CurrencyBadge amountMinor={proposal.proposedAmountMinor} currency={proposal.currency} compact />
          {proposal.estimatedDurationDays && (
            <Text className="text-xs text-slate-400">{proposal.estimatedDurationDays}d estimate</Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
