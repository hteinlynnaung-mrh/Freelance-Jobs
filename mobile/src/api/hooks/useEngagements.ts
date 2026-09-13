import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';
import type { ApiEnvelope, Engagement } from '../types';

export const engagementKeys = {
  all: ['engagements'] as const,
  list: () => ['engagements', 'list'] as const,
  detail: (id: string) => ['engagements', 'detail', id] as const,
};

export function useEngagements() {
  return useQuery({
    queryKey: engagementKeys.list(),
    queryFn: () => api<ApiEnvelope<Engagement[]>>('/api/v1/engagements'),
  });
}

export function useEngagement(id: string) {
  return useQuery({
    queryKey: engagementKeys.detail(id),
    queryFn: () => api<ApiEnvelope<Engagement>>(`/api/v1/engagements/${id}`),
    enabled: !!id,
  });
}

export function useSubmitEngagement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/v1/engagements/${id}/submit`, { method: 'POST' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: engagementKeys.all }),
  });
}

export function useCompleteEngagement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/v1/engagements/${id}/complete`, { method: 'POST' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: engagementKeys.all }),
  });
}

export function useCancelEngagement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/v1/engagements/${id}/cancel`, { method: 'POST' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: engagementKeys.all }),
  });
}
