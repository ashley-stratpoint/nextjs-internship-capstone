// TODO: Task 5.3 - Set up client-side state management with Zustand

/*
TODO: Implementation Notes for Interns:

UI state management store for:
- Modal states (create project, create task, etc.)
- Sidebar state
- Theme preferences
- Loading states
- Error states
- Notifications/toasts

Install: pnpm add zustand

Example structure:
import { create } from 'zustand'

interface UIState {
  // Modal states
  isCreateProjectModalOpen: boolean
  isCreateTaskModalOpen: boolean
  isTaskDetailModalOpen: boolean
  selectedTaskId: string | null

  // UI states
  sidebarOpen: boolean
  theme: 'light' | 'dark'

  // Loading states
  isLoading: boolean
  loadingMessage: string

  // Actions
  openCreateProjectModal: () => void
  closeCreateProjectModal: () => void
  openCreateTaskModal: () => void
  closeCreateTaskModal: () => void
  openTaskDetailModal: (taskId: string) => void
  closeTaskDetailModal: () => void
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setLoading: (loading: boolean, message?: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  // ... implementation
}))
*/

// Placeholder to prevent import errors
/*
export const useUIStore = () => {
  console.log("TODO: Implement UI store with Zustand")
  return {
    isCreateProjectModalOpen: false,
    isCreateTaskModalOpen: false,
    openCreateProjectModal: () => console.log("TODO: Open create project modal"),
    closeCreateProjectModal: () => console.log("TODO: Close create project modal"),
  }
}
*/

import { create } from "zustand";
import { Project } from "@/types";

interface UIState {
  /* Project modal states */
  // Create
  isCreateProjectModalOpen: boolean;
  openCreateProjectModal: () => void;
  closeCreateProjectModal: () => void;
  
  // Update
  isUpdateProjectModalOpen: boolean;
  openUpdateProjectModal: (project: Project) => void;
  closeUpdateProjectModal: () => void;

  // Delete
  isDeleteProjectModalOpen: boolean;
  openDeleteProjectModal: (project: Project) => void;
  closeDeleteProjectModal: () => void;

  selectedProject: Project | null;

  // Task modal states
  isCreateTaskModalOpen: boolean;
  openCreateTaskModal: () => void;
  closeCreateTaskModal: () => void;

  /* Toast States */
  notification: {
    message: string;
    type: "success" | "error" | "info"| null;
    isVisible: boolean;
  };

  showNotification: (message: string, type: "success" | "error" | "info") => void;
  hideNotification: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  /* Project modal states */

  // Create
  isCreateProjectModalOpen: false,
  openCreateProjectModal: () => set({ isCreateProjectModalOpen: true }),
  closeCreateProjectModal: () => set({ isCreateProjectModalOpen: false }),

  // Update
  isUpdateProjectModalOpen: false,
  openUpdateProjectModal: (project) =>
    set({
      isUpdateProjectModalOpen: true,
      selectedProject: project,
    }),

  closeUpdateProjectModal: () =>
    set({
      isUpdateProjectModalOpen: false,
      selectedProject: null,
    }),

  // Delete
  isDeleteProjectModalOpen: false,
  selectedProject: null,
  
  openDeleteProjectModal: (project) => set({
    isDeleteProjectModalOpen: true,
    selectedProject: project,
  }),

  closeDeleteProjectModal: () => set({
    isDeleteProjectModalOpen: false,
    selectedProject: null,
  }),
  
  /* Task modal states */
  isCreateTaskModalOpen: false,
  openCreateTaskModal: () => set({ isCreateTaskModalOpen: true }),
  closeCreateTaskModal: () => set({ isCreateTaskModalOpen: false }),

  /* Toast States */
  notification: {
    message: "",
    type: null,
    isVisible: false
  },

  showNotification: (message: string, type: "success" | "error" | "info") => set({ 
    notification: { 
      message, 
      type, 
      isVisible: true 
    }
  }),

  hideNotification: () => set({ 
    notification: { 
      message: "", 
      type: null, 
      isVisible: false 
    } 
  })
}))