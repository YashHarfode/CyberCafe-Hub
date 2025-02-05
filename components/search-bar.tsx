"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { services } from "@/data/services"
import Link from "next/link"
import type React from "react" // Added import for React

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof services>([])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const keywords = searchQuery.toLowerCase().split(" ")
    const filteredServices = services.filter((service) =>
      keywords.every(
        (keyword) =>
          service.name.toLowerCase().includes(keyword) ||
          service.category.toLowerCase().includes(keyword) ||
          service.description.toLowerCase().includes(keyword),
      ),
    )
    setSearchResults(filteredServices)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="relative w-full max-w-xl mx-auto mb-12">
      <form onSubmit={handleSearch} className="flex">
        <Input
          type="text"
          placeholder="Search for a service"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2 bg-gray-800 text-white border-gray-700"
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          {searchResults.map((service) => (
            <Link key={service.id} href={`/service/${service.id}`}>
              <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                <p className="text-white">{service.name}</p>
                <p className="text-sm text-gray-400">{service.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

