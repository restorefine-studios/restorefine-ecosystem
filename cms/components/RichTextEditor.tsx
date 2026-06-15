"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState, useRef } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const btn = "p-1.5 rounded hover:bg-gray-200 transition text-gray-600 hover:text-gray-900 disabled:opacity-30 text-xs";
const active = "bg-gray-200 text-gray-900";

export default function RichTextEditor({ value, onChange, placeholder = "Write content..." }: Props) {
  const [linkBarOpen, setLinkBarOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-[140px] px-4 py-3 text-sm text-gray-900 leading-relaxed focus:outline-none prose prose-sm max-w-none bg-white",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  function openLinkBar() {
    // Pre-fill with existing href if cursor is inside a link
    const existing = editor!.getAttributes("link").href || "";
    setLinkUrl(existing);
    setLinkBarOpen(true);
    // Focus the input on next tick (after render)
    setTimeout(() => linkInputRef.current?.focus(), 0);
  }

  function applyLink() {
    const url = linkUrl.trim();
    if (!url) {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const href = url.startsWith("http") ? url : `https://${url}`;
      editor!.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setLinkBarOpen(false);
    setLinkUrl("");
  }

  function removeLink() {
    editor!.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkBarOpen(false);
    setLinkUrl("");
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btn} font-bold w-7 ${editor.isActive("bold") ? active : ""}`}>B</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btn} italic w-7 ${editor.isActive("italic") ? active : ""}`}>I</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${btn} line-through w-7 ${editor.isActive("strike") ? active : ""}`}>S</button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btn} px-2 ${editor.isActive("bulletList") ? active : ""}`}>• List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btn} px-2 ${editor.isActive("orderedList") ? active : ""}`}>1. List</button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={openLinkBar}
          className={`${btn} px-2 ${editor.isActive("link") ? active : ""}`}>
          Link
        </button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().undo().run()}
          className={`${btn} px-2`}>↩</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().redo().run()}
          className={`${btn} px-2`}>↪</button>
      </div>

      {/* Inline link bar — appears when Link is clicked */}
      {linkBarOpen && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-white">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">URL</span>
          <input
            ref={linkInputRef}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); applyLink(); }
              if (e.key === "Escape") { setLinkBarOpen(false); }
            }}
            placeholder="https://example.com"
            className="flex-1 bg-gray-100 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-gray-400 placeholder:text-gray-400"
          />
          <button type="button" onClick={applyLink}
            className="text-xs font-bold bg-white text-gray-900 px-3 py-1.5 rounded hover:bg-gray-50 transition whitespace-nowrap">
            Apply
          </button>
          {editor.isActive("link") && (
            <button type="button" onClick={removeLink}
              className="text-xs font-semibold text-red-400 hover:text-red-300 transition whitespace-nowrap">
              Remove
            </button>
          )}
          <button type="button" onClick={() => setLinkBarOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition text-sm px-1">✕</button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
