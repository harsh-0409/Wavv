"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Music, Plus, Play, Heart, Clock } from "lucide-react"
import Link from "next/link"

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

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const savedPlaylists = localStorage.getItem('playlists')
      if (savedPlaylists) {
        setPlaylists(JSON.parse(savedPlaylists))
      }
    }
  }, [isClient])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Your Library</h1>
              <p className="text-gray-400">Your personal collection of playlists</p>
            </div>
            <Link href="/create-playlist">
              <Button className="bg-pink-500 hover:bg-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Playlist
              </Button>
            </Link>
          </div>

          {playlists.length === 0 ? (
            <div className="text-center py-12">
              <Music className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No playlists yet</h2>
              <p className="text-gray-400 mb-6">Create your first playlist to get started</p>
              <Link href="/create-playlist">
                <Button className="bg-pink-500 hover:bg-pink-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Playlist
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {playlist.songs.length} songs • Created {formatDate(playlist.createdAt)}
                    </p>
                    
                    <div className="space-y-2">
                      {playlist.songs.slice(0, 3).map((song) => (
                        <div
                          key={song.id}
                          className="flex items-center gap-3 p-2 bg-gray-700 rounded"
                        >
                          <img
                            src={song.image}
                            alt={song.title}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">{song.title}</p>
                            <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                          </div>
                          <span className="text-gray-400 text-xs">{song.duration}</span>
                        </div>
                      ))}
                      {playlist.songs.length > 3 && (
                        <p className="text-gray-400 text-sm text-center">
                          +{playlist.songs.length - 3} more songs
                        </p>
                      )}
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
          )}
        </div>
      </div>
    </div>
  )
} 