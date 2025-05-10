import RadioComponent from "@/components/radio"

export default function RadioPage() {
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">FM Radio</h1>
            <p className="text-gray-400">Listen to live FM radio stations from around the world</p>
          </div>
          <RadioComponent />
        </div>
      </div>
    </div>
  )
} 