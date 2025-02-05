"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { type Service, serviceCategories } from "@/data/services"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore"

export function ServiceManagement() {
  const [localServices, setLocalServices] = useState<Service[]>([])
  const [newService, setNewService] = useState<Partial<Service>>({
    id: "",
    name: "",
    category: "",
    details: {
      documents: "",
      time: "",
      fees: {
        official: "",
        service: "",
      },
    },
    description: "",
    govtLink: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"))
    const services = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Service)
    setLocalServices(services)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewService((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }))
  }

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewService((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        fees: {
          ...prev.details?.fees,
          [name]: value,
        },
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (newService.id) {
        await updateDoc(doc(db, "services", newService.id), newService as Service)
      } else {
        await addDoc(collection(db, "services"), newService)
      }
      await fetchServices()
      setNewService({
        id: "",
        name: "",
        category: "",
        details: {
          documents: "",
          time: "",
          fees: {
            official: "",
            service: "",
          },
        },
        description: "",
        govtLink: "",
      })
      toast({
        title: newService.id ? "Service updated" : "Service added",
        description: `${newService.name} has been ${newService.id ? "updated" : "added"} successfully.`,
      })
    } catch (error) {
      console.error("Error adding/updating service: ", error)
      toast({
        title: "Error",
        description: "An error occurred while saving the service.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (service: Service) => {
    setNewService(service)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "services", id))
      await fetchServices()
      toast({
        title: "Service deleted",
        description: "The service has been deleted successfully.",
        variant: "destructive",
      })
    } catch (error) {
      console.error("Error deleting service: ", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the service.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Add/Edit Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Service Name"
              value={newService.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Select
              name="category"
              value={newService.category}
              onValueChange={(value) => setNewService((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="documents"
              placeholder="Required Documents"
              value={newService.details?.documents}
              onChange={handleDetailChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="time"
              placeholder="Processing Time"
              value={newService.details?.time}
              onChange={handleDetailChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="official"
              placeholder="Official Fees"
              value={newService.details?.fees.official}
              onChange={handleFeeChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="service"
              placeholder="Service Charge"
              value={newService.details?.fees.service}
              onChange={handleFeeChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Textarea
              name="description"
              placeholder="Service Description"
              value={newService.description}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="govtLink"
              placeholder="Government Website Link"
              value={newService.govtLink}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {newService.id ? "Update Service" : "Add Service"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Service Listing</CardTitle>
        </CardHeader>
        <CardContent>
          {localServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 border rounded border-gray-700"
            >
              <h3 className="font-bold text-white">{service.name}</h3>
              <p className="text-gray-300">Category: {service.category}</p>
              <p className="text-gray-300">Documents: {service.details.documents}</p>
              <p className="text-gray-300">Time: {service.details.time}</p>
              <p className="text-gray-300">Official Fees: {service.details.fees.official}</p>
              <p className="text-gray-300">Service Charge: {service.details.fees.service}</p>
              <p className="text-gray-300">Description: {service.description}</p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(service)}
                  className="mr-2 text-blue-500 border-blue-500 hover:bg-blue-900"
                >
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(service.id)}>
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

