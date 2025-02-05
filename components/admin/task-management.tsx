"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface Task {
  id: string
  title: string
  completed: boolean
}

interface Note {
  id: string
  content: string
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [newTask, setNewTask] = useState("")
  const [newNote, setNewNote] = useState("")
  const { toast } = useToast()

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTask, completed: false }])
      setNewTask("")
      toast({
        title: "Task added",
        description: "The task has been added successfully.",
      })
    }
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
      variant: "destructive",
    })
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now().toString(), content: newNote }])
      setNewNote("")
      toast({
        title: "Note added",
        description: "The note has been added successfully.",
      })
    }
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    toast({
      title: "Note deleted",
      description: "The note has been deleted successfully.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTask} className="flex space-x-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Task
            </Button>
          </form>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between bg-gray-700 p-2 rounded"
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleTask(task.id)}
                    className="mr-2"
                  />
                  <span className={`text-white ${task.completed ? "line-through" : ""}`}>{task.title}</span>
                </div>
                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNote} className="space-y-2 mb-4">
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Note
            </Button>
          </form>
          <ul className="space-y-2">
            {notes.map((note) => (
              <motion.li
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between bg-gray-700 p-2 rounded"
              >
                <span className="text-white">{note.content}</span>
                <Button variant="destructive" onClick={() => handleDeleteNote(note.id)}>
                  Delete
                </Button>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

