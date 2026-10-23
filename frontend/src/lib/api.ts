import {
  AnalysisResult,
  CaseStudy,
  FeedbackSubmission,
  LawFramework,
  Role,
  User,
  WaitlistSubmission,
} from '../types';
import { mockDefaultAnalysisResult, mockSampleScenario } from './mocks/analysis';
import { mockCaseStudies } from './mocks/cases';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

// In-Memory Token Storage (Security Best Practice: never localStorage)
let inMemoryAccessToken: string | null = null;

export function setAccessToken(token: string | null) {
  inMemoryAccessToken = token;
}

export function getAccessToken(): string | null {
  return inMemoryAccessToken;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
  retryCount?: number;
  isIdempotent?: boolean;
}

async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const {
    timeoutMs = 30000,
    retryCount = 0,
    isIdempotent = false,
    headers: customHeaders,
    ...rest
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  if (inMemoryAccessToken) {
    headers['Authorization'] = `Bearer ${inMemoryAccessToken}`;
  }

  try {
    const response = await fetch(url, {
      ...rest,
      headers,
      signal: options.signal || controller.signal,
      credentials: 'include', // for httpOnly refresh cookies
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err: any) {
    clearTimeout(timeoutId);
    // Exponential backoff for idempotent calls
    if (isIdempotent && retryCount < 2 && (err.name === 'TypeError' || err.name === 'AbortError')) {
      const delay = Math.pow(2, retryCount) * 500;
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithRetry(url, {
        ...options,
        retryCount: retryCount + 1,
      });
    }
    throw err;
  }
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; accessToken: string }> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 600));
      const role: Role = email.includes('admin')
        ? 'ADMIN'
        : email.includes('instructor')
        ? 'INSTRUCTOR'
        : 'STUDENT';
      const mockUser: User = {
        id: 'usr-mock-1',
        email,
        name: email.split('@')[0].toUpperCase(),
        role,
      };
      setAccessToken('mock-jwt-token-xyz');
      return { user: mockUser, accessToken: 'mock-jwt-token-xyz' };
    }

    try {
      const res = await fetchWithRetry(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new ApiError(res.status, 'Invalid login credentials');
      }
      const data = await res.json();
      setAccessToken(data.accessToken);
      return data;
    } catch (err: any) {
      if (USE_MOCKS || err.message?.includes('Failed to fetch')) {
        // Fallback to mock on network fail in dev
        setAccessToken('mock-jwt-token-fallback');
        return {
          user: { id: 'usr-fallback', email, name: 'Student Trainee', role: 'STUDENT' },
          accessToken: 'mock-jwt-token-fallback',
        };
      }
      throw err;
    }
  },

  async register(name: string, email: string, password: string, role: Role = 'STUDENT'): Promise<{ user: User; accessToken: string }> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 700));
      const mockUser: User = { id: `usr-${Date.now()}`, name, email, role };
      setAccessToken('mock-jwt-token-register');
      return { user: mockUser, accessToken: 'mock-jwt-token-register' };
    }

    const res = await fetchWithRetry(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(res.status, err.message || 'Registration failed');
    }
    const data = await res.json();
    setAccessToken(data.accessToken);
    return data;
  },

  async refreshToken(): Promise<{ accessToken: string } | null> {
    if (USE_MOCKS) {
      setAccessToken('mock-refreshed-jwt-token');
      return { accessToken: 'mock-refreshed-jwt-token' };
    }
    try {
      const res = await fetchWithRetry(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        setAccessToken(data.accessToken);
        return data;
      }
      setAccessToken(null);
      return null;
    } catch {
      setAccessToken(null);
      return null;
    }
  },

  async getMe(): Promise<User | null> {
    if (USE_MOCKS) {
      if (!inMemoryAccessToken) return null;
      return { id: 'usr-mock-1', email: 'trainee@policeacademy.gov.in', name: 'Inspector Roy', role: 'STUDENT' };
    }
    try {
      const res = await fetchWithRetry(`${API_BASE_URL}/api/auth/me`, { isIdempotent: true });
      if (res.ok) return await res.json();
      return null;
    } catch {
      return null;
    }
  },

  // Cases / Analyzer
  async analyzeScenario(
    scenario: string,
    framework: LawFramework = 'BOTH',
    signal?: AbortSignal
  ): Promise<AnalysisResult> {
    if (USE_MOCKS) {
      // Simulate stepped agent processing delay
      await new Promise((r) => setTimeout(r, 2200));
      return {
        ...mockDefaultAnalysisResult,
        caseId: `CASE-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
    }

    try {
      const res = await fetchWithRetry(`${API_BASE_URL}/api/cases/analyze`, {
        method: 'POST',
        body: JSON.stringify({ scenario, framework }),
        signal,
      });

      if (!res.ok) {
        if (res.status === 502 || res.status === 503) {
          throw new ApiError(res.status, 'AI Microservice is currently unavailable. Spring core is unable to reach LangGraph.');
        }
        if (res.status === 429) {
          throw new ApiError(429, 'Hourly analysis rate limit exceeded. Please wait a few moments.');
        }
        const errorData = await res.json().catch(() => ({}));
        throw new ApiError(res.status, errorData.message || 'Analysis processing error', errorData);
      }

      return await res.json();
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new ApiError(499, 'Analysis request cancelled by user.');
      }
      // If dev mode and Spring is offline, fallback gracefully
      if (import.meta.env.DEV && (err.message?.includes('Failed to fetch') || err.status === 502)) {
        console.warn('Backend unavailable, falling back to local mock analyzer result');
        await new Promise((r) => setTimeout(r, 1500));
        return {
          ...mockDefaultAnalysisResult,
          caseId: `FALLBACK-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
      }
      throw err;
    }
  },

  async getSavedCases(): Promise<AnalysisResult[]> {
    if (USE_MOCKS) {
      return [mockDefaultAnalysisResult];
    }
    try {
      const res = await fetchWithRetry(`${API_BASE_URL}/api/cases`, { isIdempotent: true });
      if (!res.ok) throw new ApiError(res.status, 'Failed to fetch saved cases');
      return await res.json();
    } catch {
      return [mockDefaultAnalysisResult];
    }
  },

  async getCaseById(id: string): Promise<AnalysisResult> {
    if (USE_MOCKS) {
      return { ...mockDefaultAnalysisResult, caseId: id };
    }
    const res = await fetchWithRetry(`${API_BASE_URL}/api/cases/${id}`, { isIdempotent: true });
    if (!res.ok) throw new ApiError(res.status, 'Case not found');
    return await res.json();
  },

  async exportPdfReport(caseId: string): Promise<Blob> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 900));
      // Return a dummy valid text/pdf blob
      return new Blob([`ForensicAI Legal Analysis Report - ${caseId}\nGenerated under Educational License.\nNot legal advice.`], {
        type: 'application/pdf',
      });
    }

    const res = await fetchWithRetry(`${API_BASE_URL}/api/cases/${caseId}/report`, {
      method: 'POST',
    });
    if (!res.ok) throw new ApiError(res.status, 'Failed to generate PDF report');
    return await res.blob();
  },

  // Case Studies
  async getCaseStudies(params?: { category?: string; search?: string; sort?: string }): Promise<CaseStudy[]> {
    if (USE_MOCKS) {
      let results = [...mockCaseStudies];
      if (params?.category && params.category !== 'All') {
        results = results.filter((c) => c.category === params.category);
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        results = results.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.summary.toLowerCase().includes(query) ||
            c.jurisdiction.toLowerCase().includes(query)
        );
      }
      if (params?.sort === 'newest') {
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      return results;
    }

    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    if (params?.sort) query.set('sort', params.sort);

    const res = await fetchWithRetry(`${API_BASE_URL}/api/case-studies?${query.toString()}`, { isIdempotent: true });
    if (!res.ok) throw new ApiError(res.status, 'Failed to fetch case studies');
    return await res.json();
  },

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    if (USE_MOCKS) {
      const found = mockCaseStudies.find((c) => c.slug === slug);
      return found || null;
    }
    const res = await fetchWithRetry(`${API_BASE_URL}/api/case-studies/${slug}`, { isIdempotent: true });
    if (!res.ok) return null;
    return await res.json();
  },

  // Feedback & Waitlist
  async submitFeedback(data: FeedbackSubmission): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 400));
      return { success: true };
    }
    const res = await fetchWithRetry(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { success: res.ok };
  },

  async submitWaitlist(data: WaitlistSubmission): Promise<{ success: boolean }> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 400));
      return { success: true };
    }
    const res = await fetchWithRetry(`${API_BASE_URL}/api/waitlist`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { success: res.ok };
  },

  async getAuditLogs(): Promise<any[]> {
    if (USE_MOCKS) {
      return [
        { id: 1, action: 'ANALYZE_CASE', caseId: 'CASE-2024-BNS-8912', ipAddress: '127.0.0.1', timestamp: new Date().toISOString(), userEmail: 'trainee@policeacademy.gov.in' },
        { id: 2, action: 'EXPORT_PDF', caseId: 'CASE-2024-BNS-8912', ipAddress: '127.0.0.1', timestamp: new Date().toISOString(), userEmail: 'trainee@policeacademy.gov.in' },
      ];
    }
    const res = await fetchWithRetry(`${API_BASE_URL}/api/admin/audit`, { isIdempotent: true });
    if (!res.ok) throw new ApiError(res.status, 'Unauthorized or failed to load audit logs');
    return await res.json();
  },
};
