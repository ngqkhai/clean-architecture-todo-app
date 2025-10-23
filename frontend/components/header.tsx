"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"

export function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-secondary text-secondary-foreground shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/lists" className="text-2xl font-bold">
          Clean To-Do
        </Link>
        {isAuthenticated && (
          <Button
            onClick={logout}
            variant="outline"
            className="text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary bg-transparent"
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  )
}
