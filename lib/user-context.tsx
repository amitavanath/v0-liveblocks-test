"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "tutor" | "student"

interface User {
  name: string
  role: UserRole
  avatar: string
}

interface UserContextType {
  user: User
  setUserRole: (role: UserRole) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: "Stacy",
    role: "tutor",
    avatar: "S",
  })

  const setUserRole = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }))
  }

  return <UserContext.Provider value={{ user, setUserRole }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
