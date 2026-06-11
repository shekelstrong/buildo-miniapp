import { ArrowLeft, User, Globe, CreditCard, LogOut, Bell, Shield } from 'lucide-react';
import { hapticFeedback } from '../hooks/useTelegram';

interface Props {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: Props) {
  const tg = (window as any).Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  return (
    <div className="container-pwa">
      <button
        onClick={() => {
          hapticFeedback('light');
          onBack();
        }}
        className="mb-4 flex items-center gap-2 text-sm text-ocean-500/70"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад
      </button>

      <h1 className="font-display text-2xl font-bold text-ocean-500">Профиль</h1>

      {/* User card */}
      <div className="card-pwa mt-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-tide-500 to-tide-600 text-2xl font-medium text-white">
          {(user?.first_name || '?').slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-lg font-semibold text-ocean-500">
            {user?.first_name} {user?.last_name || ''}
          </div>
          {user?.username && (
            <div className="text-sm text-ocean-500/60">@{user.username}</div>
          )}
          <div className="mt-1 text-xs text-ocean-500/40">ID: {user?.id || '—'}</div>
        </div>
      </div>

      {/* Plan */}
      <div className="card-pwa mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tide-500/10 text-tide-600">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-ocean-500">Free тариф</div>
              <div className="text-xs text-ocean-500/60">1 сайт бесплатно</div>
            </div>
          </div>
          <button className="rounded-lg bg-tide-500 px-3 py-1.5 text-xs font-medium text-white">
            Pro 990 ₽
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 space-y-2">
        <SettingItem icon={Globe} label="Мои сайты" value="2" />
        <SettingItem icon={Bell} label="Уведомления" value="Вкл" />
        <SettingItem icon={Shield} label="Конфиденциальность" onClick={() => alert('TODO Phase 1.5')} />
        <SettingItem
          icon={User}
          label="Открыть веб-версию"
          onClick={() => tg?.openLink?.('https://buildo.ru/dashboard')}
        />
        <SettingItem
          icon={LogOut}
          label="Выйти"
          onClick={() => {
            hapticFeedback('heavy');
            if (confirm('Выйти?')) tg?.close?.();
          }}
          danger
        />
      </div>

      <div className="mt-8 text-center text-xs text-ocean-500/30">
        Buildo v0.1.0-mvp
      </div>
    </div>
  );
}

function SettingItem({
  icon: Icon,
  label,
  value,
  onClick,
  danger,
}: {
  icon: typeof User;
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border border-ocean-500/10 bg-white px-4 py-3 text-left transition-colors active:bg-ocean-500/[0.02] ${
        danger ? 'text-coral' : 'text-ocean-500'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-sm font-medium">{label}</span>
      {value && <span className="text-xs text-ocean-500/50">{value}</span>}
    </button>
  );
}
