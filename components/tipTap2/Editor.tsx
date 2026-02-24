"use dom";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Mention from "@tiptap/extension-mention";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Compressor from "compressorjs";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Markdown } from "tiptap-markdown";
import { TipTapEditorProps } from "../tipTapEditor";
import { EDITOR_STYLES } from "./styles";
import suggestions from "./suggestions";
import { Toolbar } from "./Toolbar";

let content = `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `;

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  name,
  initialContent = `<p>Welcome to TipTap!! Hello ${name}</p>`,
  theme = "light",
  //  onSave,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!document.getElementById("tiptap-editor-styles")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "tiptap-editor-styles";
      styleSheet.textContent = EDITOR_STYLES;
      document.head.appendChild(styleSheet);
    }
    // Set initial theme
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const processAndInsertImage = (file: File, view: any, insertPos?: number) => {
    if (!file) return;
    const doInsert = (blob: Blob | File) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const node = view.state.schema.nodes.image.create({
          src: e.target.result,
        });
        const tr =
          insertPos !== undefined
            ? view.state.tr.insert(insertPos, node)
            : view.state.tr.replaceSelectionWith(node);
        view.dispatch(tr);
      };
      reader.readAsDataURL(blob);
    };

    new Compressor(file, {
      quality: 0.6,
      maxWidth: 800,
      maxHeight: 800,
      mimeType: "image/jpeg",
      success(result) {
        doInsert(result);
      },
      error(err) {
        console.error(err);
        doInsert(file);
      },
    });
  };

  const triggerImagePicker = useCallback((editor: Editor) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      processAndInsertImage(file, editor.view);
    };
    input.click();
  }, []);

  // Keyboard accessory: track visualViewport to keep toolbar above keyboard
  useLayoutEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const repositionToolbar = () => {
      const toolbar = document.querySelector<HTMLElement>(".toolbar");
      if (!toolbar) return;

      // More robust keyboard detection:
      // 1. Difference between window height and visual viewport height
      // 2. Account for offsetTop which changes during scroll/pan
      const keyboardHeight = Math.max(0, window.innerHeight - vv.height);
      const isKeyboardOpen = keyboardHeight > 60; // Slightly higher threshold

      // Force toolbar visibility if keyboard is likely open
      toolbar.style.display = isKeyboardOpen ? "flex" : "none";

      // Calculate position relative to the BOTTOM of the visual viewport
      // If we use fixed positioning, and bottom: keyboardHeight, it should stay pinned.
      // However, the visual viewport itself might have shifted.
      toolbar.style.bottom = `${window.innerHeight - vv.height - vv.offsetTop}px`;

      // Adjust editor-main padding to prevent content from being hidden
      const editorMain = document.querySelector<HTMLElement>(".editor-main");
      if (editorMain) {
        const toolbarHeight = isKeyboardOpen ? 48 : 0;
        editorMain.style.paddingBottom = `${toolbarHeight + 20}px`;
      }
    };

    vv.addEventListener("resize", repositionToolbar);
    vv.addEventListener("scroll", repositionToolbar);
    repositionToolbar();

    return () => {
      vv.removeEventListener("resize", repositionToolbar);
      vv.removeEventListener("scroll", repositionToolbar);
    };
  }, []);

  const [, setUpdateCount] = useState<number>(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: suggestions,
      }),
      Table.configure({
        resizable: true,
      }),
      Image.configure({ inline: true, allowBase64: true }),
      TableRow,
      TableHeader,
      TableCell,
      Markdown.configure({
        html: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: initialContent,
    onUpdate: () => setUpdateCount((c: number) => c + 1),
    onSelectionUpdate: () => setUpdateCount((c: number) => c + 1),
    onTransaction: () => setUpdateCount((c: number) => c + 1),
    editorProps: {
      attributes: { class: "tiptap" },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find((item) => item.type.startsWith("image"));
        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          if (file) processAndInsertImage(file, view);
          return true;
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        const files = Array.from(event.dataTransfer?.files || []);
        const imageFile = files.find((f) => f.type.startsWith("image"));
        if (imageFile && !moved) {
          event.preventDefault();
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (coordinates)
            processAndInsertImage(imageFile, view, coordinates.pos);
          return true;
        }
        return false;
      },
    },
  });
  return (
    <div className="tiptap-ui-container" ref={containerRef}>
      <div className="editor-card edit-mode">
        <main className="editor-main">
          <EditorContent editor={editor} />
        </main>
      </div>
      {/* Toolbar is position:fixed so it always sits above the keyboard */}
      <Toolbar
        editor={editor}
        onImageClick={() => editor && triggerImagePicker(editor)}
      />
    </div>
  );
};

export default TipTapEditor;
