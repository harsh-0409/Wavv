import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

export function FeaturedContent() {
  const recentlyPlayed = [
    { id: 1, title: "After Hours", artist: "The Weeknd", cover: "/afterhours.jpg" },
    { id: 2, title: "Future Nostalgia", artist: "Dua Lipa", cover: "/futuren.jpg" },
    { id: 3, title: "Chromatica", artist: "Lady Gaga", cover: "/download (3).jpeg" },
    { id: 4, title: "Fine Line", artist: "Harry Styles", cover: "/download (4).jpeg" },
    { id: 5, title: "Folklore", artist: "Taylor Swift", cover: "/download (5).jpeg" },
  ]

  const forYou = [
    {
      id: 1,
      title: "Today's Hits",
      description: "The hottest tracks right now",
      cover: "/todayh.jpg",
    },
    {
      id: 2,
      title: "Chill Vibes",
      description: "Relaxing beats for your day",
      cover: "/chillv.jpg",
    },
    {
      id: 3,
      title: "Workout Energy",
      description: "Power your workout",
      cover: "/download (3).jpeg",
    },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recentlyPlayed.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    width={160}
                    height={160}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full bg-pink-500 hover:bg-pink-600 text-white">
                      <Play className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-white truncate">{item.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{item.artist}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Made For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forYou.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-300 mb-3">{item.description}</p>
                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                      <Play className="h-4 w-4 mr-2 fill-current" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={`/newr.jpg`}
                    alt={`New Release ${i + 1}`}
                    width={140}
                    height={140}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full bg-pink-500 hover:bg-pink-600 text-white">
                      <Play className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-white truncate">New Album Title</h3>
                  <p className="text-sm text-gray-400 truncate">Artist Name</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
