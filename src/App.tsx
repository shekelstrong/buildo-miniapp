import { useState } from 'react';
import { SitesListScreen } from './screens/SitesListScreen';
import { NewSiteScreen } from './screens/NewSiteScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { useTelegram } from './hooks/useTelegram';

type Screen = 'list' | 'new' | 'profile';

export function App() {
  const [screen, setScreen] = useState<Screen>('list');
  const { isReady, user } = useTelegram();
  void user; // user fetched for future profile; not used in shell yet
  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="text-sm text-ocean-500/50">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {screen === 'list' && <SitesListScreen onNavigate={(s) => setScreen(s)} />}
      {screen === 'new' && <NewSiteScreen onBack={() => setScreen('list')} />}
      {screen === 'profile' && <ProfileScreen onBack={() => setScreen('list')} />}
    </div>
  );
}
