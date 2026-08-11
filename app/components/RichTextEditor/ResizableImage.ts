import TiptapImage from "@tiptap/extension-image";
import type { NodeViewRenderer } from "@tiptap/core";

const MIN_WIDTH = 120;

export const ResizableImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => (attributes.width ? { width: attributes.width } : {}),
      },
    };
  },

  addNodeView(): NodeViewRenderer {
    return ({ node: initialNode, editor, getPos }) => {
      let node = initialNode;

      const container = document.createElement("span");
      container.style.position = "relative";
      container.style.display = "inline-block";
      container.style.maxWidth = "100%";
      container.style.lineHeight = "0";

      const img = document.createElement("img");
      img.className = "rounded-xl";
      img.style.display = "block";
      img.style.maxWidth = "100%";
      img.style.borderRadius = "0.75rem";

      const applyAttrs = (n: typeof node) => {
        img.src = n.attrs.src;
        if (n.attrs.alt) img.alt = n.attrs.alt;
        img.style.width = n.attrs.width ? `${n.attrs.width}px` : "100%";
      };
      applyAttrs(node);

      const handle = document.createElement("span");
      handle.contentEditable = "false";
      handle.style.position = "absolute";
      handle.style.right = "4px";
      handle.style.bottom = "4px";
      handle.style.width = "14px";
      handle.style.height = "14px";
      handle.style.borderRadius = "4px";
      handle.style.background = "rgba(0,0,0,0.55)";
      handle.style.border = "2px solid white";
      handle.style.cursor = "nwse-resize";
      handle.style.boxShadow = "0 1px 3px rgba(0,0,0,0.4)";

      let startX = 0;
      let startWidth = 0;

      const onMouseMove = (e: MouseEvent) => {
        const delta = e.clientX - startX;
        const newWidth = Math.max(MIN_WIDTH, Math.round(startWidth + delta));
        img.style.width = `${newWidth}px`;
      };

      const commitWidth = () => {
        const pos = typeof getPos === "function" ? getPos() : undefined;
        if (typeof pos !== "number") return;
        const newWidth = Math.round(img.getBoundingClientRect().width);
        const tr = editor.view.state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          width: newWidth,
        });
        editor.view.dispatch(tr);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        commitWidth();
      };

      const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startX = e.clientX;
        startWidth = img.getBoundingClientRect().width;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };
      handle.addEventListener("mousedown", onMouseDown);

      container.appendChild(img);
      container.appendChild(handle);

      return {
        dom: container,
        update(updatedNode) {
          if (updatedNode.type.name !== node.type.name) return false;
          node = updatedNode;
          applyAttrs(node);
          return true;
        },
        destroy() {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        },
        stopEvent(event) {
          return event.target === handle;
        },
      };
    };
  },
});
