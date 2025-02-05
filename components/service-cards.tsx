"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { serviceCategories, type Service } from "@/data/services"
import Link from "next/link"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { CreditCard, Baby, Briefcase, Zap } from "lucide-react"

const iconMap = {
  CreditCard,
  Baby,
  Briefcase,
  Zap,
}

export function ServiceCards() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"))
    const fetchedServices = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Service)
    setServices(fetchedServices)
  }

  const filteredServices = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services

  const calculateEarning = (official: string, service: string) => {
    const officialFee = Number.parseFloat(official.replace(/[^\d.-]/g, ""))
    const serviceFee = Number.parseFloat(service.replace(/[^\d.-]/g, ""))
    return isNaN(officialFee) || isNaN(serviceFee) ? "N/A" : `₹${(serviceFee - officialFee).toFixed(2)}`
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={() => setSelectedCategory(null)} variant={selectedCategory === null ? "default" : "outline"}>
          All
        </Button>
        {serviceCategories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredServices.map((service) => {
          const IconComponent = iconMap[service.icon as keyof typeof iconMap] || CreditCard
          return (
            <motion.div key={service.id} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className="relative overflow-hidden bg-gray-800 border-gray-700 h-full"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                    <IconComponent className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-white">{service.name}</h3>
                  {hoveredService === service.id && (
                    <motion.div
                      className="absolute inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-sm mb-2 text-gray-300">Documents: {service.details.documents}</p>
                      <p className="text-sm mb-2 text-gray-300">Processing Time: {service.details.time}</p>
                      <p className="text-sm mb-2 text-red-500">Official Fees: {service.details.fees.official}</p>
                      <p className="text-sm mb-2 text-green-500">Service Charge: {service.details.fees.service}</p>
                      <p className="text-sm mb-4 text-blue-500">
                        Earning: {calculateEarning(service.details.fees.official, service.details.fees.service)}
                      </p>
                      <Link href={`/service/${service.id}`}>
                        <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-900">
                          View More
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

