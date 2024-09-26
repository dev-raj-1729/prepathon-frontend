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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signInWithFacebook, signInWithGoogle } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email/password login logic here
    console.log("Email login:", email, password);
    setIsSubmitting(true);
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
          .then(() => {
            // setIsSubmitted(true);
            router.push("/verify-email");
            console.log("Verification email sent");
          })
          .catch((error) => {
            console.log("Error sending email verification : ", error);
            setError("Verification Email could not be sent");
          });
      })
      .catch((error) => {
        console.log(error);
        setError("Sign in Failed");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // const handleLoginSwitch = () => {
  //   console.log("Sign up");
  //   router.push("/login");
  // };
  // if (isSubmitted) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <Card className="w-[350px]">
  //         <CardHeader>
  //           <CardTitle>Verify Your Email</CardTitle>
  //           <CardDescription>
  //             We&apos;ve sent you a verification link.
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <Alert>
  //             {/* <IconComponent name="mail" className="h-4 w-4" /> */}
  //             <AlertTitle>Verification email sent</AlertTitle>
  //             <AlertDescription>
  //               We&apos;ve sent a verification link to {email}. Please check
  //               your inbox and click the link to verify your account.
  //             </AlertDescription>
  //           </Alert>
  //         </CardContent>
  //         <CardFooter>
  //           <Button
  //             variant="link"
  //             className="w-full"
  //             onClick={handleLoginSwitch}
  //           >
  //             Return to Login
  //           </Button>
  //         </CardFooter>
  //       </Card>
  //     </div>
  //   );
  // }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignup}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                {/* <IconComponent name="alert-triangle" className="h-4 w-4" /> */}
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              className="w-full mt-6"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  {/* <IconComponent
                    name="spinner"
                    className="mr-2 h-4 w-4 animate-spin"
                  /> */}
                  Signing Up...
                </>
              ) : (
                "Sign Up with Email"
              )}
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" onClick={signInWithGoogle}>
              {/* <IconComponent name="google" className="mr-2 h-4 w-4" /> */}
              Google
            </Button>
            <Button variant="outline" onClick={signInWithFacebook}>
              {/* <IconComponent name="facebook" className="mr-2 h-4 w-4" /> */}
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
