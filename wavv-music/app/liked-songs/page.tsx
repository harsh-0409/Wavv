"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Play, Clock, Music } from "lucide-react"

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  image: string
  liked: boolean
}

// Sample songs data
const sampleSongs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    liked: true
  },
  {
    id: "2",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:35",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60",
    liked: true
  },
  {
    id: "3",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    duration: "3:50",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=60",
    liked: true
  }
]

export default function LikedSongsPage() {
  const [likedSongs, setLikedSongs] = useState<Song[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Load liked songs from localStorage
    const savedLikedSongs = localStorage.getItem('likedSongs')
    if (savedLikedSongs) {
      setLikedSongs(JSON.parse(savedLikedSongs))
    } else {
      // If no saved songs, use sample data
      setLikedSongs(sampleSongs)
      localStorage.setItem('likedSongs', JSON.stringify(sampleSongs))
    }
  }, [])

  const toggleLike = (songId: string) => {
    setLikedSongs(prevSongs => {
      const updatedSongs = prevSongs.map(song => 
        song.id === songId ? { ...song, liked: !song.liked } : song
      ).filter(song => song.liked)
      
      // Save to localStorage
      localStorage.setItem('likedSongs', JSON.stringify(updatedSongs))
      return updatedSongs
    })
  }

  const formatDuration = (duration: string) => {
    return duration
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Liked Songs</h1>
            <p className="text-gray-400">{likedSongs.length} songs</p>
          </div>

          <div className="mb-8">
            <Button 
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className="h-6 w-6 mr-2" />
              {isPlaying ? 'Pause' : 'Play All'}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-4 py-2 text-gray-400 text-sm border-b border-gray-800">
              <div className="w-8">#</div>
              <div>Title</div>
              <div>Album</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4" />
              </div>
              <div className="w-8"></div>
            </div>

            {likedSongs.map((song, index) => (
              <div 
                key={song.id}
                className="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-4 py-2 hover:bg-gray-800/50 rounded-lg group"
              >
                <div className="w-8 flex items-center text-gray-400">
                  {index + 1}
                </div>
                <div className="flex items-center gap-4">
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <div className="font-medium">{song.title}</div>
                    <div className="text-sm text-gray-400">{song.artist}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  {song.album}
                </div>
                <div className="flex items-center text-gray-400">
                  {formatDuration(song.duration)}
                </div>
                <div className="w-8 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-pink-500 hover:text-pink-600"
                    onClick={() => toggleLike(song.id)}
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 