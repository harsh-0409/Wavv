"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Loader2 } from "lucide-react"

interface RadioStation {
  id: string
  name: string
  url: string
  genre: string
  favicon?: string
  country?: string
  language?: string
}

export function Radio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null)
  const [volume, setVolume] = useState(50)
  const [audio] = useState(new Audio())
  const [stations, setStations] = useState<RadioStation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStations()
  }, [])

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume, audio])

  const fetchStations = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch FM stations from Radio Browser API
      const response = await fetch(
        'https://de1.api.radio-browser.info/json/stations/search?' +
        new URLSearchParams({
          limit: '20',
          order: 'clickcount',
          reverse: 'true',
          tag: 'fm',
          codec: 'MP3',
          state: 'exact',
          language: 'english'
        })
      )

      if (!response.ok) {
        throw new Error('Failed to fetch radio stations')
      }

      const data = await response.json()
      
      // Transform the data to match our interface
      const formattedStations = data.map((station: any) => ({
        id: station.stationuuid,
        name: station.name,
        url: station.url_resolved,
        genre: station.tags?.split(',')[0] || 'Unknown',
        favicon: station.favicon,
        country: station.country,
        language: station.language
      }))

      setStations(formattedStations)
    } catch (err) {
      setError('Failed to load radio stations. Please try again later.')
      console.error('Error fetching stations:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlay = (station: RadioStation) => {
    if (currentStation?.id === station.id) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
    } else {
      audio.src = station.url
      audio.play()
        .then(() => {
          setCurrentStation(station)
          setIsPlaying(true)
        })
        .catch((err) => {
          console.error('Error playing station:', err)
          setError('Failed to play this station. Please try another one.')
        })
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(50)
    } else {
      setVolume(0)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-pink-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button 
          variant="outline" 
          className="text-white border-pink-500 hover:bg-pink-500/10"
          onClick={fetchStations}
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">FM Radio</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="text-white border-pink-500 hover:bg-pink-500/10"
          onClick={fetchStations}
        >
          Refresh
        </Button>
      </div>
      
      <div className="space-y-4">
        {stations.map((station) => (
          <div
            key={station.id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              {station.favicon && (
                <img 
                  src={station.favicon} 
                  alt={station.name}
                  className="w-10 h-10 rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
              <div>
                <h3 className="text-white font-medium">{station.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{station.genre}</span>
                  {station.country && (
                    <>
                      <span>•</span>
                      <span>{station.country}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className={`text-white hover:bg-gray-600 ${
                currentStation?.id === station.id && isPlaying ? 'bg-pink-500 hover:bg-pink-600' : ''
              }`}
              onClick={() => handlePlay(station)}
            >
              {currentStation?.id === station.id && isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={toggleMute}
          >
            {volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-[200px]"
          />
        </div>
      </div>
    </div>
  )
} 