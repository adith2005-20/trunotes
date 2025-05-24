import Link from "next/link";
import Header from "./_components/Header";
import Landing from "./_components/Landing";

import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {


  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <Landing />
      </main>
    </HydrateClient>
  );
}
