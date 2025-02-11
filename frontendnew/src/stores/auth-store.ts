import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  user_name: string
  photo: string | null
  roles: string
  status: number
}

interface UserRoles {
  is_admin: boolean
  is_super_admin: boolean
  is_instructor: boolean
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  userRoles: UserRoles | null
  isAuthenticated: boolean
  login: (data: { accessToken: string; refreshToken: string; user: User; user_roles: UserRoles }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      userRoles: null,
      isAuthenticated: false,
      login: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
          userRoles: data.user_roles,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          userRoles: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
)

