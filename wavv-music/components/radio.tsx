"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Play, Pause, RefreshCw } from "lucide-react"

interface RadioStation {
  id: string
  name: string
  url: string
  genre: string
  favicon?: string
  country?: string
  language?: string
}

export default function RadioComponent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sample radio stations including Mirchi 98
  const stations: RadioStation[] = [
    {
      id: "mirchi98",
      name: "Mirchi 98",
      url: "https://radioindia.net/radio/mirchi98/icecast.audio",
      genre: "Bollywood",
      country: "India",
      language: "Hindi"
    },
    {
      id: "radio1",
      name: "Radio One",
      url: "https://stream.zeno.fm/0r0xa792kwzuv",
      genre: "Pop",
      country: "Global",
      language: "English"
    },
    {
      id: "radio2",
      name: "Radio Two",
      url: "https://stream.zeno.fm/1yn0ad6dn5zuv",
      genre: "Rock",
      country: "Global",
      language: "English"
    }
  ]

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio()
    audioRef.current.volume = volume / 100

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const playStation = (station: RadioStation) => {
    if (!audioRef.current) return

    setIsLoading(true)
    setError(null)

    // Stop current playback
    audioRef.current.pause()
    audioRef.current.src = ""

    // Set new source
    audioRef.current.src = station.url
    audioRef.current.volume = isMuted ? 0 : volume / 100

    // Play the new station
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true)
        setCurrentStation(station)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error playing station:", err)
        setError("Failed to play station. Please try again.")
        setIsLoading(false)
      })
  }

  const togglePlayPause = () => {
    if (!audioRef.current || !currentStation) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
    if (isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    audioRef.current.volume = newMutedState ? 0 : volume / 100
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">FM Radio</h1>
            <p className="text-gray-400">Listen to live radio stations</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station) => (
              <div
                key={station.id}
                className={`bg-gray-800 rounded-lg p-6 ${
                  currentStation?.id === station.id ? 'ring-2 ring-pink-500' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  {station.favicon ? (
                    <img
                      src={station.favicon}
                      alt={station.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                      <span className="text-xl font-bold">{station.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{station.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {station.genre} • {station.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    className={`flex-1 ${
                      currentStation?.id === station.id && isPlaying
                        ? 'bg-pink-500 hover:bg-pink-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => playStation(station)}
                    disabled={isLoading}
                  >
                    {isLoading && currentStation?.id === station.id ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : currentStation?.id === station.id && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    <span className="ml-2">
                      {currentStation?.id === station.id && isPlaying ? 'Pause' : 'Play'}
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {currentStation && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlayPause}
                      className="text-white hover:bg-gray-800"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                    <div>
                      <h3 className="font-medium">{currentStation.name}</h3>
                      <p className="text-sm text-gray-400">{currentStation.genre}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="text-white hover:bg-gray-800"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <div className="w-32">
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 