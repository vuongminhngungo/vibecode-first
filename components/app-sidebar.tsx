"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Clock, 
  AlertTriangle, 
  Map, 
  Globe,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Timeline", href: "/timeline", icon: Clock },
  { name: "War & Conflicts", href: "/war-conflicts", icon: AlertTriangle },
  { name: "World Map", href: "/home#map", icon: Map },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">Global News</span>
            <span className="text-xs text-muted-foreground">War & World Tracker</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href === "/home" && pathname === "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-sidebar-foreground">Data Sources</span>
              <span className="text-xs text-muted-foreground">Multiple verified sources</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
