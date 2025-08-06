import { create } from "zustand"
import { authService } from "../api/auth.service"

interface AuthStore {
  isAuth: boolean
  setIsAuth: (state: boolean) => void
}

export const useAuth = create<AuthStore>((set) => ({
  isAuth: authService.isAuthenticated(),
  setIsAuth: (state) => set({ isAuth: state }),
}))
