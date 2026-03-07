import { OrganizationList } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "@/components/sidebar";
import { Suspense } from "react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { orgId } = await auth();

  if (!orgId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-platinum-900 px-4">
        <h2 className="text-2xl font-bold mb-2 text-outer_space-500">Select an Organization</h2>
        <OrganizationList hidePersonal={true} afterCreateOrganizationUrl="/dashboard" afterSelectOrganizationUrl="/dashboard" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-platinum-900 dark:bg-outer_space-600">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}