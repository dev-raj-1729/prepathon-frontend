"use client";

import { auth } from "@/firebase/init";

export function ClientRootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  console.log("current user");
  console.log(auth.currentUser);
  auth.onAuthStateChanged(() => {
    console.log("current user observer");
    console.log(auth.currentUser);
  });
  return <>{children}</>;
}
