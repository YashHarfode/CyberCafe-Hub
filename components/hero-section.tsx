import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="text-center py-20 w-full max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold mb-4 text-blue-500">CyberCafe Hub</h1>
        <p className="text-xl mb-8 text-gray-300">Simplify Your Service Tasks with a Click</p>
        <Link href="/admin">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Go to Admin Panel
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}

