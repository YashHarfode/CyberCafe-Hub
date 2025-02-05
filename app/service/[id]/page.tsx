"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import type { Service } from "@/data/services"
import { CreditCard, Baby, Briefcase, Zap } from "lucide-react"

const iconMap = {
  CreditCard,
  Baby,
  Briefcase,
  Zap,
}

export default function ServicePage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)

  useEffect(() => {
    const fetchService = async () => {
      if (params.id) {
        const docRef = doc(db, "services", params.id as string)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() } as Service)
        }
      }
    }
    fetchService()
  }, [params.id])

  if (!service) {
    return <div>Loading...</div>
  }

  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || CreditCard

  const calculateEarning = (official: string, service: string) => {
    const officialFee = Number.parseFloat(official.replace(/[^\d.-]/g, ""))
    const serviceFee = Number.parseFloat(service.replace(/[^\d.-]/g, ""))
    return isNaN(officialFee) || isNaN(serviceFee) ? "N/A" : `₹${(serviceFee - officialFee).toFixed(2)}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-3xl flex items-center">
            <IconComponent className="w-8 h-8 mr-2 text-blue-500" />
            {service.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="mb-4">{service.description}</p>
          <h2 className="text-xl font-semibold mb-2">Required Documents</h2>
          <p className="mb-4">{service.details.documents}</p>
          <h2 className="text-xl font-semibold mb-2">Processing Time</h2>
          <p className="mb-4">{service.details.time}</p>
          <h2 className="text-xl font-semibold mb-2">Fees</h2>
          <p className="mb-4 text-red-500">Official Fees: {service.details.fees.official}</p>
          <p className="mb-4 text-green-500">Service Charge: {service.details.fees.service}</p>
          <p className="mb-4 text-blue-500">
            Earning: {calculateEarning(service.details.fees.official, service.details.fees.service)}
          </p>
          <a href={service.govtLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Go to Government Website</Button>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}

