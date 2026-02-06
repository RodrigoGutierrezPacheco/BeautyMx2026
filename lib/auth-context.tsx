"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthModalOpen: boolean
  setIsAuthModalOpen: (open: boolean) => void
  authMode: "login" | "register"
  setAuthMode: (mode: "login" | "register") => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulated login - in production, connect to real auth
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name: email.split("@")[0],
      email,
    })
    setIsAuthModalOpen(false)
    return true
  }

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    // Simulated registration - in production, connect to real auth
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name,
      email,
    })
    setIsAuthModalOpen(false)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
