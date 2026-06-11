import { useState } from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useSites } from '../lib/store';
import { hapticFeedback } from '../hooks/useTelegram';

interface Props {
  onBack: () => void;
}

const suggestions = [
  'Лендинг для кофейни с меню',
  'Сайт-портфолио фотографа',
  'Визитка для юриста',
  'Landing для онлайн-курса',
];

export function NewSiteScreen({ onBack }: Props) {
  const [prompt, setPrompt] = useState('');
  const createSite = useSites((s) => s.createSite);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || prompt.length < 10) return;
    setSubmitting(true);
    hapticFeedback('medium');
    try {
      await createSite(prompt);
      hapticFeedback('heavy');
      onBack();
    } finally {
      setSubmitting(false);
    }
  };

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

      <h1 className="font-display text-2xl font-bold text-ocean-500">Новый сайт</h1>
      <p className="mt-1 text-sm text-ocean-500/60">
        Опишите что хотите. ИИ-агент сделает остальное.
      </p>

      <div className="card-pwa mt-6">
        <label className="block text-xs font-medium text-ocean-500/70">Промт</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          placeholder="Лендинг для кофейни «Утро» на Патриарших. Пастельные тона, 6 позиций в меню, кнопка бронирования..."
          className="mt-2 w-full resize-none rounded-lg border border-ocean-500/15 bg-cream px-3 py-2.5 text-sm text-ocean-500 placeholder:text-ocean-500/30 focus:border-tide-500 focus:outline-none focus:ring-2 focus:ring-tide-500/20"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ocean-500/50">
          <span>{prompt.length} символов</span>
          <span>Мин. 10</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || prompt.length < 10}
        className="btn-pwa-primary mt-4 disabled:opacity-50"
      >
        {submitting ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Генерирую...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Создать сайт
          </>
        )}
      </button>

      <div className="mt-6">
        <div className="text-xs font-medium text-ocean-500/70">Идеи:</div>
        <div className="mt-2 flex flex-col gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="rounded-xl border border-ocean-500/10 bg-white px-3 py-2.5 text-left text-xs text-ocean-500/80 active:bg-tide-500/5"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ocean-500/40">
        <Sparkles className="h-3 w-3" />
        <span>MiniMax M3 + taste-skill v2</span>
      </div>
    </div>
  );
}
