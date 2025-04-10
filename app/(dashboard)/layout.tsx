  "use client"
  import type React from "react"
  import { DashboardNav } from "@/components/dashboard/dashboard-nav"
  import { UserAccountNav } from "@/components/dashboard/user-account-nav"
  import { MainNav } from "@/components/dashboard/main-nav"
  import { useState } from "react"
  import { DevDashboardNav } from "@/components/dashboard/dev-dashboard-nav"
  import { useAuth } from "@/context/auth-context"
  import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
    }) {
      const router = useRouter();
     const { user, isAuthenticated, loading } = useAuth();
    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="container py-6 space-y-6">
        <Skeleton className="h-10 w-[250px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>;
  }

  if (!isAuthenticated) {
    return null; // Ne rien afficher pendant la redirection
  }


    const [role, setRole] = useState("developer");

    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <UserAccountNav />
          </div>
        </header>
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            {role === "developer" && <DevDashboardNav />}
            {role === "admin" && <DashboardNav />}
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    );
  }

