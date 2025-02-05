import { HeroSection } from "@/components/hero-section"
import { SearchBar } from "@/components/search-bar"
import { ServiceCards } from "@/components/service-cards"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900">
      <HeroSection />
      <SearchBar />
      <ServiceCards />
      <Footer />
    </main>
  )
}

