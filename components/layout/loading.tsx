import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-lg font-semibold text-foreground">
            Loading...
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Please wait while we fetch your data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
