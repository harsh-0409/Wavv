"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import Image from "next/image"
import { useMusicPlayer } from "@/contexts/music-player-context"

export function FeaturedContent() {
  const { setCurrentSong, setIsPlaying, setPlaylist } = useMusicPlayer()
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | HTMLIFrameElement | null>(null)

  const recentlyPlayed = [
    { 
      id: 1, 
      title: "After Hours", 
      artist: "The Weeknd", 
      cover: "/afterhours.jpg",
      audioUrl: "/songs/after-hours.mp3",
      isYoutube: false
    },
    { 
      id: 2, 
      title: "Future Nostalgia", 
      artist: "Dua Lipa", 
      cover: "/futuren.jpg",
      audioUrl: "/songs/future-nostalgia.mp3",
      isYoutube: false
    },
    { 
      id: 3, 
      title: "Chromatica", 
      artist: "Lady Gaga", 
      cover: "/download (3).jpeg",
      audioUrl: "/songs/chromatica.mp3",
      isYoutube: false
    },
    { 
      id: 4, 
      title: "Fine Line", 
      artist: "Harry Styles", 
      cover: "/download (4).jpeg",
      audioUrl: "/songs/fine-line.mp3",
      isYoutube: false
    },
    { 
      id: 5, 
      title: "Folklore", 
      artist: "Taylor Swift", 
      cover: "/download (5).jpeg",
      audioUrl: "/songs/folklore.mp3",
      isYoutube: false
    },
  ]

  const forYou = [
    {
      id: 1,
      title: "Today's Hits",
      artist: "Various Artists",
      description: "The hottest tracks right now",
      cover: "/todayh.jpg",
      audioUrl: "https://www.youtube.com/watch?v=kPa7bsKwL-c&list=PLOHoVaTp8R7dWeCQrKfh7a1a_Gu6KvfWP",
      isYoutube: true
    },
    {
      id: 2,
      title: "Chill Vibes",
      artist: "Various Artists",
      description: "Relaxing beats for your day",
      cover: "/chillv.jpg",
      audioUrl: "https://www.youtube.com/watch?v=kPa7bsKwL-c&list=PLOHoVaTp8R7dWeCQrKfh7a1a_Gu6KvfWP",
      isYoutube: true
    },
    {
      id: 3,
      title: "Workout Energy",
      artist: "Various Artists",
      description: "Power your workout",
      cover: "/download (3).jpeg",
      audioUrl: "https://www.youtube.com/watch?v=kPa7bsKwL-c&list=PLOHoVaTp8R7dWeCQrKfh7a1a_Gu6KvfWP",
      isYoutube: true
    },
  ]

  const handlePlay = (id: number, audioUrl: string, song: any) => {
    if (currentlyPlaying === id) {
      // If clicking the currently playing song, pause it
      if (audioRef.current) {
        if (song.isYoutube) {
          const iframe = audioRef.current as HTMLIFrameElement
          const player = new (window as any).YT.Player(iframe, {
            events: {
              onReady: (event: any) => {
                event.target.pauseVideo()
                setCurrentlyPlaying(null)
                setIsPlaying(false)
              }
            }
          })
        } else if (audioRef.current instanceof HTMLAudioElement) {
          audioRef.current.pause()
          setCurrentlyPlaying(null)
          setIsPlaying(false)
        }
      }
    } else {
      // If clicking a new song, stop the current one and play the new one
      if (audioRef.current) {
        const currentSong = forYou.find(s => s.id === currentlyPlaying) || recentlyPlayed.find(s => s.id === currentlyPlaying)
        if (currentSong?.isYoutube) {
          document.body.removeChild(audioRef.current)
        } else if (currentSong) {
          (audioRef.current as HTMLAudioElement).pause()
        }
      }
      
      // Create new audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio()
      }
      
      if (song.isYoutube) {
        // For YouTube videos, we'll use the YouTube iframe API
        const videoId = audioUrl.split('v=')[1]
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        
        // Store the iframe reference
        audioRef.current = iframe as any
      } else {
        audioRef.current.src = audioUrl
        if (audioRef.current instanceof HTMLAudioElement) {
          audioRef.current.play()
        }
      }
      
      setCurrentlyPlaying(id)
      setIsPlaying(true)
      setPlaylist([...recentlyPlayed, ...forYou])
      setCurrentSong(song)
      
      // Add event listener for when the song ends
      if (!song.isYoutube && audioRef.current) {
        audioRef.current.onended = () => {
          setCurrentlyPlaying(null)
          setIsPlaying(false)
          setCurrentSong(null)
        }
      }
    }
  }

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
                    <Button 
                      size="icon" 
                      className="rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                      onClick={() => handlePlay(item.id, item.audioUrl, item)}
                    >
                      {currentlyPlaying === item.id ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 fill-current" />
                      )}
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
                    <Button 
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                      onClick={() => handlePlay(item.id, item.audioUrl, item)}
                    >
                      {currentlyPlaying === item.id ? (
                        <Pause className="h-4 w-4 mr-2 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 mr-2 fill-current" />
                      )}
                      {currentlyPlaying === item.id ? 'Pause' : 'Play Now'}
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
                    <Button 
                      size="icon" 
                      className="rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                      onClick={() => handlePlay(i + 100, `/songs/new-release-${i + 1}.mp3`, {
                        id: i + 100,
                        title: "New Album Title",
                        artist: "Artist Name",
                        cover: "/newr.jpg",
                        audioUrl: `/songs/new-release-${i + 1}.mp3`
                      })}
                    >
                      {currentlyPlaying === i + 100 ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 fill-current" />
                      )}
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
