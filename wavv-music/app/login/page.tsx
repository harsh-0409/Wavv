import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { MusicIcon } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="container mx-auto py-4 px-4">
        <Link href="/" className="flex items-center space-x-2 w-fit">
          <MusicIcon className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold text-white">Wavv</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 rounded-xl p-8 shadow-2xl border border-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 mt-2">Log in to continue your music journey</p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center text-gray-400">
              <p>
                Don't have an account?{" "}
                <Link href="/signup" className="text-pink-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
