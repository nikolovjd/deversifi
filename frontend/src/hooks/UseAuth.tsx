import { createContext, ReactNode, useState } from 'react'
import { AuthData } from '../types'

interface AuthContextType {
  auth: AuthData | null
  login: (data: AuthData) => void
  logout: () => void
}

export const authContext = createContext<AuthContextType>({
  auth: null,
  login: (data: AuthData) => undefined,
  logout: () => undefined
})

export function useAuth() {
  const [auth, setAuth] = useState<AuthData | null>(null)

  return {
    auth,
    login(data: AuthData) {
      const { wallet, signature } = data
      localStorage.setItem('wallet', wallet)
      localStorage.setItem('signature', signature)
      setAuth(data)
    },
    logout() {
      window.location.href = '/'
      setAuth(null)
      localStorage.clear()
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}