
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressBarItem from './components/ProgressBarItem';
import { ItemData, NewItemData, SettingsData, DateFormatOption, StartOfWeekOption, WidgetRefreshRateOption, WidgetTextColorOption, ThemeOption, ProgressBarStyleOption } from './types';
import AddNewTimer from './components/AddNewTimer';
import Settings from './components/Settings';
import StyleSettings from './components/StyleSettings';

declare global {
    interface Navigator {
        getBattery: () => Promise<BatteryManager>;
    }
    interface BatteryManager extends EventTarget {
        charging: boolean;
        level: number;
    }
}


const App: React.FC = () => {
  const [view, setView] = useState<'list' | 'add' | 'settings' | 'style-settings'>('list');
  const [history, setHistory] = useState<ItemData[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const items = history[historyIndex];

  const [settings, setSettings] = useState<SettingsData>({
    dateFormat: DateFormatOption.LocaleDefault,
    startOfWeek: StartOfWeekOption.LocaleDefault,
    widgetRefreshRate: WidgetRefreshRateOption.FiveSeconds,
    widgetTextColor: WidgetTextColorOption.Automatic,
    theme: ThemeOption.FollowSystem,
    progressBarStyle: ProgressBarStyleOption.HorizontalBar,
    progressBarColor: '#38bdf8', // sky-500
    progressBarBackgroundColor: '#e2e8f0', // slate-200
    itemTextColor: '#1e293b', // slate-800
  });

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setSettings(prev => ({
        ...prev,
        itemTextColor: isDark ? '#e2e8f0' : '#1e293b', // slate-200 : slate-800
        progressBarBackgroundColor: isDark ? '#334155' : '#e2e8f0' // slate-700 : slate-200
    }));
  }, [settings.theme]);

  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    let mediaQuery: MediaQueryList | undefined;
    let batteryManager: BatteryManager | undefined;
    let timeInterval: number | undefined;

    const handleSystemThemeChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
    const handleBatteryChange = () => navigator.getBattery().then(bm => {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (bm.level <= 0.2 && !bm.charging) {
            applyTheme(true);
        } else {
            // Revert to system theme if not in battery saver condition
            applyTheme(settings.theme === ThemeOption.Day ? false : settings.theme === ThemeOption.Night ? true : systemIsDark);
        }
    });

    const cleanUp = () => {
        if (mediaQuery) mediaQuery.removeEventListener('change', handleSystemThemeChange);
        if (batteryManager) {
            batteryManager.removeEventListener('levelchange', handleBatteryChange);
            batteryManager.removeEventListener('chargingchange', handleBatteryChange);
        }
        if(timeInterval) clearInterval(timeInterval);
    }

    cleanUp();

    switch (settings.theme) {
      case ThemeOption.Day:
        applyTheme(false);
        break;
      case ThemeOption.Night:
        applyTheme(true);
        break;
      case ThemeOption.FollowSystem:
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        applyTheme(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        break;
      case ThemeOption.AutoLocationTime:
        const checkTime = () => {
            const hour = new Date().getHours();
            applyTheme(hour < 6 || hour >= 18);
        };
        checkTime();
        timeInterval = setInterval(checkTime, 60000);
        break;
      case ThemeOption.AutoBattery:
        if ('getBattery' in navigator) {
            navigator.getBattery().then(bm => {
                batteryManager = bm;
                handleBatteryChange();
                bm.addEventListener('levelchange', handleBatteryChange);
                bm.addEventListener('chargingchange', handleBatteryChange);
            });
        } else {
            const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(systemIsDark);
        }
        break;
      default:
        applyTheme(false);
    }
    
    return cleanUp;

  }, [settings.theme]);

  const handleAddItem = (newItem: NewItemData) => {
    let itemWithId: ItemData;
    const id = `timer-${Date.now()}`;

    if (newItem.type === 'time-based') {
      itemWithId = {
        id,
        type: 'time-based',
        title: newItem.title,
        startTime: newItem.startTime,
        endTime: newItem.endTime,
        timeZone: newItem.timeZone,
        displayOptions: newItem.displayOptions,
        displayUnits: newItem.displayUnits,
        countdownMessages: newItem.countdownMessages,
        stopWhenCompleted: newItem.stopWhenCompleted,
        decimalPlaces: newItem.decimalPlaces,
      };
    } else {
      itemWithId = {
        id,
        type: 'age',
        title: newItem.title,
        startTime: newItem.startTime,
      };
    }
    
    const newItems = [...items, itemWithId];
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newItems]);
    setHistoryIndex(newHistory.length);
    setView('list');
  };

  const handleBackToList = () => {
    setView('list');
  };
    const handleBackToSettings = () => {
    setView('settings');
  };
  
  const handleShowSettings = () => {
    setView('settings');
  };

  const handleShowStyleSettings = () => {
    setView('style-settings');
  }
  
  const handleSettingsChange = (newSettings: Partial<SettingsData>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
    }
  };

  if (view === 'add') {
    return <AddNewTimer onSave={handleAddItem} onCancel={handleBackToList} />;
  }
  
  if (view === 'settings') {
    return <Settings onBack={handleBackToList} settings={settings} onSettingsChange={handleSettingsChange} onShowStyleSettings={handleShowStyleSettings} />;
  }

  if (view === 'style-settings') {
      return <StyleSettings onBack={handleBackToSettings} settings={settings} onSettingsChange={handleSettingsChange} />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <Header 
        onAddClick={() => setView('add')} 
        onSettingsClick={handleShowSettings} 
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />
      <main className="flex-1 overflow-y-auto p-2 md:p-4">
        <div className="max-w-3xl mx-auto">
          {items.length > 0 ? (
            items.map(item => (
              <ProgressBarItem key={item.id} item={item} settings={settings} />
            ))
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 mt-20 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">No Timers Yet</h2>
              <p className="text-lg">Click the '+' button to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;