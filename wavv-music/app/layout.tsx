import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { MusicPlayerProvider } from "@/contexts/music-player-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wavv Music - Your Music, Your Way",
  description: "Stream millions of songs, discover new artists, and create your perfect playlists with Wavv.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://www.youtube.com/iframe_api"></script>
      </head>
      <body className="min-h-screen bg-black text-white" suppressHydrationWarning>
        <MusicPlayerProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </MusicPlayerProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
