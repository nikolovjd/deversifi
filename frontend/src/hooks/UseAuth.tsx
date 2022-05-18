import * as React from 'react'
import { AuthData } from '../types'

// @ts-ignore
export const authContext = React.createContext()

export function useAuth() {
  const [auth, setAuth] = React.useState(null)

  return {
    auth,
    login(data: AuthData) {
      const { wallet, signature } = data
      localStorage.setItem('wallet', wallet)
      localStorage.setItem('signature', signature)
      // @ts-ignore
      setAuth(data)
    },
    logout() {
      window.location.href = '/'
      setAuth(null)
      localStorage.clear()
    }
  }
}

// @ts-ignore
export function AuthProvider({ children }) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}