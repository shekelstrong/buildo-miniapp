import { useEffect, useState } from 'react';
import { Plus, Globe, Sparkles, ExternalLink } from 'lucide-react';
import { useSites, type Site } from '../lib/store';
import { hapticFeedback, openLink, openTelegramLink } from '../hooks/useTelegram';

interface Props {
  onNavigate: (screen: 'new' | 'profile') => void;
}

export function SitesListScreen({ onNavigate }: Props) {
  const { sites, loading, error, fetchSites } = useSites();
  const [tgUser, setTgUser] = useState<{ first_name: string; id: number } | null>(null);

  useEffect(() => {
    fetchSites();
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setTgUser({
        first_name: tg.initDataUnsafe.user.first_name,
        id: tg.initDataUnsafe.user.id,
      });
    }
  }, [fetchSites]);

  function openInBot() {
    // Deep link to @buildo_aibot with /site command
    openTelegramLink('https://t.me/buildo_aibot?start=create');
  }

  return (
    <div className="container-pwa">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-ocean-500/60">Привет,</div>
          <h1 className="font-display text-2xl font-bold text-ocean-500">
            {tgUser?.first_name || 'Друг'} 👋
          </h1>
        </div>
        <button
          onClick={() => {
            hapticFeedback('light');
            onNavigate('profile');
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-tide-500 to-tide-600 text-sm font-medium text-white"
        >
          {(tgUser?.first_name || '?').slice(0, 1).toUpperCase()}
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="card-pwa">
          <div className="text-xs text-ocean-500/60">Сайтов</div>
          <div className="mt-1 font-display text-2xl font-bold text-ocean-500">
            {sites.length}/1
          </div>
        </div>
        <div className="card-pwa">
          <div className="text-xs text-ocean-500/60">Тариф</div>
          <div className="mt-1 font-display text-2xl font-bold text-tide-500">Free</div>
        </div>
      </div>

      <button
        onClick={() => {
          hapticFeedback('medium');
          openInBot();
        }}
        className="btn-pwa-primary mb-3"
      >
        <Sparkles className="h-5 w-5" />
        Создать сайт в боте
      </button>
      <p className="mb-6 text-center text-xs text-ocean-500/50">
        Все правки и общения — в @buildo_aibot
      </p>

      <h2 className="mb-3 text-sm font-medium text-ocean-500/70">Мои сайты</h2>

      {error && (
        <div className="card-pwa mb-3 border-amber/30 bg-amber/5 text-xs text-ocean-500/80">
          ⚠️ Не удалось загрузить: {error}
        </div>
      )}

      {loading && sites.length === 0 ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="card-pwa h-20 animate-pulse bg-ocean-500/5" />
          ))}
        </div>
      ) : sites.length === 0 ? (
        <EmptyState onNew={openInBot} />
      ) : (
        <div className="space-y-3">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      )}
    </div>
  );
}

function SiteCard({ site }: { site: Site }) {
  const status = site.status;

  return (
    <div className="card-pwa flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tide-500/10 text-tide-600">
        <Globe className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-ocean-500">{site.project_name}</div>
        <div className="truncate text-xs text-ocean-500/50">
          {site.deploy_url || 'Генерация...'}
        </div>
      </div>
      {site.deploy_url && (
        <button
          onClick={() => openLink(site.deploy_url!)}
          className="rounded-lg p-2 text-tide-600 hover:bg-tide-500/10"
          title="Открыть"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      )}
      <StatusBadge status={status} />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; class: string }> = {
    deployed: { label: 'Live', class: 'bg-tide-500/10 text-tide-600' },
    published: { label: 'Live', class: 'bg-tide-500/10 text-tide-600' },
    generating: { label: '...', class: 'bg-amber/10 text-amber' },
    draft: { label: 'Draft', class: 'bg-ocean-500/10 text-ocean-500/60' },
    failed: { label: 'Ошибка', class: 'bg-coral/10 text-coral' },
    deleted: { label: 'Удалён', class: 'bg-ocean-500/5 text-ocean-500/40' },
  };
  const { label, class: cls } = map[status] || map.draft;
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>{label}</span>;
}

function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div className="card-pwa py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tide-500/10">
        <Globe className="h-7 w-7 text-tide-600" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ocean-500">Нет сайтов</h3>
      <p className="mt-1 text-sm text-ocean-500/60">Создайте первый за 2 минуты</p>
      <button onClick={onNew} className="btn-pwa-primary mt-4">
        <Plus className="h-4 w-4" />
        Создать
      </button>
    </div>
  );
}
