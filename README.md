# buildo-miniapp

**Telegram Mini App для Buildo** — управление сайтами прямо в Telegram. React 18 + Vite + @telegram-apps/sdk.

## Запуск (dev)

```bash
cd buildo-miniapp
npm install
npm run dev
# открой http://localhost:5173 (с подделкой Telegram.WebApp через mock)
```

## Build

```bash
npm run build
# результат: dist/
```

## Deploy на Layero

```bash
# dist/ залить на Layero как статику
# (в будущем: npx layero deploy --framework=vite)
```

## Структура

```
src/
  App.tsx              # роутер между 3 экранами
  main.tsx             # entry
  index.css            # Tailwind
  hooks/
    useTelegram.ts     # TMA SDK init + haptic feedback
  screens/
    SitesListScreen.tsx    # Главный — список сайтов
    NewSiteScreen.tsx      # Создание нового
    ProfileScreen.tsx      # Профиль + тариф
  lib/
    store.ts           # zustand state (sites, create, delete)
```

## Что работает в MVP

- ✓ 3 экрана с навигацией
- ✓ Telegram WebApp SDK init (initDataUnsafe, theme, colorScheme)
- ✓ Haptic feedback на нажатия
- ✓ Zustand store (mock data)
- ✓ Mobile-first UI с правильным viewport-fit
- ✓ Brand-стиль Buildo (ocean/tide/cream)
- ✓ Mock создания/удаления сайтов

## Что будет в Phase 1.5

- Подключение к реальному backend API buildo-bot (FastAPI на 108.165.164.85:8888)
- Real auth через `initData` signature
- Реальные сайты из БД
- WebSocket для real-time обновлений статуса генерации
- WebApp.BackButton / MainButton
- CloudStorage для draft промтов

## Технологии

- **React 18.3** + **TypeScript 5.6**
- **Vite 5.4** (быстрый dev server + build)
- **@telegram-apps/sdk 3.0** (Bot API 7.0+)
- **@telegram-apps/telegram-ui 2.0** (Telegram-style components)
- **react-router-dom 6.26** (внутренняя навигация)
- **TailwindCSS 3.4** (стили)
- **lucide-react** (icons)
- **zustand 4.5** (state)

## Telegram-бот интеграция

В `bot/main.py` (buildo-bot) добавить обработчик команды `/app`:
```python
@dp.message(Command("app"))
async def cmd_app(message: Message):
    await message.answer(
        "Открыть Buildo Mini App:",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(
                text="🚀 Открыть",
                web_app=WebAppInfo(url="https://buildo-miniapp.layero.app")
            )
        ]])
    )
```
