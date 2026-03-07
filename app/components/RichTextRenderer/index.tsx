"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface RichTextRendererProps {
  content: string;
  className?: string;
  maxLines?: number; // Para truncar texto em cards
}

export function RichTextRenderer({
  content,
  className = "",
  maxLines
}: RichTextRendererProps) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    // Sanitiza o HTML para prevenir XSS
    if (content) {
      const clean = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          'p', 'strong', 'em', 'u', 'code', 'pre',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'blockquote', 'a', 'br'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel']
      });
      setSanitizedContent(clean);
    }
  }, [content]);

  if (!sanitizedContent) {
    return null;
  }

  const baseClasses = `
    prose prose-sm max-w-none
    [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:text-muted [&_p]:!text-[inherit]
    [&_strong]:text-primary [&_strong]:font-semibold
    [&_em]:italic [&_em]:text-muted [&_em]:!text-[inherit]
    [&_code]:px-2 [&_code]:py-1 [&_code]:bg-beige/20 [&_code]:rounded [&_code]:text-primary [&_code]:text-sm
    [&_pre]:bg-beige/10 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
    [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-primary [&_h1]:mb-4 [&_h1]:font-Odasans
    [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-primary [&_h2]:mb-3 [&_h2]:font-Odasans
    [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-primary [&_h3]:mb-2 [&_h3]:font-Odasans
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:text-muted [&_ul]:!text-[inherit]
    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol]:text-muted [&_ol]:!text-[inherit]
    [&_li]:mb-1 [&_li]:text-muted [&_li]:!text-[inherit]
    [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted/80 [&_blockquote]:bg-beige/5 [&_blockquote]:py-3 [&_blockquote]:rounded-r
    [&_a]:text-primary [&_a]:hover:underline [&_a]:transition-colors [&_a]:duration-300
  `;

  const truncateClasses = maxLines ? `
    overflow-hidden
    [&_p]:!mb-0 [&_p]:!mt-0
    [&_ul]:!mb-0 [&_ul]:!mt-0
    [&_li]:!mb-0
  ` : "";

  const truncateStyle = maxLines ? {
    display: "-webkit-box",
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  } : undefined;

  return (
    <div
      className={`${baseClasses} ${truncateClasses} ${className}`}
      style={truncateStyle}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}