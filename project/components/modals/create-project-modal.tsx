// TODO: Task 4.1 - Implement project CRUD operations
// TODO: Task 4.4 - Build task creation and editing functionality

/*
TODO: Implementation Notes for Interns:

Modal for creating new projects with form validation.

Features to implement:
- Form with project name, description, due date
- Zod validation
- Error handling
- Loading states
- Success feedback
- Team member assignment
- Project template selection

Form fields:
- Name (required)
- Description (optional)
- Due date (optional)
- Team members (optional)
- Project template (optional)
- Privacy settings

Integration:
- Use project validation schema from lib/validations.ts
- Call project creation API
- Update project list optimistically
- Handle errors gracefully
*/

"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { projectSchema, ProjectFormInput, ProjectFormOutput } from "@/lib/validations";
import { createProject } from "@/lib/actions/projects";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod'

interface CreateProjectModalProps {
  onOptimisticAdd: (action: { type: 'create' | 'delete', payload: any }) => void;
}

export function CreateProjectModal({ onOptimisticAdd }: CreateProjectModalProps) {
  const [open, setOpen]= useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      status: "active",
      dueDate: null,
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: ProjectFormInput) {
    const tempId = crypto.randomUUID()

    const optimisticProject = {
      id: tempId,
      projectName: data.projectName,
      description: data.description || "",
      status: "active",
      progress: 0,
      memberCount: 0,
      dueDate: data.dueDate,
    };

    startTransition(async () => {
        onOptimisticAdd({ type: 'create', payload: optimisticProject });
        
        setOpen(false);
        form.reset();

        try {
          await createProject(data);
          toast({
            title: "Project Created!",
            description: "Your new workspace is ready.",
          });
      } catch (error: any) {
        toast({ 
          variant: "destructive", 
          title: "Project Creation Failed", 
          description: error.message || "Something went wrong." 
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground shadow-lg hover:shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-glow-primary">
            New Project
          </DialogTitle>
          <DialogDescription>
            Launch your next big breakthrough.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Internship Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What is this project about?" 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Launching...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
