import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';
import type { ApiEnvelope, PagedEnvelope, FreelancerProfile } from '../types';

export const profileKeys = {
  me: ['profile', 'me'] as const,
  freelancers: (q?: string, skillId?: string) => ['profile', 'freelancers', q, skillId] as const,
  freelancer: (id: string) => ['profile', 'freelancer', id] as const,
};

export function useMyProfile() {
  return useQuery({
    queryKey: profileKeys.me,
    queryFn: () => api<ApiEnvelope<any>>('/api/v1/profiles/me'),
  });
}

export function useUpdateMyProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      api('/api/v1/profiles/me', { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: profileKeys.me }),
  });
}

export interface FreelancerListParams { q?: string; skillId?: string; page?: number; }

export function useFreelancers(params: FreelancerListParams = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  if (params.skillId) qs.set('skillId', params.skillId);
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString() ? `?${qs}` : '';
  return useQuery({
    queryKey: profileKeys.freelancers(params.q, params.skillId),
    queryFn: () => api<PagedEnvelope<FreelancerProfile>>(`/api/v1/profiles/freelancers${query}`),
  });
}

export function useFreelancer(userId: string) {
  return useQuery({
    queryKey: profileKeys.freelancer(userId),
    queryFn: () => api<ApiEnvelope<FreelancerProfile>>(`/api/v1/profiles/freelancers/${userId}`),
    enabled: !!userId,
  });
}
