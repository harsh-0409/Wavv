import { MusicPlayer } from "@/components/music-player"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { FeaturedContent } from "@/components/featured-content"

export default function DashboardPage() {
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <TopBar />
          <div className="p-6">
            <FeaturedContent />
          </div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}
