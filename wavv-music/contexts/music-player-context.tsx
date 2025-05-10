"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface Song {
  id: number
  title: string
  artist: string
  cover: string
  audioUrl: string
}

interface MusicPlayerContextType {
  currentSong: Song | null
  isPlaying: boolean
  playlist: Song[]
  setCurrentSong: (song: Song | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setPlaylist: (songs: Song[]) => void
  playNext: () => void
  playPrevious: () => void
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined)

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>([])

  const playNext = () => {
    if (!currentSong || playlist.length === 0) return
    
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentSong(playlist[nextIndex])
  }

  const playPrevious = () => {
    if (!currentSong || playlist.length === 0) return
    
    const currentIndex = playlist.findIndex(song => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    setCurrentSong(playlist[prevIndex])
  }

  return (
    <MusicPlayerContext.Provider value={{ 
      currentSong, 
      isPlaying, 
      playlist,
      setCurrentSong, 
      setIsPlaying,
      setPlaylist,
      playNext,
      playPrevious
    }}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext)
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider')
  }
  return context
}
