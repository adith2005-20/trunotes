"use client";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import UnderlineExtension from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { MenuBar } from "@/app/_components/EditorMenuBar";

export default function Tiptap({
  onChange, defaultValue
}: {
  onChange?: (html: string) => void;
  defaultValue?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        shouldAutoLink: (url: string) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);
            return !["phishing.com"].includes(parsedUrl.hostname);
          } catch {
            return false;
          }
        },
      }),
      UnderlineExtension,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: defaultValue ?? "",
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 h-full focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="prose h-full min-h-72 border rounded-2xl p-4 bg-card rounded-bl-none rounded-br-none">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="h-full min-h-72" />
    </div>
  );
}
