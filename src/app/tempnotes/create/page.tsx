"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CircleCheck, CircleAlert, LoaderCircle } from "lucide-react";
import Header from "@/app/_components/Header";
import { api } from "@/trpc/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const Page = () => {
  const [accessCode, setAccessCode] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const submitNote = api.tempnote.create.useMutation({
    onSuccess: () => {
      toast("Note created successfully");
      setAccessCode("");
      setContent("");
      setError("");
    },
    onError: (error) => {
      setError(error.message);
      toast(error.message);
    },
  });

  return (
    <>
      <Header />
      <div className="mt-3/12 flex h-screen items-center justify-center">
        <Card className="w-full p-4 sm:m-4 lg:m-8">
          <CardHeader className="j25 text-4xl font-bold">
            Create TempNote
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <span className="text-destructive text-xs">{error}</span>
            <Textarea
              className="min-h-72"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="Type or paste your content here"
            />
            <div className="flex flex-row items-center gap-2">
              <label className="text-sm">Access code:</label>
              <InputOTP
                maxLength={6}
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e);
                  setError("");
                }}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <AccessCodeStatus accessCode={accessCode} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="self-start"
              onClick={() => {
                submitNote.mutate({ accessCode, content });
              }}
              disabled={
                accessCode.length === 0 ||
                content.length === 0 ||
                error.length > 0 ||
                submitNote.isPending
              }
            >
              Submit
            </Button>
            <span className="text-muted-foreground mt-2 self-start text-xs">
              Note: Tempnotes do not require a Trunotes account, and thereby are
              not linked to one.
            </span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

const AccessCodeStatus = ({ accessCode }: { accessCode: string }) => {
  const { data, isLoading, error } = api.tempnote.checkCode.useQuery(
    { accessCode },
    {
      enabled: accessCode.length === 6,
      retry: false, // ← don’t retry on error
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  if (accessCode.length !== 6) return null;

  let icon = null;
  let message = "";

  if (isLoading) {
    icon = <LoaderCircle className="h-6 w-6 animate-spin text-yellow-500" />;
    message = "Checking...";
  } else if (error) {
    icon = <CircleAlert className="h-6 w-6 text-red-500" />;
    message = error.message;
  } else {
    icon = <CircleCheck className="h-6 w-6 text-green-500" />;
    message = "This access code is available";
  }

  return (
    <HoverCard>
      <HoverCardTrigger>{icon}</HoverCardTrigger>
      <HoverCardContent className="text-xs">{message}</HoverCardContent>
    </HoverCard>
  );
};

export default Page;
