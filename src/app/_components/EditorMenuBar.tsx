"use client";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  LinkIcon,
  List,
  ListCheck,
  ListOrdered,
  MoreHorizontal,
  Save,
  Strikethrough,
  Underline,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MenuBar = ({ editor }: { editor: Editor }) => {
    const [open, setOpen] = useState(false);
    const [href, setHref] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  
    useEffect(() => {
      const handleResize = () => {
        const currentHeight = window.innerHeight;
        const heightDifference = viewportHeight - currentHeight;
        
        // If viewport height decreased significantly (usually > 150px), keyboard is likely open
        const isKeyboardOpen = heightDifference > 150;
        setKeyboardVisible(isKeyboardOpen);
        
        if (!isKeyboardOpen) {
          setViewportHeight(currentHeight);
        }
      };
  
      const handleVisualViewportChange = () => {
        if (window.visualViewport) {
          const keyboardOpen = window.visualViewport.height < window.innerHeight;
          setKeyboardVisible(keyboardOpen);
        }
      };
  
      // Method 1: Listen to window resize (fallback for older browsers)
      window.addEventListener('resize', handleResize);
      
      // Method 2: Use Visual Viewport API (more reliable for modern browsers)
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleVisualViewportChange);
      }
  
      // Method 3: Listen for focus events on input elements (additional detection)
      const handleFocusIn = (e: FocusEvent) => {
        if (e.target instanceof HTMLElement && (
          e.target.tagName === 'INPUT' || 
          e.target.tagName === 'TEXTAREA' || 
          e.target.contentEditable === 'true'
        )) {
          // Small delay to allow keyboard to appear
          setTimeout(() => setKeyboardVisible(true), 300);
        }
      };
  
      const handleFocusOut = () => {
        // Small delay to prevent flickering when switching between inputs
        setTimeout(() => {
          if (!document.activeElement || (
            document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA' && 
            document.activeElement.getAttribute('contenteditable') !== 'true'
          )) {
            setKeyboardVisible(false);
          }
        }, 100);
      };
  
      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
        }
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
      };
    }, [viewportHeight]);
  
    const handleConfirm = () => {
      if (!href) return;
      editor.chain().focus().toggleLink({ href, target: "_blank" }).toggleUnderline().run();
      setOpen(false);
      setHref("");
    };
  
    const getEditorContent = () => {
      if (!editor) return null;
      return {
        html: editor.getHTML(),
        json: editor.getJSON(),
        text: editor.getText(),
      };
    };
  
    return (
      <>
        <div 
          className={`bg-background fixed z-50 flex items-center gap-2 rounded-lg p-2 shadow transition-all duration-300 ${
            keyboardVisible 
              ? 'bottom-2 left-1/2 -translate-x-1/2 transform' // Above keyboard
              : 'bottom-4 left-1/2 -translate-x-1/2 transform' // Normal position
          }`}
        >
          {/* Always visible buttons */}
          <Button
            className="rounded-md p-2"
            variant={editor.isActive("bold") ? "default" : "outline"}
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold />
          </Button>
          <Button
            className="rounded-md p-2"
            variant={editor.isActive("italic") ? "default" : "outline"}
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </Button>
          <Button
            className="rounded-md p-2"
            variant={editor.isActive("strike") ? "default" : "outline"}
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough />
          </Button>
          <Button
            className="rounded-md p-2"
            variant="outline"
            size="icon"
            onClick={() => {
              const content = getEditorContent();
              console.log(content);
            }}
          >
            <Save />
          </Button>
          <Button
            className="rounded-md p-2"
            variant={editor.isActive("underline") ? "default" : "outline"}
            size="icon"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline />
          </Button>
  
          {/* Desktop view - show all buttons */}
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-sidebar-accent mx-0.5 h-6 w-px" />
            <Button
              className="rounded-md p-2"
              variant={editor.isActive("taskList") ? "default" : "outline"}
              size="icon"
              onClick={() => editor.chain().focus().toggleTaskList().run()}
            >
              <ListCheck />
            </Button>
            <Button
              className="rounded-md p-2"
              variant={editor.isActive("bulletList") ? "default" : "outline"}
              size="icon"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List />
            </Button>
            <Button
              className="rounded-md p-2"
              variant={editor.isActive("orderedList") ? "default" : "outline"}
              size="icon"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered />
            </Button>
            <div className="bg-sidebar-accent mx-0.5 h-6 w-px" />
            <Button
              className="rounded-md p-2"
              variant={
                editor.isActive({ textAlign: "left" }) ? "default" : "outline"
              }
              size="icon"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft />
            </Button>
            <Button
              className="rounded-md p-2"
              variant={
                editor.isActive({ textAlign: "center" }) ? "default" : "outline"
              }
              size="icon"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
            >
              <AlignCenter />
            </Button>
            <Button
              className="rounded-md p-2"
              variant={
                editor.isActive({ textAlign: "right" }) ? "default" : "outline"
              }
              size="icon"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <AlignRight />
            </Button>
            <Button
              className="rounded-md p-2"
              variant={editor.isActive("code") ? "default" : "outline"}
              size="icon"
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <Code />
            </Button>
            <Button
              className="rounded-md p-2"
              variant={editor.isActive("link") ? "default" : "outline"}
              size="icon"
              onClick={() => {
                if (editor.isActive("link")) {
                  editor.chain().focus().unsetLink().run();
                } else {
                  setOpen(true);
                }
              }}
            >
              <LinkIcon />
            </Button>
          </div>
  
          {/* Mobile view - dropdowns */}
          <div className="flex md:hidden items-center gap-2">
            <div className="bg-sidebar-accent mx-0.5 h-6 w-px" />
            
            {/* List items dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-md p-2" variant="outline" size="icon">
                  <List />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleTaskList().run()}
                  className={editor.isActive("taskList") ? "bg-accent" : ""}
                >
                  <ListCheck className="mr-2 h-4 w-4" />
                  Task List
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive("bulletList") ? "bg-accent" : ""}
                >
                  <List className="mr-2 h-4 w-4" />
                  Bullet List
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive("orderedList") ? "bg-accent" : ""}
                >
                  <ListOrdered className="mr-2 h-4 w-4" />
                  Numbered List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  
            {/* Alignment dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-md p-2" variant="outline" size="icon">
                  <AlignLeft />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  className={editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""}
                >
                  <AlignLeft className="mr-2 h-4 w-4" />
                  Align Left
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().setTextAlign("center").run()}
                  className={editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""}
                >
                  <AlignCenter className="mr-2 h-4 w-4" />
                  Align Center
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().setTextAlign("right").run()}
                  className={editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""}
                >
                  <AlignRight className="mr-2 h-4 w-4" />
                  Align Right
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  
            {/* More options dropdown (Link and Code) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-md p-2" variant="outline" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={editor.isActive("code") ? "bg-accent" : ""}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Code
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (editor.isActive("link")) {
                      editor.chain().focus().unsetLink().run();
                    } else {
                      setOpen(true);
                    }
                  }}
                  className={editor.isActive("link") ? "bg-accent" : ""}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
  
        {/* Dialog to insert link */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="space-y-6 px-6 pt-4 pb-2 sm:px-8 sm:pb-4">
            <DialogTitle className="text-lg font-semibold">Enter URL</DialogTitle>
            <Input
              className="w-full"
              placeholder="https://example.com"
              value={href}
              onChange={(e) => setHref(e.target.value)}
            />
            <DialogFooter className="flex items-center justify-end space-x-4 px-0 py-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  