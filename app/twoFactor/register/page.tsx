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
import Image from "next/image";
import { useState } from "react";

// Simulated server-generated data
const simulatedOtpAuthUrl =
  "otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example";
const simulatedRecoveryKey = "ABCD-EFGH-IJKL-MNOP";

export default function TwoFactorAuthSetup() {
  const [stage, setStage] = useState(1);

  const handleNextStage = () => {
    setStage((prevStage) => prevStage + 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Two-Factor Authentication Setup</CardTitle>
          <CardDescription>
            Enhance the security of your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stage === 1 && (
            <div className="space-y-4">
              <Alert>
                {/* <IconComponent name="shield" className="h-4 w-4" /> */}
                <AlertTitle>Mandatory Security Measure</AlertTitle>
                <AlertDescription>
                  Two-factor authentication is required for all accounts to
                  ensure maximum security.
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground">
                {
                  "Click 'Next' to begin the setup process. You'll need a smartphone with an authenticator app installed."
                }
              </p>
            </div>
          )}
          {stage === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code with your authenticator app:
              </p>
              <div className="flex justify-center">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    simulatedOtpAuthUrl
                  )}`}
                  alt="2FA QR Code"
                  width={200}
                  height={200}
                />
              </div>
              <p className="text-sm text-center">
                Can&apos;t scan the QR code?{" "}
                <a
                  href={simulatedOtpAuthUrl}
                  className="text-primary hover:underline"
                >
                  Click here
                </a>{" "}
                or manually enter the following code.
              </p>

              <p className="text-center font-mono text-lg">
                {simulatedRecoveryKey}
              </p>
            </div>
          )}
          {stage === 3 && (
            <div className="space-y-4">
              <Alert
              //   variant="warning"
              >
                {/* <IconComponent name="key" className="h-4 w-4" /> */}
                <AlertTitle>Recovery Key</AlertTitle>
                <AlertDescription>
                  Store this recovery key in a safe place. You&apos;ll need it
                  if you lose access to your authenticator app.
                </AlertDescription>
              </Alert>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-center font-mono text-lg">
                  {simulatedRecoveryKey}
                </p>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Write this key down or save it securely. It will not be shown
                again.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {stage < 3 && (
            <Button onClick={handleNextStage} className="w-full">
              {stage === 1 ? "Begin Setup" : "Next"}
            </Button>
          )}
          {stage === 3 && (
            <Button
              onClick={() => console.log("2FA setup complete")}
              className="w-full"
            >
              Complete Setup
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
