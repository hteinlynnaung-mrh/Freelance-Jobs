import type { ApiEnvelope, Category, PagedProjects, Project } from "./types";

const configuredApiUrl = import.meta.env.VITE_API_URL;
const API_URL = (configuredApiUrl || (import.meta.env.DEV ? "" : "http://localhost:5001")).replace(/\/$/, "");

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...options.headers } });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error?.message ?? `Request failed (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const getCategories = () => api<ApiEnvelope<Category[]>>("/api/v1/reference/categories");
export const getProjects = (query: string) => api<PagedProjects>(`/api/v1/projects${query}`);
export const getProject = (id: string) => api<ApiEnvelope<Project>>(`/api/v1/projects/${id}`);
export { API_URL };
