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
import { EDITOR_STYLES } from "./styles";
import suggestions from "./suggestions";
import { Toolbar } from "./Toolbar";
import { TipTapEditorProps } from "./types";

let markdownContent = `# TipTap Editor Guide 🚀

Welcome to your new **Rich Text Editor**! This editor supports Markdown input and renders it as rich HTML.

## Features Included:
- **Formatting**: **Bold**, *Italic*, ~~Strikethrough~~, and \`Inline Code\`
- **Lists**: Bullet points and numbered lists
- **Extensions**: Mentions (@name), Highlights, and Tables
- **Task Lists**:
  - [x] Implement Markdown support
  - [ ] Add more extensions

## Data Table Example:

| Feature | Support |
| :--- | :--- |
| Markdown | ✅ Full |
| HTML | ✅ Full |
| Images | ✅ Support Base64 & URL |

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

---
*Feel free to edit this content to get started!*

***~~<u>![](data:image/jpeg;base64,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)</u>~~***
`;
let markdownContent2 = `
# My First Markdown File

## Introduction
Hello! My name is Tasfique.  
I am learning **React Native** and _Markdown_.

---

## 🧠 Skills
- Java
- Spring Boot
- React Native
- Machine Learning

---

## 🔢 Ordered List
1. Install Node.js
2. Create Expo App
3. Run the project

---

## 🔗 Link
Visit my GitHub:  
https://github.com/tasfique86

---

## 🖼 Image
![Sample Image](https://via.placeholder.com/150)

---



## 💻 Code Block

### JavaScript Example
`;
const TipTapEditor: React.FC<TipTapEditorProps> = ({
  name,
  initialContent = markdownContent,
  initialContentFormat = "markdown",
  theme = "light",
  onSave,
  readOnly = false,
  initialEditMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditable, setIsEditable] = useState(initialEditMode && !readOnly);

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

      if (!isEditable) {
        toolbar.style.display = "none";
        return;
      }

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
  }, [isEditable]);

  const isMounted = useRef(true);
  const [, setUpdateCount] = useState<number>(0);

  useLayoutEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleUpdate = useCallback(() => {
    if (isMounted.current) {
      setUpdateCount((c: number) => c + 1);
    }
  }, []);

  const editor = useEditor({
    editable: isEditable,
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
    onUpdate: handleUpdate,
    onSelectionUpdate: handleUpdate,
    onTransaction: handleUpdate,
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

  const handleSave = () => {
    if (editor) {
      const content = editor.getHTML();
      onSave?.(content);
      setIsEditable(false);
      editor.setOptions({ editable: false });
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
    editor?.setOptions({ editable: true });
  };

  return (
    <div className="tiptap-ui-container" ref={containerRef}>
      <div className={`editor-card ${isEditable ? "edit-mode" : "view-mode"}`}>
        <header
          style={{
            padding: "10px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            background: "var(--bg-toolbar)",
          }}
        >
          <span
            style={{
              marginRight: "auto",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text)",
            }}
          >
            {name}'s Editor
          </span>
          {!readOnly && (
            <>
              {isEditable ? (
                <button
                  className="btn is-active"
                  onClick={handleSave}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={handleEdit}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              )}
            </>
          )}
        </header>
        <main className="editor-main">
          <EditorContent editor={editor} />
        </main>
      </div>
      {/* Toolbar is position:fixed so it always sits above the keyboard */}
      {isEditable && (
        <Toolbar
          editor={editor}
          onImageClick={() => editor && triggerImagePicker(editor)}
        />
      )}
    </div>
  );
};

export default TipTapEditor;
