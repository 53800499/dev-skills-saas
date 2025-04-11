"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  const { user, loading } = useAuth();
  //const router = useRouter()
  useEffect(() => {
    if (user) {
    redirect("/dashboard");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Skeleton className="h-10 w-[250px]" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">{children}</main>
    </div>
  )
}

