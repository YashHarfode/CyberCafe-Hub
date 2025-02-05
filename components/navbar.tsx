import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-500">CyberCafe Hub</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/admin">
              <Button variant="outline">Admin Panel</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

