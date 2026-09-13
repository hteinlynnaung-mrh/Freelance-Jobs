import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';
import type { ApiEnvelope, PagedEnvelope, Project } from '../types';

export const projectKeys = {
  all: ['projects'] as const,
  list: (q: ProjectListParams) => ['projects', 'list', q] as const,
  detail: (id: string) => ['projects', 'detail', id] as const,
  saved: ['projects', 'saved'] as const,
};

export interface ProjectListParams {
  q?: string;
  categoryId?: string;
  currency?: string;
  budgetType?: string;
  page?: number;
  pageSize?: number;
}

export function useProjects(params: ProjectListParams = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  if (params.categoryId) qs.set('categoryId', params.categoryId);
  if (params.currency) qs.set('currency', params.currency);
  if (params.budgetType) qs.set('budgetType', params.budgetType);
  if (params.page) qs.set('page', String(params.page));
  if (params.pageSize) qs.set('pageSize', String(params.pageSize));
  const query = qs.toString() ? `?${qs}` : '';
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => api<PagedEnvelope<Project>>(`/api/v1/projects${query}`),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => api<ApiEnvelope<Project>>(`/api/v1/projects/${id}`),
    enabled: !!id,
  });
}

export function useSavedProjects() {
  return useQuery({
    queryKey: projectKeys.saved,
    queryFn: () => api<ApiEnvelope<(Project & { savedAt: string })[]>>('/api/v1/projects/saved'),
  });
}

export function useSaveProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/v1/projects/${id}/save`, { method: 'POST' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.saved }),
  });
}

export function useUnsaveProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/v1/projects/${id}/save`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.saved }),
  });
}
