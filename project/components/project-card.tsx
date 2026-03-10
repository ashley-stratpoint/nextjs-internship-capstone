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

import { 
  MoreVertical, 
  Calendar, 
  Users, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    progress: number;
    memberCount: number;
    dueDate?: Date;
    status: 'active' | 'completed' | 'on-hold';
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const statusStyles = {
    active: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-accent/50 text-accent-foreground border-accent/20",
    "on-hold": "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="group relative bg-card text-card-foreground p-6 rounded-[var(--radius)] border border-border shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Title & Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors">
            <h3 className="text-lg font-bold tracking-tight">
              {project.name}
            </h3>
          </Link>
          <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusStyles[project.status]}`}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
        
        <button className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[40px]">
        {project.description || "No description provided for this project."}
      </p>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2 font-medium">
          <span className="text-muted-foreground">Completion</span>
          <span className="text-primary font-bold">{project.progress}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out shadow-[0_0_10px_hsl(var(--primary)/0.3)]"
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
          {project.dueDate && (
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary/70" />
              <span className="font-medium">
                {project.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          )}
        </div>
        
        <Link 
          href={`/projects/${project.id}`}
          className="text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
}
