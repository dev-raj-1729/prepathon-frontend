"use client";

import { publicRoutes } from "@/config/route";
import { auth } from "@/firebase/init";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "../layout/loading";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const setDummy = useState<boolean>(false)[1];
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    auth.authStateReady().then(() => {
      setLoading(false);
    });
    auth.onAuthStateChanged(() => {
      setDummy((prev) => !prev);
    });
  }, [setDummy]);
  if (!loading) {
    CheckRoutes(router, pathname);
  }
  return <>{loading ? <LoadingScreen /> : children}</>;
}

export function CheckRoutes(router: AppRouterInstance, pathname: string) {
  if (!auth.currentUser && !publicRoutes.includes(pathname)) {
    router.push("/login");
  }
}
