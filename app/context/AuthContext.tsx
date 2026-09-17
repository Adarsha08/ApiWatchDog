'use client'

import api from '@/lib/axios'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  user: User | null
  accessToken: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout:()=>void
  
}

interface User {
  id: string
  name: string
  email: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)   // true while we check for an existing session

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Login Failed')
    }

    const data = await res.json()
    setUser(data.user)
    setAccessToken(data.accessToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
  }
  //for the logout 
  const logout = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  setUser(null)
  setAccessToken(null)
  delete api.defaults.headers.common['Authorization']
}

  
 

  // NEW — try to silently restore the session when the app first loads
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include'   // sends the httpOnly refreshToken cookie automatically
        })

        if (res.ok) {
          const data = await res.json()
          setAccessToken(data.accessToken)
          api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
        }
      } catch {
        // no valid session — user stays logged out, nothing to do
      } finally {
        setLoading(false)   // done checking, either way
      }
    }

    tryRefresh()
  }, [])

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login,logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}