import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'uk' | 'en';
type Theme = 'light' | 'dark';

interface AppState {
  theme: Theme;
  language: Language;
  sidebarCollapsed: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'uk',
      sidebarCollapsed: false,

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          return { theme: newTheme };
        }),

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'app-settings',
      onRehydrateStorage: () => (state) => {
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('app-settings');
  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme);
      if (parsed.state?.theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch {
      // Ignore parsing errors
    }
  }
}
