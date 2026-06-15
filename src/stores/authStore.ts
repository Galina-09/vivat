import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User, Profile } from '@/types';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  setUser: (user: User | null, profile: Profile | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: true,
      isAuthenticated: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (authError) throw authError;

          if (authData.user) {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*, branch:branches(*)')
              .eq('id', authData.user.id)
              .maybeSingle();

            if (profileError) throw profileError;

            set({
              user: authData.user as unknown as User,
              profile: profileData,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (email: string, password: string, fullName: string, role = 'agent') => {
        set({ isLoading: true, error: null });
        try {
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
          });

          if (authError) throw authError;

          if (authData.user) {
            // Create profile for new user
            const { error: profileError } = await supabase.from('profiles').insert({
              id: authData.user.id,
              email,
              full_name: fullName,
              role: role as 'admin' | 'manager' | 'agent' | 'support',
            });

            if (profileError) throw profileError;

            const { data: profileData } = await supabase
              .from('profiles')
              .select('*, branch:branches(*)')
              .eq('id', authData.user.id)
              .maybeSingle();

            set({
              user: authData.user as unknown as User,
              profile: profileData,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await supabase.auth.signOut();
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*, branch:branches(*)')
              .eq('id', session.user.id)
              .maybeSingle();

            set({
              user: session.user as unknown as User,
              profile: profileData,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              profile: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch {
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      updateProfile: async (updates: Partial<Profile>) => {
        const { profile } = get();
        if (!profile) return;

        try {
          const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', profile.id);

          if (error) throw error;

          set({ profile: { ...profile, ...updates } });
        } catch (error) {
          throw error;
        }
      },

      setUser: (user, profile) => {
        set({
          user,
          profile,
          isAuthenticated: !!user,
          isLoading: false,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  (async () => {
    if (event === 'SIGNED_IN' && session?.user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*, branch:branches(*)')
        .eq('id', session.user.id)
        .maybeSingle();

      useAuthStore.getState().setUser(
        session.user as unknown as User,
        profileData
      );
    } else if (event === 'SIGNED_OUT') {
      useAuthStore.getState().setUser(null, null);
    }
  })();
});
