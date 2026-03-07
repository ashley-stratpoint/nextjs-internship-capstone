"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, Users, Settings, Menu, X, BarChart3, Calendar, Bell, Search } from "lucide-react"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Team", href: "/team", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-outer_space-500 border-r border-french_gray-300 dark:border-payne's_gray-400 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-french_gray-300 dark:border-payne's_gray-400">
          <Link href="/" className="text-2xl font-bold text-blue_munsell-500">Balangkas</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link href={item.href} className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${isActive ? "bg-blue_munsell-100 text-blue_munsell-700" : "text-outer_space-500 hover:bg-platinum-500"}`}>
                    <item.icon className="mr-3" size={20} />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Top Bar Trigger */}
      <div className="lg:pl-64 sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-french_gray-300 dark:border-payne's_gray-400 bg-white dark:bg-outer_space-500 px-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu size={20} /></button>
        <div className="flex flex-1 items-center justify-between">
           <OrganizationSwitcher hidePersonal={true} appearance={{ elements: { organizationSwitcherTrigger: "text-outer_space-500 dark:text-platinum-500" }}} />
           <div className="flex items-center gap-x-4">
              <ThemeToggle />
              <UserButton afterSignOutUrl="/" />
           </div>
        </div>
      </div>
    </>
  )
}