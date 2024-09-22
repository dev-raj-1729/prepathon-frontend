"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/init";
import { signOut } from "firebase/auth";

function handleLogout() {
  signOut(auth)
    .then((value) => console.log(`Signed Out ${value}`))
    .catch((error) => {
      console.log(error);
    });
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button onClick={handleLogout}>Logout</Button>
      </main>
    </div>
  );
}
