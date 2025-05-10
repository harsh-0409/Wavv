"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, ChevronLeft, ChevronRight, Search, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProfileDialog } from "./profile-dialog"

export function TopBar() {
  const [searchVisible, setSearchVisible] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userSettings')
    localStorage.removeItem('userPlaylists')
    localStorage.removeItem('userData')
    
    // Clear any session data
    sessionStorage.clear()
    
    // Redirect to login page
    router.push('/login')
  }

  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-white">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {searchVisible ? (
        <div className="ml-4 relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for songs, artists, or albums..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            autoFocus
            onBlur={() => setSearchVisible(false)}
          />
        </div>
      ) : (
        <Button variant="ghost" size="icon" className="ml-4 text-white" onClick={() => setSearchVisible(true)}>
          <Search className="h-5 w-5" />
        </Button>
      )}

      <div className="ml-auto flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/The Weeknd Opens Up About His Past, Turning 30 and Getting Vulnerable on 'After Hours'.jpeg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <ProfileDialog />
            <DropdownMenuItem
              className="text-white hover:bg-gray-800 cursor-pointer"
              asChild
            >
              <Link href="/admin/login">Admin</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white hover:bg-gray-800 cursor-pointer"
              asChild
            >
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer">
              Help
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem 
              className="text-white hover:bg-gray-800 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
