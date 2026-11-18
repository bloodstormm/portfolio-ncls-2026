"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { toast } from "sonner";
import { ResizableImage } from "./ResizableImage";
import {
  BsTypeBold,
  BsTypeItalic,
  BsCode,
  BsListUl,
  BsListOl,
  BsChatQuote,
  BsLink45Deg,
  BsTextParagraph,
  BsTypeH2,
  BsTypeH3,
  BsImage,
  BsDashLg
} from "react-icons/bs";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

export function RichTextEditor({ content, onChange, placeholder = "Digite a descrição do projeto...", onImageUpload }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      ResizableImage.configure({
        HTMLAttributes: {
          class: "rounded-xl",
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

  const handleImageButtonClick = () => {
    if (!onImageUpload) return;
    fileInputRef.current?.click();
  };

  const handleImageFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !onImageUpload) return;

    try {
      toast.loading("Fazendo upload da imagem...", { id: "editor-image-upload" });
      const url = await onImageUpload(file);
      editor.chain().focus().setImage({ src: url }).run();
      toast.success("Imagem inserida!", { id: "editor-image-upload" });
    } catch (error) {
      console.error("Erro ao inserir imagem:", error);
      toast.error("Falha no upload da imagem.", { id: "editor-image-upload" });
    }
  };

  const MenuButton = ({
    onClick,
    isActive,
    disabled,
    children
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isActive}
      className={`grid size-9 place-items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30 ${
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-2xl border border-input bg-background/40 transition-colors duration-300 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-ring/25">
      {/* Toolbar */}
      <div className="sticky top-20 z-10 rounded-t-2xl border-b border-border bg-background/90 px-2 py-2 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-0.5">
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

          <div className="mx-1.5 h-5 w-px bg-border"></div>

          <MenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
          >
            <BsTextParagraph className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
          >
            <BsTypeH2 className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
          >
            <BsTypeH3 className="h-4 w-4" />
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

          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <BsDashLg className="h-4 w-4" />
          </MenuButton>

          {onImageUpload && (
            <MenuButton onClick={handleImageButtonClick}>
              <BsImage className="h-4 w-4" />
            </MenuButton>
          )}
        </div>
      </div>

      {onImageUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
          onChange={handleImageFileSelected}
        />
      )}

      {/* Editor */}
      <div className="px-5 py-6 md:px-8 md:py-8">
        <EditorContent
          editor={editor}
          className="max-w-none focus:outline-none min-h-60
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:min-h-60
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground/60
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
            [&_.ProseMirror]:text-foreground
            [&_.ProseMirror]:text-base
            [&_.ProseMirror]:leading-relaxed
            [&_.ProseMirror_p]:mb-3
            [&_.ProseMirror_h1]:text-primary [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-semibold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h1]:mt-2
            [&_.ProseMirror_h2]:font-Wulkan [&_.ProseMirror_h2]:text-3xl [&_.ProseMirror_h2]:leading-tight [&_.ProseMirror_h2]:font-normal [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h2]:mt-6
            [&_.ProseMirror_h3]:text-primary [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-medium [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_h3]:mt-4
            [&_.ProseMirror_strong]:font-semibold
            [&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground
            [&_.ProseMirror_code]:bg-secondary [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:px-1
            [&_.ProseMirror_code]:text-primary
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline [&_.ProseMirror_img]:rounded-xl
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:pl-6
            [&_.ProseMirror_hr]:border-border
            [&_.ProseMirror_hr]:my-6"
        />
      </div>
    </div>
  );
}
