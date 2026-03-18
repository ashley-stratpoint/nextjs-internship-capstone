{/*

import { Plus, Search, Filter } from "lucide-react"

export default function ProjectsPage() {
  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-outer_space-500 dark:text-platinum-500">Projects</h1>
            <p className="text-payne's_gray-500 dark:text-french_gray-500 mt-2">Manage and organize your team projects</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue_munsell-500 text-white rounded-lg hover:bg-blue_munsell-600 transition-colors">
            <Plus size={20} className="mr-2" />
            New Project
          </button>
        </div> */}

        {/* Implementation Tasks Banner */}
        {/*<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            📋 Projects Page Implementation Tasks
          </h3>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Task 4.1: Implement project CRUD operations</li>
            <li>• Task 4.2: Create project listing and dashboard interface</li>
            <li>• Task 4.5: Design and implement project cards and layouts</li>
            <li>• Task 4.6: Add project and task search/filtering capabilities</li>
          </ul>
        </div>*/}

        {/* Search and Filter Bar */}
        {/*<div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-payne's_gray-500 dark:text-french_gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-outer_space-500 border border-french_gray-300 dark:border-payne's_gray-400 rounded-lg text-outer_space-500 dark:text-platinum-500 placeholder-payne's_gray-500 dark:placeholder-french_gray-400 focus:outline-none focus:ring-2 focus:ring-blue_munsell-500"
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-french_gray-300 dark:border-payne's_gray-400 text-outer_space-500 dark:text-platinum-500 rounded-lg hover:bg-platinum-500 dark:hover:bg-payne's_gray-400 transition-colors">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>*/}

        {/* Projects Grid Placeholder */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-outer_space-500 rounded-lg border border-french_gray-300 dark:border-payne's_gray-400 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-3 h-3 bg-blue_munsell-500 rounded-full"></div>
                <div className="text-sm text-payne's_gray-500 dark:text-french_gray-400">
                  {Math.floor(Math.random() * 30) + 1} days left
                </div>
              </div>

              <h3 className="text-lg font-semibold text-outer_space-500 dark:text-platinum-500 mb-2">
                Sample Project {i}
              </h3>

              <p className="text-sm text-payne's_gray-500 dark:text-french_gray-400 mb-4">
                This is a placeholder project description that will be replaced with actual project data.
              </p>

              <div className="flex items-center justify-between text-sm text-payne's_gray-500 dark:text-french_gray-400 mb-4">
                <span>{Math.floor(Math.random() * 8) + 2} members</span>
                <span>{Math.floor(Math.random() * 20) + 5} tasks</span>
              </div>

              <div className="w-full bg-french_gray-300 dark:bg-payne's_gray-400 rounded-full h-2">
                <div
                  className="bg-blue_munsell-500 h-2 rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>*/}

        {/* Component Placeholders */}
        {/*<div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">📁 Components to Implement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong>components/project-card.tsx</strong>
              <p>Project display component with progress, members, and actions</p>
            </div>
            <div>
              <strong>components/modals/create-project-modal.tsx</strong>
              <p>Modal for creating new projects with form validation</p>
            </div>
            <div>
              <strong>hooks/use-projects.ts</strong>
              <p>Custom hook for project data fetching and mutations</p>
            </div>
            <div>
              <strong>lib/db/schema.ts</strong>
              <p>Database schema for projects, lists, and tasks</p>
            </div>
          </div>
        </div>
      </div>
  )
} 

*/}


import { Plus, Search, Filter } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectGrid } from "@/components/project-grid";
import { auth } from "@clerk/nextjs/server";
import { CreateProjectModal} from "@/components/modals/create-project-modal"


/*const MOCK_PROJECTS = [
  {
    id: "1",
    name: "Project 1",
    description: "Description 1.",
    progress: 75,
    memberCount: 3,
    dueDate: new Date("2026-03-25"),
    status: "active" as const,
  },
  {
    id: "2",
    name: "Project 2",
    description: "Description 2.",
    progress: 45,
    memberCount: 2,
    dueDate: new Date("2026-04-10"),
    status: "active" as const,
  },
  {
    id: "3",
    name: "Project 3",
    description: "Description 3.",
    progress: 100,
    memberCount: 1,
    dueDate: new Date("2026-03-01"),
    status: "completed" as const,
  },
  {
    id: "4",
    name: "Project 4",
    description: "Description 4.",
    progress: 10,
    memberCount: 4,
    dueDate: new Date("2026-05-15"),
    status: "on-hold" as const,
  },
]; */

export default async function ProjectsPage() {
  const { orgId } = await auth();

  if (!orgId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        Please select an organization to view projects.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[80vh] space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and organize your team's architecture and task flows.
          </p>
        </div>

        <CreateProjectModal />
      </div>

      {/* Implementation Status Banner */}
      <div className="bg-muted/50 border border-border rounded-[var(--radius)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Phase 4.0</span>
          <h3 className="text-sm font-semibold">Active Tasks</h3>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <li>• Task 4.1: Implement project CRUD operations</li>
          <li>• Task 4.5: Design and implement project cards</li>
          <li className="text-primary font-medium">• Task 4.6: Add project search/filtering (In Progress)</li>
        </ul>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-input bg-background text-foreground rounded-[var(--radius)] hover:bg-accent transition-colors text-sm font-medium">
          <Filter size={16} className="mr-2" />
          Filter
        </button>
      </div>

      {/* Projects Grid */}
      <ProjectGrid />
    </div>
  );
}

