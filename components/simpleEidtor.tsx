"use dom";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

const ToolbarButton = ({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}) => {
  console.log("onClick", onClick);
  console.log("isActive", isActive);
  return (
    <button
      onClick={() => {
        console.log("ToolbarButton clicked");
        onClick();
      }}
      style={{
        padding: "5px 10px",
        margin: "0 2px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        background: isActive ? "#333" : "#fff",
        color: isActive ? "#fff" : "#333",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      {children}
    </button>
  );
};

const Toolbar = ({ editor }: { editor: any }) => {
  console.log("Toolbar rendering. Bold active:", editor?.isActive("bold"));
  if (!editor) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        background: "#f8f9fa",
      }}
    >
      <ToolbarButton
        onClick={() => {
          console.log("Bold clicked");
          editor?.chain().focus().toggleBold().run();
          console.log("Bold state after click:", editor?.isActive("bold"));
        }}
        isActive={editor?.isActive("bold")}
      >
        Bold
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        isActive={editor?.isActive("italic")}
      >
        Italic
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        isActive={editor?.isActive("strike")}
      >
        Strike
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        isActive={editor?.isActive("heading", { level: 1 })}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        isActive={editor?.isActive("heading", { level: 2 })}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        isActive={editor?.isActive("bulletList")}
      >
        Bullet List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        isActive={editor?.isActive("orderedList")}
      >
        Ordered List
      </ToolbarButton>
    </div>
  );
};
export default function SimpleEditor({ name }: { name: string }) {
  const [, setUpdateCount] = useState(0);
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Hello, ${name}! This is Tiptap.</p>`,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none",
        style: "min-height: 200px; padding: 10px; outline: none;",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    console.log("Editor created");
    const handler = () => {
      console.log("Handler triggering re-render");
      setUpdateCount((c) => c + 1);
    };

    editor.on("transaction", handler);
    editor.on("update", handler);

    return () => {
      editor.off("transaction", handler);
      editor.off("update", handler);
    };
  }, [editor]);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        maxWidth: "800px",
        margin: "10px",
        backgroundColor: "#fff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} style={{ minHeight: "200px" }} />
      <style>{`
        .ProseMirror {
          padding: 10px;
          min-height: 200px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
