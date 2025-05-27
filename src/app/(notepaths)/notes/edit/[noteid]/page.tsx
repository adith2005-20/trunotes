"use client"
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Tiptap from "@/components/Tiptap";
import { useParams } from "next/navigation";
import React from 'react'
import { SaveIcon } from "lucide-react";


const Page = () => {
  const utils = api.useUtils();
  const params = useParams()
  const noteid = params.noteid as string;

  const { data: note } = api.note.getNoteById.useQuery({ id: noteid });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const { mutateAsync: updateNote } = api.note.modify.useMutation({
    onSuccess: () => toast("Note updated successfully"),
    onError: (error) => toast(error.message),
  });

  const handleSave = async () => {
    await updateNote({ id: noteid, title, content });
    await utils.note.getNoteById.invalidate({ id: noteid });
  };

  if (!note) return null;

  return (
    <div className="flex flex-col gap-4 h-screen px-4 md:px-8 lg:px-12 xl:px-16 mt-24">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} /><Button className="rounded-2xl" onClick={handleSave}>
        <SaveIcon />
      </Button>
      {note && (
      <Tiptap 
        defaultValue={note.content} 
        onChange={(value) => setContent(value)} 
      />
    )}
      
    </div>
  );
};

export default Page;
