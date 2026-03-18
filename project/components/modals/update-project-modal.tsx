"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { useUIStore } from "@/stores/ui-store";
import { projectSchema, ProjectFormInput } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "../ui/select";

export function UpdateProjectModal() {
  const { isUpdateProjectModalOpen, closeUpdateProjectModal, selectedProject } = useUIStore();
  const { updateProject, isUpdating } = useProjects();
  
  const form = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      status: "active",
      dueDate: null,
    },
  });

  // Form with initial data
  useEffect(() => {
    if (selectedProject) {
      form.reset({
        projectName: selectedProject.projectName,
        description: selectedProject.description || "",
        status: selectedProject.status,
        dueDate: selectedProject.dueDate
          ? new Date(selectedProject.dueDate)
          : null,
      });
    }
  }, [selectedProject, form]);

  async function onSubmit(data: ProjectFormInput) {
      if (!selectedProject?.id) {
        console.error("No project selected for update");
        return;
      }

      try {
        await updateProject(selectedProject.id, data);
        closeUpdateProjectModal();
        form.reset();
      } catch (error) {
        console.error("Update failed", error);
      }
  }

  return (
    <Dialog open={isUpdateProjectModalOpen} onOpenChange={(open) => !open && closeUpdateProjectModal()}>
      <DialogContent className="sm:max-w-[425px] border-border bg-card">
        <DialogTrigger className="sm:max-w-[425px] border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Edit Project
            </DialogTitle>
            <DialogDescription>
              Update your project details.
            </DialogDescription>
          </DialogHeader>
        </DialogTrigger>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input id="projectName" placeholder="Project Name" {...field} />
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
                    <Textarea className="resize-none" placeholder="Project Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select project status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border shadow-md">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      value={
                        field.value ? new Date(field.value).toISOString().split("T")[0] : ""
                      }
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type= "button" variant="ghost" onClick={closeUpdateProjectModal} disabled={isUpdating}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating} className="min-w-[120px]">
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                  </>
                ) : (
                    "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}