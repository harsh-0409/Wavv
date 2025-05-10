"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Clock, Music, Mic2, Radio, X, Calendar } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  type: 'song' | 'artist' | 'album' | 'event' | 'radio'
  image?: string
  subtitle?: string
  url: string
}

// Sample data for demonstration
const sampleData: SearchResult[] = [
  // Songs
  {
    id: "s1",
    title: "Midnight Dreams",
    type: "song",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    subtitle: "Luna Nova • Stellar Journey",
    url: "/new-releases"
  },
  {
    id: "s2",
    title: "Electric Soul",
    type: "song",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60",
    subtitle: "The Digital Wave • Digital Dreams",
    url: "/new-releases"
  },
  // Artists
  {
    id: "a1",
    title: "Luna Nova",
    type: "artist",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    subtitle: "Pop Artist",
    url: "/artist/luna-nova"
  },
  {
    id: "a2",
    title: "The Digital Wave",
    type: "artist",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60",
    subtitle: "Electronic Artist",
    url: "/artist/digital-wave"
  },
  // Events
  {
    id: "e1",
    title: "Summer Music Festival",
    type: "event",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60",
    subtitle: "July 15, 2024 • Central Park, NY",
    url: "/events"
  },
  // Radio Stations
  {
    id: "r1",
    title: "Pop Hits Radio",
    type: "radio",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    subtitle: "24/7 Pop Music",
    url: "/radio"
  }
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    if (isClient) {
      const savedSearches = localStorage.getItem('recentSearches')
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches))
      }
    }
  }, [isClient])

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    }
  }, [recentSearches, isClient])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // Filter sample data based on search query
      const results = sampleData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
      setShowResults(true)

      // Add to recent searches if not already present
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev].slice(0, 5))
      }
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search))
  }

  const getIconForType = (type: SearchResult['type']) => {
    switch (type) {
      case 'song':
        return <Music className="h-5 w-5" />
      case 'artist':
        return <Mic2 className="h-5 w-5" />
      case 'event':
        return <Calendar className="h-5 w-5" />
      case 'radio':
        return <Radio className="h-5 w-5" />
      default:
        return <Music className="h-5 w-5" />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Search</h1>
            <p className="text-gray-400">Find your favorite music, artists, and events</p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for songs, artists, albums, events..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowResults(true)}
            />
          </div>

          {showResults && (
            <div className="space-y-6">
              {searchQuery ? (
                <>
                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        {result.image && (
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{result.title}</h3>
                          {result.subtitle && (
                            <p className="text-gray-400 text-sm">{result.subtitle}</p>
                          )}
                        </div>
                        {getIconForType(result.type)}
                      </Link>
                    ))}
                    {searchResults.length === 0 && (
                      <p className="text-gray-400 text-center py-4">No results found</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {isClient && recentSearches.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-white mb-4">Recent Searches</h2>
                      <div className="space-y-2">
                        {recentSearches.map((search) => (
                          <div
                            key={search}
                            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-gray-400" />
                              <span className="text-white">{search}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => removeRecentSearch(search)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 