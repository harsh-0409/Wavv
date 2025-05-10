"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit2, Mail, Music, User, Camera } from "lucide-react"

export function ProfileDialog() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "jaggu bandar",
    email: "jaggubandar@example.com",
    username: "motupatlu",
    favoriteGenre: "bhojpuri",
    bio: "i love bhojpuri music",
    avatar: "/Poster Concepts Bruno Mars - APT.jpeg"
  })

  const handleSave = () => {
    // Here you would typically save the profile data to your backend
    setIsEditing(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="relative group">
            <div className="relative h-32 w-32 rounded-full overflow-hidden ring-4 ring-pink-500/20">
              <Avatar className="h-full w-full">
                <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" />
                <AvatarFallback className="bg-pink-500 text-xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  className="rounded-full bg-pink-500 hover:bg-pink-600"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>
            )}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setProfile(prev => ({ ...prev, avatar: reader.result as string }))
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
          </div>

          <div className="w-full space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-400 text-sm font-medium">Name</Label>
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white h-10"
                />
              ) : (
                <div className="flex items-center space-x-2 text-white bg-gray-800/50 p-3 rounded-lg">
                  <User className="h-4 w-4 text-pink-500" />
                  <span className="font-medium">{profile.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-sm font-medium">Email</Label>
              {isEditing ? (
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white h-10"
                />
              ) : (
                <div className="flex items-center space-x-2 text-white bg-gray-800/50 p-3 rounded-lg">
                  <Mail className="h-4 w-4 text-pink-500" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-sm font-medium">Favorite Genre</Label>
              {isEditing ? (
                <Input
                  value={profile.favoriteGenre}
                  onChange={(e) => setProfile(prev => ({ ...prev, favoriteGenre: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white h-10"
                />
              ) : (
                <div className="flex items-center space-x-2 text-white bg-gray-800/50 p-3 rounded-lg">
                  <Music className="h-4 w-4 text-pink-500" />
                  <span>{profile.favoriteGenre}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-sm font-medium">Bio</Label>
              {isEditing ? (
                <Input
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white h-10"
                />
              ) : (
                <div className="text-white bg-gray-800/50 p-3 rounded-lg">
                  <p>{profile.bio}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 w-full">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="text-white hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white w-full"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 