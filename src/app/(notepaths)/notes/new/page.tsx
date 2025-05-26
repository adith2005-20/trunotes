"use client";
import Tiptap from "@/components/Tiptap";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function NewNote() {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState(""); // <-- track editor content

  const { mutateAsync: createNote } = api.note.create.useMutation({
    onSuccess: () => {
      toast("Note created successfully");
      setTitle("Untitled");
      setContent(""); // reset
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-4 h-screen px-4 md:px-8 lg:px-12 xl:px-16">
      <Input
        className="border-none bg-card text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none mt-24 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 p-2 sm:p-3 md:p-4 h-auto min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[4.5rem] px-2 sm:px-3 md:px-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled"
      />
      <Button
        onClick={async () => {
          await createNote({
            title,
            content,
          });
        }}
      >
        Create note
      </Button>
      <div className="flex-1">
        <Tiptap onChange={setContent} />
      </div>
    </div>
  );
}
