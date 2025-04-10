/** @format */
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { SessionStatusTypes } from "@/types/sessionStatusTypes";
import { GUEST, REGISTERED } from "@/lib/session-status";
import { Skeleton } from "@/components/ui/skeleton";

import React from "react";
interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusTypes;
}

export default function Session({ children, sessionStatus }: Props) {
  const route = useRouter();
  const { loading, user } = useAuth();

  if( sessionStatus === GUEST && !loading ) {
    if (!user) {
      return <>{children}</>;
    }else {
      route.push("/profil");
    }
  }
  if( sessionStatus === REGISTERED && !loading ) {
    if (user) {
      return <>{children}</>;
    }else {
      route.push("/connexion");
    }
  }
  if (!sessionStatus && !loading) {
    return <>{children}</>;
  }
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
