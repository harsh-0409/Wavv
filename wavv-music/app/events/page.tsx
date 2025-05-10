"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Ticket, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Event {
  id: string
  title: string
  artist: string
  date: string
  time: string
  venue: string
  location: string
  price: string
  image: string
  genre: string
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    artist: "Various Artists",
    date: "2024-07-15",
    time: "14:00",
    venue: "Central Park",
    location: "New York, NY",
    price: "$150",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60",
    genre: "Multiple Genres"
  },
  {
    id: "2",
    title: "Jazz Night",
    artist: "The Modern Jazz Quartet",
    date: "2024-06-20",
    time: "20:00",
    venue: "Blue Note Jazz Club",
    location: "Greenwich Village, NY",
    price: "$75",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
    genre: "Jazz"
  },
  {
    id: "3",
    title: "Rock Revolution",
    artist: "The Electric Souls",
    date: "2024-08-05",
    time: "19:30",
    venue: "Madison Square Garden",
    location: "Manhattan, NY",
    price: "$120",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
    genre: "Rock"
  },
  {
    id: "4",
    title: "Hip Hop Showcase",
    artist: "Urban Beats Collective",
    date: "2024-07-30",
    time: "21:00",
    venue: "Brooklyn Steel",
    location: "Brooklyn, NY",
    price: "$65",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
    genre: "Hip Hop"
  },
  {
    id: "5",
    title: "Classical Evening",
    artist: "New York Philharmonic",
    date: "2024-06-25",
    time: "19:00",
    venue: "Carnegie Hall",
    location: "Midtown Manhattan, NY",
    price: "$95",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=60",
    genre: "Classical"
  },
  {
    id: "6",
    title: "Electronic Dreams",
    artist: "Digital Wave",
    date: "2024-08-12",
    time: "22:00",
    venue: "Terminal 5",
    location: "Hell's Kitchen, NY",
    price: "$85",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60",
    genre: "Electronic"
  }
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const genres = Array.from(new Set(sampleEvents.map(event => event.genre)))

  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = !selectedGenre || event.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Live Events</h1>
            <p className="text-gray-400">Discover and book tickets for upcoming music events</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search events, artists, or venues..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    className={`${
                      selectedGenre === genre
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "border-gray-700 text-white hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.genre}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-pink-500 font-medium mb-4">{event.artist}</p>
                  
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4" />
                      <span>{event.price}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600">
                    Get Tickets
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 