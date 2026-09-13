import { useQuery } from '@tanstack/react-query';
import { api } from '../client';
import type { ApiEnvelope, Category, Skill } from '../types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api<ApiEnvelope<Category[]>>('/api/v1/reference/categories'),
    staleTime: 10 * 60 * 1000, // 10 min
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => api<ApiEnvelope<Skill[]>>('/api/v1/reference/skills'),
    staleTime: 10 * 60 * 1000,
  });
}
