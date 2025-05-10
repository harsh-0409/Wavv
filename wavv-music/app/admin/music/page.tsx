"use client"

import { useEffect, useState } from "react"
import { MusicUpload } from "@/components/music-upload"
import { MusicList } from "@/components/music-list"

export default function AdminMusicPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Music Management</h1>
        
        <div className="grid gap-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Upload New Music</h2>
            <MusicUpload />
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Uploaded Music</h2>
            <MusicList />
          </div>
        </div>
      </div>
    </div>
  )
} 