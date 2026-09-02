'use client'

import { createContext, useContext, useState, ReactNode } from 'react'


interface AuthContextType {
  user: any
  accessToken: string|null
  login: (token: string, userData: any) => void
  
}
interface User{
    id:string,
    name:string,
    email:string
}
const AuthContext=createContext<AuthContextType |null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user,setUser]=useState<User>()
      const [accessToken, setAccessToken] = useState<string | null>(null)
    
    const login=async(email:string,password:string)=>{
        const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({email,password})
        })
        if(!res.ok)
        {
            const errorData=await res.json()
            throw new Error(errorData.message||"Login Failed")
        }
        const data=await res.json()
        setUser(data.user)
        setAccessToken(data.accessToken)

    }
    return(
        <AuthContext.Provider value={{user,accessToken,login}}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}

