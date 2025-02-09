"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, WifiOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ErrorPage({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  const handleResetError = () => {
    resetError();
  };
  const [isOnline, setIsOnline] = useState<boolean>(!!navigator.onLine);

  useEffect(() => {
    // Function to update connection status
    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    };

    // Event listeners for online and offline
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Initial check for online status
    updateOnlineStatus();

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        {!isOnline ? (
          <div className="bg-primary rounded-full p-4 inline-flex items-center justify-center">
            <WifiOff className="h-8 w-8 text-primary-foreground" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-4 inline-flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-primary-foreground" />
          </div>
        )}

        {!isOnline ? (
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Oops, network problem
          </h1>
        ) : (
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Oops, something went wrong!
          </h1>
        )}

        {!isOnline ? (
          <p className="mt-4 text-lg text-muted-foreground">
            It seems like your network problem please make sure you are connect
            to your Wifi or mobile data
          </p>
        ) : (
          <p className="mt-4 text-lg text-muted-foreground">
            We are sorry, but an unexpected error has occurred. Please try again
            later or contact support if the issue persists.
          </p>
        )}

        <div className="mt-8 flex flex-col space-y-4">
          <Button onClick={handleResetError} variant={"ghost"}>
            Try again
          </Button>
          <Button>
            <Link href="/" className="size-full" prefetch={false}>
              Go to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
