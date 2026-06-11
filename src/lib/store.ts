// Sites store — talks to buildo-bot backend API
import { create } from 'zustand';

export interface Site {
  id: string;
  user_id: number;
  project_id: string;
  project_name: string;
  domain: string | null;
  deploy_target: string | null;
  deploy_url: string | null;
  deploy_id: string | null;
  status: string;
  last_deploy_at: string | null;
  created_at: string;
  files_count?: number;
  size_kb?: number;
  preview_summary?: string;
}

interface SitesState {
  sites: Site[];
  loading: boolean;
  error: string | null;
  fetchSites: () => Promise<void>;
  createSite: (prompt: string) => Promise<Site>;
  deleteSite: (id: string) => Promise<void>;
}

const BOT_API_URL = import.meta.env.VITE_BOT_API_URL || 'http://localhost:9090';

function getTgUserId(): number {
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.initDataUnsafe?.user?.id) {
    return tg.initDataUnsafe.user.id;
  }
  return 6318513424; // MVP fallback
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BOT_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API ${res.status}`);
  }
  return res.json();
}

export const useSites = create<SitesState>((set) => ({
  sites: [],
  loading: false,
  error: null,
  fetchSites: async () => {
    set({ loading: true, error: null });
    try {
      const tgId = getTgUserId();
      const res = await apiRequest<{ sites: Site[]; total: number }>(
        `/api/v1/sites?tg_user_id=${tgId}`
      );
      set({ sites: res.sites, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
  createSite: async (prompt: string) => {
    set({ loading: true, error: null });
    try {
      const tgId = getTgUserId();
      const res = await apiRequest<{ site: Site }>('/api/v1/sites', {
        method: 'POST',
        body: JSON.stringify({ prompt, tg_user_id: tgId }),
      });
      set((s) => ({ sites: [res.site, ...s.sites], loading: false }));
      return res.site;
    } catch (e: any) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },
  deleteSite: async (id: string) => {
    try {
      await apiRequest(`/api/v1/sites/${id}`, { method: 'DELETE' });
      set((s) => ({ sites: s.sites.filter((x) => x.id !== id) }));
    } catch (e: any) {
      set({ error: e.message });
      throw e;
    }
  },
}));
