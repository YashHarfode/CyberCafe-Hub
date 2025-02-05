"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import type React from "react"

interface CustomerData {
  id: string
  name: string
  aadhaar: string
  pan: string
  voterId: string
  samagraId: string
  customEntries: { [key: string]: string }
}

export function DataEntryForm() {
  const [customerData, setCustomerData] = useState<CustomerData[]>([])
  const [newEntry, setNewEntry] = useState<CustomerData>({
    id: "",
    name: "",
    aadhaar: "",
    pan: "",
    voterId: "",
    samagraId: "",
    customEntries: {},
  })
  const [customField, setCustomField] = useState({ key: "", value: "" })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value })
  }

  const handleCustomFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomField({ ...customField, [e.target.name]: e.target.value })
  }

  const handleAddCustomField = () => {
    if (customField.key && customField.value) {
      setNewEntry({
        ...newEntry,
        customEntries: {
          ...newEntry.customEntries,
          [customField.key]: customField.value,
        },
      })
      setCustomField({ key: "", value: "" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const entryWithId = { ...newEntry, id: Date.now().toString() }
    setCustomerData([...customerData, entryWithId])
    setNewEntry({
      id: "",
      name: "",
      aadhaar: "",
      pan: "",
      voterId: "",
      samagraId: "",
      customEntries: {},
    })
    toast({
      title: "Customer data added",
      description: "The customer data has been added successfully.",
    })
  }

  const handleDelete = (id: string) => {
    setCustomerData(customerData.filter((entry) => entry.id !== id))
    toast({
      title: "Customer data deleted",
      description: "The customer data has been deleted successfully.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Add Customer Data</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Customer Name"
              value={newEntry.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={newEntry.aadhaar}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="pan"
              placeholder="PAN"
              value={newEntry.pan}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="voterId"
              placeholder="Voter ID"
              value={newEntry.voterId}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Input
              name="samagraId"
              placeholder="Samagra ID"
              value={newEntry.samagraId}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <div className="flex space-x-2">
              <Input
                name="key"
                placeholder="Custom Field Name"
                value={customField.key}
                onChange={handleCustomFieldChange}
                className="bg-gray-700 text-white border-gray-600"
              />
              <Input
                name="value"
                placeholder="Custom Field Value"
                value={customField.value}
                onChange={handleCustomFieldChange}
                className="bg-gray-700 text-white border-gray-600"
              />
              <Button type="button" onClick={handleAddCustomField} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Field
              </Button>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Customer Data Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {customerData.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 border rounded border-gray-700"
            >
              <p className="text-gray-300">Name: {entry.name}</p>
              <p className="text-gray-300">Aadhaar: {entry.aadhaar}</p>
              <p className="text-gray-300">PAN: {entry.pan}</p>
              <p className="text-gray-300">Voter ID: {entry.voterId}</p>
              <p className="text-gray-300">Samagra ID: {entry.samagraId}</p>
              {Object.entries(entry.customEntries).map(([key, value]) => (
                <p key={key} className="text-gray-300">
                  {key}: {value}
                </p>
              ))}
              <Button variant="destructive" onClick={() => handleDelete(entry.id)} className="mt-2">
                Delete
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

