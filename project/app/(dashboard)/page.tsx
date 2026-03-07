import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Kanban } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted dark:from-background dark:to-card">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-primary text-glow-primary font-sans">Balangkas</div>
            <div className="flex items-center space-x-8">
              <ThemeToggle />
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-2xl hover:opacity-80 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Manage Projects with
            <span className="text-primary text-glow-primary inline-block px-4"> Cork Boards</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Organize tasks, collaborate with teams, and track progress with our intuitive drag-and-drop project
            management platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/dashboard"
              className="text-sm inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-80 font-semibold shadow-lg shadow-primary/20"
            >
              Start Managing Projects
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/projects"
              className="text-sm inline-flex items-center px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/20 text-lg font-semibold"
            >
              View Projects
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-base text-foreground">
              <Kanban className="text-foreground" size={20} />
              <span>Drag & Drop Boards</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-base text-foreground">
              <Users className="text-foreground" size={20} />
              <span>Team Collaboration</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-base text-foreground">
              <CheckCircle className="text-foreground" size={20} />
              <span>Task Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Demo Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/10 dark:bg-muted/70">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            🚀 Navigate the Mock Site
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            All pages are accessible without authentication for development purposes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Dashboard", desc: "Main dashboard view", href: "/dashboard" },
              { title: "Projects", desc: "Projects listing page", href: "/projects" },
              { title: "Kanban Board", desc: "Project board view", href: "/projects/1" },
              { title: "Auth Pages", desc: "Sign in/up placeholders", href: "/sign-in" },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="p-4 bg-card text-card-foreground rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all text-left"
              >
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Task Implementation Status */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Implementation Roadmap
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "1.0", title: "Project Setup", status: "pending", tasks: 6 },
              { phase: "2.0", title: "Authentication", status: "pending", tasks: 6 },
              { phase: "3.0", title: "Database Setup", status: "pending", tasks: 6 },
              { phase: "4.0", title: "Core Features", status: "pending", tasks: 6 },
              { phase: "5.0", title: "Kanban Board", status: "pending", tasks: 6 },
              { phase: "6.0", title: "Advanced Features", status: "pending", tasks: 6 },
              { phase: "7.0", title: "Testing", status: "pending", tasks: 6 },
              { phase: "8.0", title: "Deployment", status: "pending", tasks: 6 },
            ].map((item) => (
              <div
                key={item.phase}
                className="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm hover:bg-primary/20 transition-shadow"
              >
                <div className="text-sm text-primary font-bold mb-2">Phase {item.phase}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <div className="text-sm text-muted-foreground mb-3">{item.tasks} tasks</div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
