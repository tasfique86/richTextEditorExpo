"use dom";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Compressor from "compressorjs";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Markdown } from "tiptap-markdown";

import Mention from "@tiptap/extension-mention";
import suggestions from "../tipTap2/suggestions";
import { DeleteSingleCellTable, ReorderListItems } from "./extensions";
import { EDITOR_STYLES } from "./styles";
import { Toolbar } from "./Toolbar";
import { TipTapEditorProps } from "./types";

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  name,
  initialContent = `<p>Welcome to TipTap!! Hello ${name}</p>`,
  theme = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply Styles
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

  const [, setUpdateCount] = useState<number>(0);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: suggestions,
      }),
      Underline,
      Highlight,
      Link.configure({ openOnClick: true, linkOnPaste: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({ inline: true, allowBase64: true }),
      Markdown.configure({
        html: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
      DeleteSingleCellTable,
      ReorderListItems,
    ],
    content: initialContent,
    onUpdate: () => setUpdateCount((c: number) => c + 1),
    onSelectionUpdate: () => setUpdateCount((c: number) => c + 1),
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
        <Toolbar
          editor={editor}
          onImageClick={() => editor && triggerImagePicker(editor)}
        />
        <main className="editor-main">
          <EditorContent editor={editor} />
        </main>
      </div>
    </div>
  );
};

export default TipTapEditor;
