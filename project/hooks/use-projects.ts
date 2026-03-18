// TODO: Task 4.1 - Implement project CRUD operations
// TODO: Task 4.2 - Create project listing and dashboard interface

/*
TODO: Implementation Notes for Interns:

Custom hook for project data management:
- Fetch projects list
- Create new project
- Update project
- Delete project
- Search/filter projects
- Pagination

Features:
- React Query/SWR for caching
- Optimistic updates
- Error handling
- Loading states
- Infinite scrolling (optional)

Example structure:
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useProjects() {
  const queryClient = useQueryClient()
  
  const {
    data: projects,
    isLoading,
    error
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => queries.projects.getAll()
  })
  
  const createProject = useMutation({
    mutationFn: queries.projects.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
  
  return {
    projects,
    isLoading,
    error,
    createProject: createProject.mutate,
    isCreating: createProject.isPending
  }
}

Dependencies to install:
- @tanstack/react-query (recommended)
- OR swr (alternative)
*/

// Placeholder to prevent import errors
/*export function useProjects() {
  console.log("TODO: Implement useProjects hook")
  return {
    projects: [],
    isLoading: false,
    error: null,
    createProject: (data: any) => console.log("TODO: Create project", data),
    updateProject: (id: string, data: any) => console.log(`TODO: Update project ${id}`, data),
    deleteProject: (id: string) => console.log(`TODO: Delete project ${id}`),
  }
}*/

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import { useUIStore } from "@/stores/ui-store";
import { toast } from "@/hooks/use-toast";

export function useProjects() {
  const queryClient = useQueryClient();
  const { closeCreateProjectModal } = useUIStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching Projects
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  // Mutation for Creating
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      closeCreateProjectModal();
      toast({
        title: "Success",
        description: "Project created successfully.",
      });
    },

    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Could not create project.",
      });
    },
  });

  // Mutation for Updating
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProject(id, data),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Updated",
        description: "Project changes saved.",
      });
    },

    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Update failed.",
      });
    }
  })

  // Mutation for Deleting
  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previousProjects = queryClient.getQueryData(["projects"]);
      queryClient.setQueryData(["projects"], (old: any) =>
        old.filter((p: any) => p.id !== projectId)
      );
      return { previousProjects };
    },

    onError: (err, projectId, context) => {
      queryClient.setQueryData(["projects"], context?.previousProjects);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Deletion failed.",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Deleted",
        description: "Project deleted successfully.",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return {
    projects: filteredProjects,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    createProject: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateProject: (id: string, data: any) => updateMutation.mutate({ id, data }),
    isUpdating: updateMutation.isPending,
    deleteProject: (id: string ) => deleteMutation.mutate(id),
    isDeleting: deleteMutation.isPending,
  };
}