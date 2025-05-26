"use client"
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Tiptap from "@/components/Tiptap";
import { useParams } from "next/navigation";

import React from 'react'

const Page = () => {
    const params = useParams()
    const noteid = params.noteid as string;
    console.log(noteid);
    const { data: note } = api.note.getNoteById.useQuery({
        id: noteid
    })
    if (!note) return null;
  return (
    <div className="flex flex-col gap-4 h-screen px-4 md:px-8 lg:px-12 xl:px-16 mt-24">
      <Input value={note.title} />
      <Tiptap defaultValue={note.content} />
    </div>
  )
}

export default Page
