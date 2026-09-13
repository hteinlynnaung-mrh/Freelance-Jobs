import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { Project } from '../../api/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CurrencyBadge } from './CurrencyBadge';

interface ProjectCardProps {
  project: Project;
  onSave?: () => void;
}

export function ProjectCard({ project, onSave }: ProjectCardProps) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/(tabs)/projects/${project.id}`)} className="active:opacity-80">
      <Card className="gap-3">
        <View className="flex-row items-start justify-between gap-2">
          <Text className="flex-1 text-base font-semibold text-slate-900 dark:text-slate-100" numberOfLines={2}>
            {project.title}
          </Text>
          {onSave && (
            <Pressable onPress={onSave} className="p-1">
              <Text className="text-xl">🔖</Text>
            </Pressable>
          )}
        </View>
        {project.category && (
          <Badge label={project.category.name} color="indigo" />
        )}
        <Text className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed" numberOfLines={3}>
          {project.description}
        </Text>
        <View className="flex-row items-center justify-between">
          <CurrencyBadge amountMinor={project.budgetMinor} currency={project.currency} type={project.budgetType} />
          {project.skills.slice(0, 3).length > 0 && (
            <View className="flex-row gap-1">
              {project.skills.slice(0, 3).map((s) => (
                <Badge key={s.skill.id} label={s.skill.name} color="default" />
              ))}
            </View>
          )}
        </View>
        {project.deadline && (
          <Text className="text-xs text-slate-400">
            Due {new Date(project.deadline).toLocaleDateString()}
          </Text>
        )}
      </Card>
    </Pressable>
  );
}
