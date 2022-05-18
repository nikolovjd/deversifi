import { Navigate, useLocation } from 'react-router-dom'
import React, { useContext } from 'react'
import { authContext } from '../hooks/UseAuth'

const RequireAuth = ({ children }: any) => {
  // @ts-ignore
  const { auth, login } = useContext(authContext)

  const location = useLocation()

  // local storage check
  const wallet = localStorage.getItem('wallet')
  const signature = localStorage.getItem('signature')

  if (wallet && signature && !auth) {
    login({ wallet, signature })
    return children
  }

  return auth?.wallet && auth?.signature ? children :
    <Navigate to='/auth' replace state={{ path: location.pathname }} />
}

export default RequireAuth