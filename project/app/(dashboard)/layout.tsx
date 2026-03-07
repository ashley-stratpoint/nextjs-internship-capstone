import { OrganizationList, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { orgId } = await auth();

  // If the user is logged in but hasn't selected an Org, show the selection screen
  if (!orgId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-platinum-900 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2 text-outer_space-500">Welcome to Balangkas</h2>
        <p className="text-payne's_gray-500 mb-8 max-w-sm">
          To get started, please create a new organization or select an existing one.
        </p>
        
        {/* Correct Component for App Router */}
        <OrganizationList 
          hidePersonal={true} 
          afterCreateOrganizationUrl="/dashboard"
          afterSelectOrganizationUrl="/dashboard"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Your Sidebar and Header components will go here */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}