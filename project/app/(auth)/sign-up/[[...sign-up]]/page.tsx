import { SignUp } from "@clerk/nextjs";

// TODO: Task 2.3 - Create sign-up page
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-platinum-900 dark:bg-outer_space-600 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-outer_space-500 dark:text-platinum-500 mb-2">
            Create Account
          </h1>
          <p className="text-payne's_gray-500 dark:text-french_gray-400">
            Join our project management platform
          </p>
        </div>

        {/* TODO: Task 2.3 - Replace with actual Clerk SignUp component */}
        <div className="flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-white dark:bg-outer_space-500 border border-french_gray-300 dark:border-payne's_gray-400 shadow-xl rounded-lg",
                headerTitle: "text-outer_space-500 dark:text-platinum-500",
                headerSubtitle: "text-payne's_gray-500 dark:text-french_gray-400",
                formButtonPrimary: 
                  "bg-outer_space-500 dark:bg-platinum-500 hover:bg-outer_space-600 dark:hover:bg-platinum-400 text-white dark:text-outer_space-900 text-sm normal-case",
                socialButtonsBlockButton: 
                  "bg-transparent border-french_gray-300 dark:border-payne's_gray-400 text-outer_space-500 dark:text-platinum-500 hover:bg-platinum-800 dark:hover:bg-outer_space-400",
                footerActionLink: "text-outer_space-500 dark:text-platinum-400 hover:text-outer_space-600",
                formFieldLabel: "text-payne's_gray-500 dark:text-french_gray-400",
                formFieldInput: "bg-white dark:bg-outer_space-600 border-french_gray-300 dark:border-payne's_gray-400 text-outer_space-500 dark:text-platinum-500",
                dividerLine: "bg-french_gray-300 dark:bg-payne's_gray-400",
                dividerText: "text-payne's_gray-500 dark:text-french_gray-400"
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

/*
TODO: Task 2.3 Implementation Notes:
- Import SignUp from @clerk/nextjs
- Configure sign-up redirects
- Style to match design system
- Add proper error handling
- Set up webhook for user data sync (Task 2.5)
*/