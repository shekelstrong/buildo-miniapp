// Telegram Mini App SDK init + theme sync
import { useEffect, useState } from 'react';

export function useTelegram() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<{ id: number; first_name: string; username?: string } | null>(null);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    try {
      setIsReady(true);
      // Try to get user data from Telegram.WebApp
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        if (tg.initDataUnsafe?.user) {
          setUser({
            id: tg.initDataUnsafe.user.id,
            first_name: tg.initDataUnsafe.user.first_name,
            username: tg.initDataUnsafe.user.username,
          });
        }
        setColorScheme(tg.colorScheme || 'light');
      }
    } catch (e) {
      // Outside Telegram — dev mode
      console.warn('TMA SDK not available (dev mode):', e);
    }
  }, []);

  return { isReady, user, colorScheme };
}

export function hapticFeedback(style: 'light' | 'medium' | 'heavy' = 'light') {
  const tg = (window as any).Telegram?.WebApp;
  tg?.HapticFeedback?.impactOccurred(style);
}

/**
 * Open an external URL using Telegram.WebApp.openLink (falls back to
 * plain window.open when running outside Telegram for dev mode).
 */
export function openLink(url: string, tryInstantView = false): void {
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.openLink) {
    tg.openLink(url, { try_instant_view: tryInstantView });
    return;
  }
  window.open(url, '_blank', 'noopener');
}

/**
 * Open a t.me / telegram.org link inside the Telegram app.
 */
export function openTelegramLink(url: string): void {
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(url);
    return;
  }
  window.open(url, '_blank', 'noopener');
}
