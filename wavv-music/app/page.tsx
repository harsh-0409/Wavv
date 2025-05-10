import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MusicIcon } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MusicIcon className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold">Wavv</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-pink-500">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Your Music, Your Way
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-300">
            Stream millions of songs, discover new artists, and create your perfect playlists with Wavv.
          </p>
          <Link href="/signup">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6">Start Listening Free</Button>
          </Link>
        </section>

        <section className="bg-gradient-to-b from-black to-gray-900 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Wavv?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-800 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-pink-500">Unlimited Music</h3>
                <p className="text-gray-300">
                  Access millions of songs from artists around the world, with new releases added daily.
                </p>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-pink-500">Personalized Experience</h3>
                <p className="text-gray-300">
                  Discover new music based on your taste with our advanced recommendation engine.
                </p>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-pink-500">High Quality Audio</h3>
                <p className="text-gray-300">
                  Experience your favorite music in crystal clear, high-definition audio quality.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Wavv Music. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
