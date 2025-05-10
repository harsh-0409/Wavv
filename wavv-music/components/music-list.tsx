"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Music, Play, Pause, Trash2 } from "lucide-react"

// This would typically come from your backend
const mockMusic = [
  {
    id: 1,
    title: "Sample Song 1",
    artist: "Artist 1",
    genre: "Pop",
    duration: "3:45",
    plays: 1234
  },
  {
    id: 2,
    title: "Sample Song 2",
    artist: "Artist 2",
    genre: "Rock",
    duration: "4:20",
    plays: 567
  }
]

export function MusicList() {
  const [playingId, setPlayingId] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {mockMusic.map((music) => (
        <div
          key={music.id}
          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <Music className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h3 className="font-medium text-white">{music.title}</h3>
              <p className="text-sm text-gray-400">{music.artist}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400">{music.genre}</span>
            <span className="text-gray-400">{music.duration}</span>
            <span className="text-gray-400">{music.plays} plays</span>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => setPlayingId(playingId === music.id ? null : music.id)}
            >
              {playingId === music.id ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
} 