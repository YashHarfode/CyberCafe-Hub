"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceManagement } from "@/components/admin/service-management"
import { DataEntryForm } from "@/components/admin/data-entry-form"
import { TaskManagement } from "@/components/admin/task-management";

export default function AdminPanel() {
  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Admin Panel</h1>
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Service Management</TabsTrigger>
          <TabsTrigger value="data">Data Entry</TabsTrigger>
          <TabsTrigger value="tasks">Tasks & Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="services">
          <ServiceManagement />
        </TabsContent>
        <TabsContent value="data">
          <DataEntryForm />
        </TabsContent>
        <TabsContent value="tasks">
          <TaskManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

