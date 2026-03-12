import { ArrowLeft, Settings, Users, Calendar, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;

  return (
      <div className="space-y-6">
        {/* Project Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/projects"
              className="p-2 hover:bg-muted rounded-[var(--radius)] transition-colors border border-transparent hover:border-border"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground text-glow-primary">Project #{id}</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Kanban board view for project management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground">
              <Users size={20} />
            </button>
            <button className="p-2 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground">
              <Calendar size={20} />
            </button>
            <button className="p-2 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground">
              <Settings size={20} />
            </button>
            <button className="p-2 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Implementation Tasks Banner */}
        <div className="bg-accent/50 border border-border rounded-[var(--radius)] p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            🎯 Kanban Board Implementation Tasks
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <li>• Task 5.1: Design responsive Kanban board layout</li>
            <li>• Task 5.2: Implement drag-and-drop functionality with dnd-kit</li>
            <li>• Task 5.4: Implement optimistic UI updates for smooth interactions</li>
            <li>• Task 5.6: Create task detail modals and editing interfaces</li>
          </ul>
        </div>

        {/* Kanban Board Placeholder */}
        <div className="rounded-[var(--radius)]">
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-thin">
            {["To Do", "In Progress", "Review", "Done"].map((columnTitle) => (
              <div key={columnTitle} className="flex-shrink-0 w-80">
                <div className="bg-muted/30 rounded-[var(--radius)] border border-border flex flex-col h-full min-h-[500px]">
                  <div className="p-4 border-b border-border bg-card/50 rounded-t-[var(--radius)]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {columnTitle}
                        <span className="px-2 py-0.5 text-[10px] bg-secondary text-secondary-foreground rounded-full">
                          {Math.floor(Math.random() * 5) + 1}
                        </span>
                      </h3>
                      <button className="p-1 hover:bg-background rounded text-muted-foreground transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 space-y-3">
                    {[1, 2, 3].map((taskIndex) => (
                      <div
                        key={taskIndex}
                        className="p-4 bg-card text-card-foreground rounded-[var(--radius)] border border-border shadow-xs hover:shadow-md hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing"
                      >
                        <h4 className="font-medium text-sm mb-1 line-clamp-1">
                          Sample Task {taskIndex}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                          This is a placeholder task description
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-accent text-accent-foreground border border-border">
                            Medium
                          </span>
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                            {id.slice(0, 1).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    ))}

                    <button className="w-full p-3 border-2 border-dashed border-border rounded-[var(--radius)] text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all text-xs font-medium">
                      + Add task
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Implementation Guide */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            🛠️ Components & Features to Implement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong className="block mb-2">Core Components:</strong>
              <ul className="space-y-1 list-disc list-inside">
                <li>components/kanban-board.tsx</li>
                <li>components/task-card.tsx</li>
                <li>components/modals/create-task-modal.tsx</li>
                <li>stores/board-store.ts (Zustand)</li>
              </ul>
            </div>
            <div>
              <strong className="block mb-2">Advanced Features:</strong>
              <ul className="space-y-1 list-disc list-inside">
                <li>Drag & drop with @dnd-kit/core</li>
                <li>Real-time updates</li>
                <li>Task assignments & due dates</li>
                <li>Comments & activity history</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}
