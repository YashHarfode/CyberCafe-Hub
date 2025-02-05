"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DataEntryForm() {
  const [customerData, setCustomerData] = useState([])
  const [newEntry, setNewEntry] = useState({
    aadhaar: "",
    pan: "",
    voterId: "",
    samagraId: "",
    customLabel: "",
    customValue: "",
  })
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCustomerData([...customerData, newEntry])
    setNewEntry({ aadhaar: "", pan: "", voterId: "", samagraId: "", customLabel: "", customValue: "" })
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault()
    setTasks([...tasks, { text: newTask, completed: false }])
    setNewTask("")
  }

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Customer Data Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="aadhaar" placeholder="Aadhaar Number" value={newEntry.aadhaar} onChange={handleInputChange} />
            <Input name="pan" placeholder="PAN" value={newEntry.pan} onChange={handleInputChange} />
            <Input name="voterId" placeholder="Voter ID" value={newEntry.voterId} onChange={handleInputChange} />
            <Input name="samagraId" placeholder="Samagra ID" value={newEntry.samagraId} onChange={handleInputChange} />
            <Input
              name="customLabel"
              placeholder="Custom Label"
              value={newEntry.customLabel}
              onChange={handleInputChange}
            />
            <Input
              name="customValue"
              placeholder="Custom Value"
              value={newEntry.customValue}
              onChange={handleInputChange}
            />
            <Button type="submit">Save Entry</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTaskSubmit} className="space-y-4 mb-4">
            <Input placeholder="New task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <Button type="submit">Add Task</Button>
          </form>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center space-x-2 mb-2">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)} />
                <span className={task.completed ? "line-through" : ""}>{task.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

