/*const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    progress: 75,
    members: 5,
    dueDate: "2024-02-15",
    status: "In Progress",
    color: "bg-blue_munsell-500",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android app development for customer portal",
    progress: 45,
    members: 8,
    dueDate: "2024-03-20",
    status: "In Progress",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q1 marketing campaign planning and execution",
    progress: 90,
    members: 3,
    dueDate: "2024-01-30",
    status: "Review",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Database Migration",
    description: "Migrate legacy database to new cloud infrastructure",
    progress: 30,
    members: 4,
    dueDate: "2024-04-10",
    status: "Planning",
    color: "bg-orange-500",
  },
  {
    id: "5",
    name: "Security Audit",
    description: "Comprehensive security audit and vulnerability assessment",
    progress: 60,
    members: 2,
    dueDate: "2024-02-28",
    status: "In Progress",
    color: "bg-red-500",
  },
  {
    id: "6",
    name: "API Documentation",
    description: "Create comprehensive API documentation for developers",
    progress: 85,
    members: 3,
    dueDate: "2024-02-05",
    status: "Review",
    color: "bg-indigo-500",
  },
]
*/

"use client";

import { Calendar, Users, MoreHorizontal, FolderOpen } from "lucide-react";
import { ProjectCard } from "./project-card";
import { CreateProjectModal } from "@/components/modals/create-project-modal";
import { UpdateProjectModal } from "@/components/modals/update-project-modal";
import { DeleteProjectModal } from "@/components/modals/delete-project-modal";
import { useProjects } from "@/hooks/use-projects";
import { Project } from "@/types";

export function ProjectGrid() {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading projects...
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center w-full py-20 lg:py-32">
        <div className="relative mb-2">
          <div className="absolute inset-0 bg-primary/5 blur-3xl" />
            <FolderOpen className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground/60" />
        </div>
        
        <div className="text-center px-6 max-w-sm">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            No projects found
          </h3>
          <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
            Get started by creating your first project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UpdateProjectModal />
      <DeleteProjectModal />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={{
              id: project.id,
              projectName: project.projectName,
              description: project.description ?? null,
              dueDate: project.dueDate ? new Date(project.dueDate) : null,
              status: project.status,
              progress: Number(project.progress) || 0,
              memberCount: Number(project.memberCount) || 0,
            }}
          />
        ))}
      </div>
    </>
  )
}
