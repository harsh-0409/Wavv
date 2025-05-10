"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Bell, Moon, Sun, Volume2, User, Shield, Globe, Music, Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile Settings
    username: "",
    email: "",
    language: "en",
    theme: "dark",
    
    // Audio Settings
    volume: 80,
    quality: "high",
    crossfade: 5,
    normalize: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    newReleases: true,
    liveEvents: true,
    
    // Privacy Settings
    profileVisibility: "public",
    showListeningActivity: true,
    showRecentlyPlayed: true,
    
    // Playback Settings
    autoplay: true,
    gaplessPlayback: true,
    highQualityStreaming: true
  })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const saveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  if (!isClient) return null

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Customize your Wavv experience</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <section className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Profile Settings</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={settings.username}
                    onChange={(e) => handleSettingChange('username', e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label>Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => handleSettingChange('language', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleSettingChange('theme', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Audio Settings */}
            <section className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Volume2 className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Audio Settings</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Volume</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[settings.volume]}
                      onValueChange={([value]) => handleSettingChange('volume', value)}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400">{settings.volume}%</span>
                  </div>
                </div>
                <div>
                  <Label>Audio Quality</Label>
                  <Select
                    value={settings.quality}
                    onValueChange={(value) => handleSettingChange('quality', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (96 kbps)</SelectItem>
                      <SelectItem value="medium">Medium (160 kbps)</SelectItem>
                      <SelectItem value="high">High (320 kbps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Crossfade</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[settings.crossfade]}
                      onValueChange={([value]) => handleSettingChange('crossfade', value)}
                      max={12}
                      step={1}
                      className="w-32"
                    />
                    <span className="text-sm text-gray-400">{settings.crossfade}s</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Normalize Volume</Label>
                  <Switch
                    checked={settings.normalize}
                    onCheckedChange={(checked) => handleSettingChange('normalize', checked)}
                  />
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Notification Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Push Notifications</Label>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>New Releases</Label>
                  <Switch
                    checked={settings.newReleases}
                    onCheckedChange={(checked) => handleSettingChange('newReleases', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Live Events</Label>
                  <Switch
                    checked={settings.liveEvents}
                    onCheckedChange={(checked) => handleSettingChange('liveEvents', checked)}
                  />
                </div>
              </div>
            </section>

            {/* Privacy Settings */}
            <section className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Privacy Settings</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Profile Visibility</Label>
                  <Select
                    value={settings.profileVisibility}
                    onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Listening Activity</Label>
                  <Switch
                    checked={settings.showListeningActivity}
                    onCheckedChange={(checked) => handleSettingChange('showListeningActivity', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Recently Played</Label>
                  <Switch
                    checked={settings.showRecentlyPlayed}
                    onCheckedChange={(checked) => handleSettingChange('showRecentlyPlayed', checked)}
                  />
                </div>
              </div>
            </section>

            {/* Playback Settings */}
            <section className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Music className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Playback Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Autoplay</Label>
                  <Switch
                    checked={settings.autoplay}
                    onCheckedChange={(checked) => handleSettingChange('autoplay', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Gapless Playback</Label>
                  <Switch
                    checked={settings.gaplessPlayback}
                    onCheckedChange={(checked) => handleSettingChange('gaplessPlayback', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>High Quality Streaming</Label>
                  <Switch
                    checked={settings.highQualityStreaming}
                    onCheckedChange={(checked) => handleSettingChange('highQualityStreaming', checked)}
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <Button
                className="bg-pink-500 hover:bg-pink-600"
                onClick={saveSettings}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 