"use dom";

import Mention from "@tiptap/extension-mention";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLayoutEffect, useRef, useState } from "react";
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

  // Keyboard accessory: track visualViewport to keep toolbar above keyboard
  useLayoutEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const repositionToolbar = () => {
      const toolbar = document.querySelector<HTMLElement>(".toolbar");
      if (!toolbar) return;

      const keyboardHeight = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop,
      );

      const isKeyboardOpen = keyboardHeight > 50; // threshold to avoid false positives

      // Show toolbar only when keyboard is open
      toolbar.style.display = isKeyboardOpen ? "flex" : "none";
      toolbar.style.bottom = `${keyboardHeight}px`;

      // Adjust editor-main padding
      const editorMain = document.querySelector<HTMLElement>(".editor-main");
      if (editorMain) {
        const toolbarHeight = isKeyboardOpen ? toolbar.offsetHeight || 48 : 0;
        editorMain.style.paddingBottom = `${toolbarHeight + keyboardHeight + 16}px`;
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
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: suggestions,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    onUpdate: () => setUpdateCount((c: number) => c + 1),
    onSelectionUpdate: () => setUpdateCount((c: number) => c + 1),
    onTransaction: () => setUpdateCount((c: number) => c + 1),
    editorProps: {
      attributes: { class: "tiptap" },
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
      <Toolbar editor={editor} />
    </div>
  );
};

export default TipTapEditor;
