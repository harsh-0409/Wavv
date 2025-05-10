"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Music, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export function MusicUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [musicFile, setMusicFile] = useState<File | null>(null)
  const [musicInfo, setMusicInfo] = useState({
    title: "",
    artist: "",
    genre: "",
  })
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    const file = acceptedFiles[0]
    
    if (!file) {
      setError("Please select a valid audio file")
      return
    }

    if (!file.type.startsWith("audio/")) {
      setError("Please select a valid audio file (MP3, WAV, OGG, or M4A)")
      return
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB")
      return
    }

    setMusicFile(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".ogg", ".m4a"]
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!musicFile) {
      setError("Please select a music file")
      return
    }

    if (!musicInfo.title || !musicInfo.artist || !musicInfo.genre) {
      setError("Please fill in all fields")
      return
    }

    setIsUploading(true)
    setError(null)
    
    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("file", musicFile)
      formData.append("title", musicInfo.title)
      formData.append("artist", musicInfo.artist)
      formData.append("genre", musicInfo.genre)

      // Here you would typically make an API call to your backend
      // const response = await fetch("/api/music/upload", {
      //   method: "POST",
      //   body: formData,
      // })
      
      // For now, simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success("Music uploaded successfully!")
      setMusicFile(null)
      setMusicInfo({ title: "", artist: "", genre: "" })
    } catch (err) {
      setError("Failed to upload music. Please try again.")
      toast.error("Failed to upload music")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-pink-500 bg-pink-500/10" : "border-gray-700 hover:border-pink-500"}
          ${error ? "border-red-500" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-12 w-12 text-pink-500" />
          {musicFile ? (
            <div className="flex items-center space-x-2">
              <Music className="h-5 w-5 text-pink-500" />
              <span className="text-white">{musicFile.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMusicFile(null)
                  setError(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-gray-400">
              <p>Drag and drop your music file here, or click to select</p>
              <p className="text-sm mt-1">Supports MP3, WAV, OGG, M4A (max 50MB)</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">Title</Label>
          <Input
            id="title"
            value={musicInfo.title}
            onChange={(e) => {
              setMusicInfo(prev => ({ ...prev, title: e.target.value }))
              setError(null)
            }}
            placeholder="Enter song title"
            required
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="artist" className="text-white">Artist</Label>
          <Input
            id="artist"
            value={musicInfo.artist}
            onChange={(e) => {
              setMusicInfo(prev => ({ ...prev, artist: e.target.value }))
              setError(null)
            }}
            placeholder="Enter artist name"
            required
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre" className="text-white">Genre</Label>
          <Input
            id="genre"
            value={musicInfo.genre}
            onChange={(e) => {
              setMusicInfo(prev => ({ ...prev, genre: e.target.value }))
              setError(null)
            }}
            placeholder="Enter music genre"
            required
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white"
        disabled={!musicFile || isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Music"}
      </Button>
    </form>
  )
} 