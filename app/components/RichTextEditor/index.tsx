"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  BsTypeBold,
  BsTypeItalic,
  BsCode,
  BsListUl,
  BsListOl,
  BsChatQuote,
  BsLink45Deg,
  BsTextParagraph
} from "react-icons/bs";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder = "Digite a descrição do projeto..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary hover:underline",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Digite a URL do link:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const MenuButton = ({
    onClick,
    isActive,
    children
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-md transition-all duration-200 hover:bg-beige/20 ${
        isActive ? "bg-primary/20 text-primary" : "text-muted"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-beige/30 rounded-lg overflow-hidden focus-within:border-primary/50 transition-colors duration-300">
      {/* Toolbar */}
      <div className="border-b border-beige/20 p-3 bg-background/50">
        <div className="flex gap-1 flex-wrap">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <BsTypeBold className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <BsTypeItalic className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
          >
            <BsCode className="h-4 w-4" />
          </MenuButton>

          <div className="w-px h-6 bg-beige/30 mx-1"></div>

          <MenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
          >
            <BsTextParagraph className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            <BsListUl className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            <BsListOl className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
          >
            <BsChatQuote className="h-4 w-4" />
          </MenuButton>

          <div className="w-px h-6 bg-beige/30 mx-1"></div>

          <MenuButton onClick={addLink}>
            <BsLink45Deg className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor */}
      <div className="p-4">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none focus:outline-none min-h-[200px]
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:min-h-[200px]
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
            [&_.ProseMirror]:text-primary
            [&_.ProseMirror_h1]:text-primary
            [&_.ProseMirror_h2]:text-primary
            [&_.ProseMirror_h3]:text-primary
            [&_.ProseMirror_strong]:text-primary
            [&_.ProseMirror_blockquote]:border-l-primary
            [&_.ProseMirror_code]:bg-beige/20
            [&_.ProseMirror_code]:text-primary
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ol]:list-decimal"
        />
      </div>
    </div>
  );
}