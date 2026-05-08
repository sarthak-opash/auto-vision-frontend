import { create } from 'zustand'
import { clearToken, getToken, setToken } from '../services/auth-storage'

interface AuthState {
  token: string | null
  setSessionToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  setSessionToken: (token: string) => {
    setToken(token)
    set({ token })
  },
  logout: () => {
    clearToken()
    set({ token: null })
  },
}))
