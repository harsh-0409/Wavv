"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Music, Clock, Heart, Search, Play } from "lucide-react"
import { Input } from "@/components/ui/input"

interface NewRelease {
  id: string
  title: string
  artist: string
  releaseDate: string
  duration: string
  genre: string
  coverImage: string
  album: string
  label: string
  isExplicit: boolean
}

const sampleReleases: NewRelease[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Nova",
    releaseDate: "2024-03-15",
    duration: "3:45",
    genre: "Pop",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    album: "Stellar Journey",
    label: "Cosmic Records",
    isExplicit: false
  },
  {
    id: "2",
    title: "Electric Soul",
    artist: "The Digital Wave",
    releaseDate: "2024-03-14",
    duration: "4:20",
    genre: "Electronic",
    coverImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60",
    album: "Digital Dreams",
    label: "Neon Beats",
    isExplicit: true
  },
  {
    id: "3",
    title: "Urban Rhythms",
    artist: "MC Flow",
    releaseDate: "2024-03-13",
    duration: "3:15",
    genre: "Hip Hop",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
    album: "Street Stories",
    label: "Urban Records",
    isExplicit: true
  },
  {
    id: "4",
    title: "Guitar Solos",
    artist: "The Rock Revolution",
    releaseDate: "2024-03-12",
    duration: "5:30",
    genre: "Rock",
    coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
    album: "Amplified",
    label: "Rock Nation",
    isExplicit: false
  },
  {
    id: "5",
    title: "Jazz Fusion",
    artist: "The Modern Jazz Quartet",
    releaseDate: "2024-03-11",
    duration: "6:15",
    genre: "Jazz",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
    album: "Smooth Rhythms",
    label: "Jazz Masters",
    isExplicit: false
  },
  {
    id: "6",
    title: "Symphony No. 9",
    artist: "New York Philharmonic",
    releaseDate: "2024-03-10",
    duration: "45:00",
    genre: "Classical",
    coverImage: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=60",
    album: "Classical Masterpieces",
    label: "Symphony Records",
    isExplicit: false
  }
]

export default function NewReleasesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const genres = Array.from(new Set(sampleReleases.map(release => release.genre)))

  const filteredReleases = sampleReleases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         release.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         release.album.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = !selectedGenre || release.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">New Releases</h1>
            <p className="text-gray-400">Discover the latest music releases</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search songs, artists, or albums..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    className={`${
                      selectedGenre === genre
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "border-gray-700 text-white hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReleases.map((release) => (
              <div
                key={release.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
              >
                <div className="relative h-48">
                  <img
                    src={release.coverImage}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {release.genre}
                  </div>
                  {release.isExplicit && (
                    <div className="absolute top-4 left-4 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                      E
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{release.title}</h3>
                  <p className="text-pink-500 font-medium mb-4">{release.artist}</p>
                  
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      <span>{release.album}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(release.releaseDate).toLocaleDateString('en-US', { 
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{release.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      <span>{release.label}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1 bg-pink-500 hover:bg-pink-600">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 