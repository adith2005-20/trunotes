import Landing from "./_components/Landing";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  await api.note.retrieveAll.prefetch({
    limit: 10,
    cursor: null,
  });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <Landing />
      </main>
    </HydrateClient>
  );
}
