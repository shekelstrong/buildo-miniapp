// Sites store (Phase 1.5: real API)
import { create } from 'zustand';

export interface Site {
  id: string;
  name: string;
  url: string | null;
  status: 'draft' | 'generating' | 'live' | 'failed';
  created_at: string;
  files_count: number;
  prompt: string;
}

interface SitesState {
  sites: Site[];
  loading: boolean;
  fetchSites: () => Promise<void>;
  createSite: (prompt: string) => Promise<Site>;
  deleteSite: (id: string) => Promise<void>;
}

const BOT_API_URL = import.meta.env.VITE_BOT_API_URL || 'http://localhost:8888';

// MVP: mock data
const MOCK_SITES: Site[] = [
  { id: '1', name: 'Кофейня Утро', url: 'utro.layero.app', status: 'live', created_at: '2026-06-08', files_count: 8, prompt: 'Лендинг для кофейни Утро на Патриарших' },
  { id: '2', name: 'Барбершоп Бритва', url: null, status: 'generating', created_at: '2026-06-10', files_count: 0, prompt: 'Сайт-визитка для барбершопа' },
];

export const useSites = create<SitesState>((set) => ({
  sites: [],
  loading: false,
  fetchSites: async () => {
    set({ loading: true });
    // TODO Phase 1.5: real fetch
    await new Promise((r) => setTimeout(r, 500));
    set({ sites: MOCK_SITES, loading: false });
  },
  createSite: async (prompt: string) => {
    set({ loading: true });
    // TODO Phase 1.5: POST /api/sites
    await new Promise((r) => setTimeout(r, 1500));
    const newSite: Site = {
      id: Math.random().toString(36).slice(2, 11),
      name: prompt.split(' ').slice(0, 3).join(' '),
      url: null,
      status: 'generating',
      created_at: new Date().toISOString(),
      files_count: 0,
      prompt,
    };
    set((s) => ({ sites: [newSite, ...s.sites], loading: false }));
    return newSite;
  },
  deleteSite: async (id: string) => {
    set((s) => ({ sites: s.sites.filter((x) => x.id !== id) }));
  },
}));
