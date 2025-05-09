"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, ListMusic } from "lucide-react"
import Image from "next/image"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])
  const [progress, setProgress] = useState([30])

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center px-4">
      <div className="flex items-center w-1/4">
        <div className="relative h-14 w-14 rounded overflow-hidden mr-3">
          <Image
            src="/placeholder.svg?height=56&width=56"
            alt="Album Cover"
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-medium text-sm">Blinding Lights</h4>
          <p className="text-gray-400 text-xs">The Weeknd</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-4 text-gray-400 hover:text-pink-500">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4 mb-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Shuffle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-white text-black hover:bg-gray-200 hover:text-black"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
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

      <div className="w-1/4 flex items-center justify-end space-x-4">
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
