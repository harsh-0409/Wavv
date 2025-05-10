"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Plus, X, Search, Play, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface Song {
  id: string
  title: string
  artist: string
  genre: string
  duration: string
  image: string
}

interface Playlist {
  id: string
  name: string
  songs: Song[]
  createdAt: string
}

// Sample songs organized by genre
const sampleSongs: Song[] = [
  // Pop Songs
  {
    id: "p1",
    title: "Midnight Dreams",
    artist: "Luna Nova",
    genre: "Pop",
    duration: "3:45",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "p2",
    title: "Summer Vibes",
    artist: "The Pop Stars",
    genre: "Pop",
    duration: "3:20",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60"
  },
  // Rock Songs
  {
    id: "r1",
    title: "Guitar Solos",
    artist: "The Rock Revolution",
    genre: "Rock",
    duration: "5:30",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "r2",
    title: "Electric Dreams",
    artist: "Rock Nation",
    genre: "Rock",
    duration: "4:15",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60"
  },
  // Hip Hop Songs
  {
    id: "h1",
    title: "Urban Rhythms",
    artist: "MC Flow",
    genre: "Hip Hop",
    duration: "3:15",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "h2",
    title: "Street Stories",
    artist: "The Urban Collective",
    genre: "Hip Hop",
    duration: "3:45",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60"
  },
  // Electronic Songs
  {
    id: "e1",
    title: "Digital Dreams",
    artist: "The Digital Wave",
    genre: "Electronic",
    duration: "4:20",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "e2",
    title: "Neon Nights",
    artist: "Synth Master",
    genre: "Electronic",
    duration: "5:00",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60"
  },
  // Jazz Songs
  {
    id: "j1",
    title: "Smooth Rhythms",
    artist: "The Modern Jazz Quartet",
    genre: "Jazz",
    duration: "6:15",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "j2",
    title: "Midnight Jazz",
    artist: "Jazz Masters",
    genre: "Jazz",
    duration: "5:45",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60"
  }
]

const genres = Array.from(new Set(sampleSongs.map(song => song.genre)))

export default function CreatePlaylistPage() {
  const [playlistName, setPlaylistName] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load saved playlists from localStorage
  useEffect(() => {
    if (isClient) {
      const savedPlaylists = localStorage.getItem('playlists')
      if (savedPlaylists) {
        // You can use this to show existing playlists if needed
        console.log('Saved playlists:', JSON.parse(savedPlaylists))
      }
    }
  }, [isClient])

  const filteredSongs = sampleSongs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = !selectedGenre || song.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const addSongToPlaylist = (song: Song) => {
    if (!selectedSongs.find(s => s.id === song.id)) {
      setSelectedSongs([...selectedSongs, song])
    }
  }

  const removeSongFromPlaylist = (songId: string) => {
    setSelectedSongs(selectedSongs.filter(song => song.id !== songId))
  }

  const savePlaylist = () => {
    if (!playlistName.trim()) {
      alert('Please enter a playlist name')
      return
    }

    if (selectedSongs.length === 0) {
      alert('Please add at least one song to your playlist')
      return
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: playlistName,
      songs: selectedSongs,
      createdAt: new Date().toISOString()
    }

    // Get existing playlists
    const savedPlaylists = localStorage.getItem('playlists')
    const playlists = savedPlaylists ? JSON.parse(savedPlaylists) : []
    
    // Add new playlist
    playlists.push(newPlaylist)
    
    // Save to localStorage
    localStorage.setItem('playlists', JSON.stringify(playlists))

    // Reset form
    setPlaylistName("")
    setSelectedSongs([])
    setSelectedGenre(null)
    setSearchQuery("")

    // Navigate to library or show success message
    alert('Playlist created successfully!')
    router.push('/library')
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create Playlist</h1>
            <p className="text-gray-400">Create your own custom playlist</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Song Selection */}
            <div>
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Search songs..."
                  className="bg-gray-800 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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

              <div className="space-y-4">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{song.title}</h3>
                      <p className="text-gray-400 text-sm">{song.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">{song.duration}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                        onClick={() => addSongToPlaylist(song)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Playlist Preview */}
            <div>
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Enter playlist name..."
                  className="bg-gray-800 border-gray-700 text-white"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h2 className="text-xl font-bold text-white mb-4">Playlist Preview</h2>
                {selectedSongs.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No songs added yet</p>
                ) : (
                  <div className="space-y-4">
                    {selectedSongs.map((song) => (
                      <div
                        key={song.id}
                        className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg"
                      >
                        <img
                          src={song.image}
                          alt={song.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-white text-sm font-medium">{song.title}</h3>
                          <p className="text-gray-400 text-xs">{song.artist}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs">{song.duration}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-white"
                            onClick={() => removeSongFromPlaylist(song.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  onClick={savePlaylist}
                >
                  Create Playlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 