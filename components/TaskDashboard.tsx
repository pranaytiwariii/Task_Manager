'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { RootState } from '../store/store'
import { addTask, editTask, deleteTask, toggleTaskCompletion, setFilter, reorderTasks, Task } from '../store/tasksSlice'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function TaskDashboard() {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const filter = useSelector((state: RootState) => state.tasks.filter)
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      dispatch(addTask({ ...newTask, completed: false }))
      setNewTask({ title: '', description: '', dueDate: '' })
    }
  }

  const handleEditTask = () => {
    if (editingTask) {
      dispatch(editTask(editingTask))
      setEditingTask(null)
    }
  }

  const handleDeleteTask = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete))
      setTaskToDelete(null)
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    dispatch(reorderTasks({
      startIndex: result.source.index,
      endIndex: result.destination.index
    }))
  }

  const filteredTasks = tasks.filter(task => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const taskDate = new Date(task.dueDate)
    taskDate.setHours(0, 0, 0, 0)

    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())

    switch (filter) {
      case 'completed':
        return task.completed && matchesSearch
      case 'pending':
        return !task.completed && matchesSearch
      case 'overdue':
        return !task.completed && taskDate < today && matchesSearch
      default:
        return matchesSearch
    }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management Dashboard</h1>
      
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="mb-2"
        />
        <Input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>

      <div className="mb-4 flex space-x-2">
        <Select onValueChange={(value: any) => dispatch(setFilter(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="completed">Completed Tasks</SelectItem>
            <SelectItem value="pending">Pending Tasks</SelectItem>
            <SelectItem value="overdue">Overdue Tasks</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>{task.title}</CardTitle>
                          <CardDescription>Due: {task.dueDate}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{task.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => dispatch(toggleTaskCompletion(task.id))}
                          />
                          <Button onClick={() => setEditingTask(task)}>Edit</Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" onClick={() => setTaskToDelete(task.id)}>Delete</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete the task.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setTaskToDelete(null)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDeleteTask}>Delete</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleEditTask}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

