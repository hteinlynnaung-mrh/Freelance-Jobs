import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';
import type { ApiEnvelope, Conversation, Message } from '../types';

export const conversationKeys = {
  all: ['conversations'] as const,
  list: () => ['conversations', 'list'] as const,
  messages: (id: string) => ['conversations', 'messages', id] as const,
};

export function useConversations() {
  return useQuery({
    queryKey: conversationKeys.list(),
    queryFn: () => api<ApiEnvelope<Conversation[]>>('/api/v1/conversations'),
    refetchInterval: 15_000, // poll every 15s
  });
}

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: conversationKeys.messages(conversationId),
    queryFn: () => api<ApiEnvelope<Message[]>>(`/api/v1/conversations/${conversationId}/messages`),
    enabled: !!conversationId,
    refetchInterval: 8_000,
  });
}

export function useSendMessage(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: string) =>
      api<ApiEnvelope<Message>>(`/api/v1/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ body }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: conversationKeys.messages(conversationId) }),
  });
}
