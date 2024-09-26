"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/firebase/init";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a verification link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            {/* <IconComponent name="mail" className="h-4 w-4" /> */}
            <AlertTitle>Verification email sent</AlertTitle>
            <AlertDescription>
              We&apos;ve sent a verification link to{" "}
              {auth.currentUser?.email ?? ""}. Please check your inbox and click
              the link to verify your account. {"Click 'Done' afterwards"}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              auth.currentUser?.reload().then(() => {
                console.log("Done Clicked");
                if (auth.currentUser?.emailVerified) {
                  router.push("/");
                }
              });
            }}
          >
            Done
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
