import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, Library, PlusCircle, Heart, MusicIcon, Headphones, Radio, Mic2 } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 h-full flex flex-col border-r border-gray-800">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <MusicIcon className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold text-white">Wavv</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-6">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Home className="mr-2 h-5 w-5" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Library className="mr-2 h-5 w-5" />
            Your Library
          </Button>
        </div>

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Playlist
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Heart className="mr-2 h-5 w-5" />
            Liked Songs
          </Button>
        </div>

        <div className="space-y-1">
          <h3 className="text-gray-400 text-sm font-medium px-4 py-2">DISCOVER</h3>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Headphones className="mr-2 h-5 w-5" />
            New Releases
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Radio className="mr-2 h-5 w-5" />
            Radio
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
            <Mic2 className="mr-2 h-5 w-5" />
            Live Events
          </Button>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          <p>© 2025 Wavv Music</p>
          <p className="mt-1">All rights reserved</p>
        </div>
      </div>
    </div>
  )
}
