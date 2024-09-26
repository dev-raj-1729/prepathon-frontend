"use client";

import { signInWithTOTP } from "@/auth/init";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useRef, useState } from "react";

export default function TOTPVerification() {
  const [totp, setTOTP] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //   const handleChange = (index: number, value: string) => {
  //     if (value.length <= 1 && /^\d*$/.test(value)) {
  //       const newTOTP = [...totp];
  //       newTOTP[index] = value;
  //       setTOTP(newTOTP);

  //       // Move focus to the next input if a digit was entered
  //       if (value && index < 5 && inputRefs.current[index + 1]) {
  //         inputRefs.current[index + 1]?.focus();
  //       }
  //     }
  //   };

  //   const handleKeyDown = (
  //     index: number,
  //     e: React.KeyboardEvent<HTMLInputElement>
  //   ) => {
  //     if (e.key === "Backspace" && !totp[index] && index > 0) {
  //       // Move focus to the previous input on backspace if current input is empty
  //       inputRefs.current[index - 1]?.focus();
  //     }
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (totp.length !== 6) {
      setError("Please enter all 6 digits.");
      setIsSubmitting(false);
      return;
    }

    try {
      await signInWithTOTP(totp);
      setSuccess(true);
    } catch (err) {
      setError("Invalid code. Please try again.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Verification Successful</CardTitle>
            <CardDescription>
              You have successfully verified your identity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              {/* <IconComponent name="check-circle" className="h-4 w-4" /> */}
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your two-factor authentication code has been verified.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => console.log("Proceed to dashboard")}
            >
              Continue to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-6">
              <InputOTP maxLength={6} value={totp} onChange={setTOTP}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && (
              <Alert variant="destructive" className="mb-4">
                {/* <IconComponent name="alert-triangle" className="h-4 w-4" /> */}
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  {/* <IconComponent
                    name="spinner"
                    className="mr-2 h-4 w-4 animate-spin"
                  /> */}
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => console.log("Resend code")}
            >
              Resend
            </Button>
          </p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
