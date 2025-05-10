"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit2, Mail, Music, User } from "lucide-react"

export function ProfileDialog() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "jaggu bandar",
    email: "jaggubandar@example.com",
    username: "motupatlu",
    favoriteGenre: "bhojpuri",
    bio: "i love bhojpuri music",
    avatar: "/download (2).jpeg"
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
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-pink-500 text-xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-pink-500 hover:bg-pink-600"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
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

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-400">Name</Label>
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ) : (
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-4 w-4" />
                  <span>{profile.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Email</Label>
              {isEditing ? (
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ) : (
                <div className="flex items-center space-x-2 text-white">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Favorite Genre</Label>
              {isEditing ? (
                <Input
                  value={profile.favoriteGenre}
                  onChange={(e) => setProfile(prev => ({ ...prev, favoriteGenre: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ) : (
                <div className="flex items-center space-x-2 text-white">
                  <Music className="h-4 w-4" />
                  <span>{profile.favoriteGenre}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Bio</Label>
              {isEditing ? (
                <Input
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ) : (
                <p className="text-white">{profile.bio}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
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
                className="bg-pink-500 hover:bg-pink-600 text-white"
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