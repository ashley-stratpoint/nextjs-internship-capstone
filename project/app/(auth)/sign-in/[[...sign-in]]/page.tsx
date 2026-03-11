import { SignIn } from "@clerk/nextjs";

// TODO: Task 2.3 - Create sign-in and sign-up pages
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Balangkas account</p>
        </div>

        {/* TODO: Task 2.3 - Replace with actual Clerk SignIn component */}
        <div className="flex justify-center">
          <SignIn
            signUpFallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-primary hover:bg-primary/90 text-sm normal-case",
                card: "bg-card border border-border shadow-xl",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton: 
                  "bg-background border-border text-foreground hover:bg-muted",
                footerActionLink: "text-primary hover:text-primary/80",
                formFieldLabel: "text-foreground",
                formFieldInput: "bg-background border-border text-foreground"
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

/*
TODO: Task 2.3 Implementation Notes:
- Import SignIn from @clerk/nextjs
- Configure sign-in redirects
- Style to match design system
- Add proper error handling
*/
