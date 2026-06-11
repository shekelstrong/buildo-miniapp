# buildo-miniapp

**Telegram Mini App** для Buildo — дашборд "мои сайты" + /articles дайджест + быстрые действия.

## Stack (план)

- **Next.js 14** (App Router) + Vercel (deploy **manual** by user)
- **`@telegram-apps/telegram-ui`** — нативный UI-кит в стиле Telegram
- **`@telegram-apps/sdk`** — Telegram WebApp SDK
- **Supabase** — Auth + DB (shared с buildo-web)
- **Layero** — production host (user deploys manually)

## Status

- **Phase 0** — repo created, no code yet
- **Phase 1 / MVP** — список сайтов, кнопка "открыть в tg-боте", подписка на /articles

## Deploy

NO CI/CD. User deploys manually to Vercel or Layero.

## Related

- **Spec**: `nemo-team-docs/projects/site-builder-audit.md` (2026-06-11 supplement)
- **Hub**: `nemo-team-docs/projects/buildo/`
- **Bot**: `shekelstrong/buildo-bot`
- **Web**: `shekelstrong/buildo-web`
