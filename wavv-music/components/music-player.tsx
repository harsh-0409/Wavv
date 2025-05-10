"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, ListMusic } from "lucide-react"
import Image from "next/image"
import { useMusicPlayer } from "@/contexts/music-player-context"

export function MusicPlayer() {
  const { 
    currentSong, 
    isPlaying, 
    setIsPlaying,
    playNext,
    playPrevious 
  } = useMusicPlayer()
  const [volume, setVolume] = useState([70])
  const [progress, setProgress] = useState([30])
  const audioRef = useRef<HTMLAudioElement | HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    if (currentSong) {
      if (currentSong.isYoutube) {
        // For YouTube videos, we'll use the YouTube iframe API
        const videoId = currentSong.audioUrl.split('v=')[1]
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        audioRef.current = iframe
      } else {
        audioRef.current.src = currentSong.audioUrl
        if (isPlaying) {
          if (audioRef.current instanceof HTMLAudioElement) {
            audioRef.current.play()
          }
        } else {
          if (audioRef.current instanceof HTMLAudioElement) {
            audioRef.current.pause()
          }
        }
      }
    }

    return () => {
      if (audioRef.current) {
        if (currentSong?.isYoutube) {
          document.body.removeChild(audioRef.current)
        } else {
          (audioRef.current as HTMLAudioElement).pause()
        }
      }
    }
  }, [currentSong, isPlaying])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (currentSong?.isYoutube) {
        const iframe = audioRef.current as HTMLIFrameElement
        const player = new (window as any).YT.Player(iframe, {
          events: {
            onReady: (event: any) => {
              if (isPlaying) {
                event.target.pauseVideo()
              } else {
                event.target.playVideo()
              }
              setIsPlaying(!isPlaying)
            }
          }
        })
      } else if (audioRef.current instanceof HTMLAudioElement) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }
  }

  const handleNext = () => {
    playNext()
  }

  const handlePrevious = () => {
    playPrevious()
  }

  if (!currentSong) return null

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center px-4">
      <div className="flex items-center w-1/4">
        <div className="relative h-14 w-14 rounded overflow-hidden mr-3">
          <Image
            src={currentSong.cover}
            alt={currentSong.title}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-medium text-sm">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs">{currentSong.artist}</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-4 text-gray-400 hover:text-pink-500">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Shuffle className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white"
            onClick={handlePrevious}
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-white text-black hover:bg-gray-200 hover:text-black"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white"
            onClick={handleNext}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Repeat className="h-5 w-5" />
          </Button>
        </div>

        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-gray-400">1:23</span>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-700 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-white [&>span:first-child_span]:bg-pink-500"
          />
          <span className="text-xs text-gray-400">3:45</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <ListMusic className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2 w-32">
          <Volume2 className="h-5 w-5 text-gray-400" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="[&>span:first-child]:h-1 [&>span:first-child]:bg-gray-700 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-white [&>span:first-child_span]:bg-pink-500"
          />
        </div>
      </div>
    </div>
  )
}
