// stores/useReloadStore.ts
import { create } from 'zustand'

interface ReloadState {
  reload: boolean
  setReload: (value: boolean) => void
  toggleReload: () => void
  resetReload: () => void
}

export const useReloadStore = create<ReloadState>((set) => ({
  reload: false,
  setReload: (value) => set({ reload: value }),
  toggleReload: () => set((state) => ({ reload: !state.reload })),
  resetReload: () => set({ reload: false }),
}))
