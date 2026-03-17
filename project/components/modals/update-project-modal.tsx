"use client"

import { useState, useTransition } from "react"
import { updateProject } from "@/lib/actions/projects"
import { useToast } from "@/hooks/use-toast"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface UpdateProjectModalProps {
  project: {
    id: string
    name: string
    description?: string
  }
}

export function UpdateProjectModal({ project }: UpdateProjectModalProps) {

  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { toast } = useToast()

  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description || "")

  const handleUpdate = () => {

    startTransition(async () => {
      try {

        await updateProject(project.id, {
          projectName: name,
          description
        })

        toast({
          title: "Project updated",
          description: "Your project was successfully updated."
        })

        setOpen(false)

      } catch (error) {

        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Something went wrong."
        })

      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <button className="w-full text-left px-2 py-1 text-sm">
          Edit
        </button>
      </DialogTrigger>

      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
          />

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={handleUpdate}
          >
            {isPending ? "Updating..." : "Update Project"}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  )
}