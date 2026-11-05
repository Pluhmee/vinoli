import { ENV } from '@/config/env';
import { useAppStore } from '@/store/useAppStore';

export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  const normalizedPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const base = ENV.API_BASE_URL.endsWith('/')
    ? ENV.API_BASE_URL.slice(0, -1)
    : ENV.API_BASE_URL;

  const query = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') {
        query.set(key, String(value));
      }
    }
  }

  const queryString = query.toString();
  return `${base}${normalizedPath}${queryString ? `?${queryString}` : ''}`;
}

async function request<TResponse>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { body, params, headers, ...rest } = options;
  const token = useAppStore.getState().session?.accessToken;

  const response = await fetch(buildUrl(endpoint, params), {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    let errorCode: string | undefined;

    try {
      const payload = (await response.json()) as { message?: string; code?: string };
      if (payload.message) errorMessage = payload.message;
      errorCode = payload.code;
    } catch {
      // Non-JSON error response; fall back to status message
    }

    throw new ApiError(errorMessage, response.status, errorCode);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export const apiClient = {
  get: <TResponse>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TResponse>(endpoint, { ...options, method: 'GET' }),

  post: <TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<TResponse>(endpoint, { ...options, method: 'POST', body }),

  patch: <TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<TResponse>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <TResponse>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TResponse>(endpoint, { ...options, method: 'DELETE' }),
};
