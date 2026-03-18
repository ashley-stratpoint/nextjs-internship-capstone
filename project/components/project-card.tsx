// TODO: Task 4.5 - Design and implement project cards and layouts

/*
TODO: Implementation Notes for Interns:

This component should display:
- Project name and description
- Progress indicator
- Team member count
- Due date
- Status badge
- Actions menu (edit, delete, etc.)

Props interface:
interface ProjectCardProps {
  project: {
    id: string
    name: string
    description?: string
    progress: number
    memberCount: number
    dueDate?: Date
    status: 'active' | 'completed' | 'on-hold'
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

Features to implement:
- Hover effects
- Click to navigate to project board
- Responsive design
- Loading states
- Error states
*/

"use client";

import { MoreVertical, Calendar, Users, ExternalLink, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types";
import { useUIStore } from "@/stores/ui-store";


type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { openUpdateProjectModal, openDeleteProjectModal } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);

  const statusStyles = {
    active: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-accent/50 text-accent-foreground border-accent/20",
    "on-hold": "bg-muted text-muted-foreground border-border",
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement

    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[role='menuitem']")
    ) {
      return
    }

    router.push(`/projects/${project.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link
            href={`/projects/${project.id}`}
            className="hover:text-primary transition-colors"
          >
            <h3 className="text-lg font-bold tracking-tight">
              {project.projectName}
            </h3>
          </Link>

          <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusStyles[project.status]}`}>
            {project.status.replace("-", " ")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MoreVertical size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    openUpdateProjectModal(project);
                  }}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteProjectModal(project);
                  }}
                  className="text-destructive cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="h-8 w-8 rounded-md bg-muted/20 animate-pulse" />
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[40px]">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2 font-medium">
          <span className="text-muted-foreground">Completion</span>
          <span className="text-primary font-bold">{project.progress}%</span>
        </div>

        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-primary/70" />
            <span className="font-medium">{project.memberCount}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary/70" />
            <span className="font-medium">
                {project.dueDate ? (
                  new Date (project.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                ) : (
                  <span className="italic text-muted-foreground/70">No due date</span>
                )}
            </span>
          </div>
        </div>

        <Link
          href={`/projects/${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
}