import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';
import type { ApiEnvelope, Notification } from '../types';

export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => ['notifications', 'list'] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => api<ApiEnvelope<Notification[]>>('/api/v1/notifications'),
    refetchInterval: 30_000,
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/v1/notifications/${id}/read`, { method: 'POST' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.list() }),
  });
}
