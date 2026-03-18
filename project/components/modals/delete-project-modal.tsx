"use client";

import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { AlertDialog,AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useProjects } from "@/hooks/use-projects";
import { useUIStore } from "@/stores/ui-store";

export function DeleteProjectModal() {
  const { isDeleteProjectModalOpen, closeDeleteProjectModal, selectedProject } = useUIStore();
  const { deleteProject, isDeleting } = useProjects();

  async function handleDelete() {
    if (!selectedProject?.id) return;

    try {
      await deleteProject(selectedProject.id);
      closeDeleteProjectModal();
    } catch (error) {
      console.error("Deletion failed", error);
    }
  }

  return (
    <AlertDialog open={isDeleteProjectModalOpen} onOpenChange={(open) => !open && closeDeleteProjectModal()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
          </div>

          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>
                Are you sure you want to delete {" "}
                <span className="font-semibold text-foreground">
                  "{selectedProject?.projectName || "this project"}"
                </span>? 
                This action is permanent and cannot be reversed.
              </p>
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive">
                <strong>Warning:</strong> All associated lists, tasks, and comments will be permanently deleted.
              </div>
            </div>
          </AlertDialogDescription>

        </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={closeDeleteProjectModal} disabled={isDeleting}>
          Cancel
        </AlertDialogCancel>

        <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete Project"
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}