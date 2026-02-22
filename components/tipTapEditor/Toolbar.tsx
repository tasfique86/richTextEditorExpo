import { Editor } from "@tiptap/core";
import React from "react";

interface ToolbarProps {
  editor: Editor | null;
  onImageClick: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor, onImageClick }) => {
  if (!editor) return null;

  const isActive = (name: string, opts?: any) => editor.isActive(name, opts);

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleHighlight = () => editor.chain().focus().toggleHighlight().run();
  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleBlockquote = () =>
    editor.chain().focus().toggleBlockquote().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const toggleTaskList = () => editor.chain().focus().toggleTaskList().run();

  const insertTable = () =>
    editor
      .chain()
      .focus()
      .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
      .run();

  const setLink = () => {
    if (isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = prompt("Link URL", "https://");
      if (url)
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
    }
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
  };

  return (
    <header className="toolbar">
      <div className="toolbar-inner">
        <div className="toolbar-left">
          <div className="toolbar-controls">
            <div className="group">
              <button
                className={`btn icon-only ${isActive("undo") ? "" : ""}`}
                onClick={() => editor.chain().focus().undo().run()}
                title="Undo"
              >
                <span className="btn-icon">↺</span>
              </button>
              <button
                className={`btn icon-only ${isActive("redo") ? "" : ""}`}
                onClick={() => editor.chain().focus().redo().run()}
                title="Redo"
              >
                <span className="btn-icon">↻</span>
              </button>
            </div>

            <div className="group">
              {/* Headings could be a proper dropdown component, simplifying to buttons for now to match logic */}
              <button
                className={`btn icon-only ${isActive("heading", { level: 1 }) ? "is-active" : ""}`}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                H1
              </button>
              <button
                className={`btn icon-only ${isActive("heading", { level: 2 }) ? "is-active" : ""}`}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                H2
              </button>
              <button
                className={`btn icon-only ${isActive("heading", { level: 3 }) ? "is-active" : ""}`}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                H3
              </button>
              <button
                className={`btn icon-only ${isActive("paragraph") ? "is-active" : ""}`}
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                P
              </button>
            </div>

            <div className="group">
              <button
                className={`btn icon-only ${isActive("bold") ? "is-active" : ""}`}
                onClick={toggleBold}
                title="Bold"
              >
                <span className="btn-icon">B</span>
              </button>
              <button
                className={`btn icon-only ${isActive("italic") ? "is-active" : ""}`}
                onClick={toggleItalic}
                title="Italic"
              >
                <span className="btn-icon">
                  <i>I</i>
                </span>
              </button>
              <button
                className={`btn icon-only ${isActive("underline") ? "is-active" : ""}`}
                onClick={toggleUnderline}
                title="Underline"
              >
                <span className="btn-icon">
                  <u>U</u>
                </span>
              </button>
              <button
                className={`btn icon-only ${isActive("strike") ? "is-active" : ""}`}
                onClick={toggleStrike}
                title="Strikethrough"
              >
                <span className="btn-icon">
                  <s>S</s>
                </span>
              </button>
              <button
                className={`btn icon-only ${isActive("highlight") ? "is-active" : ""}`}
                onClick={toggleHighlight}
                title="Highlight"
              >
                <span className="btn-icon">H</span>
              </button>
            </div>

            <div className="group">
              <button
                className={`btn icon-only ${isActive("code") ? "is-active" : ""}`}
                onClick={toggleCode}
                title="Inline code"
              >
                <span className="btn-icon">{`</>`}</span>
              </button>
              <button
                className={`btn ${isActive("blockquote") ? "is-active" : ""}`}
                onClick={toggleBlockquote}
                title="Blockquote"
              >
                <span className="btn-icon">”</span>
              </button>
              <button
                className={`btn icon-only ${isActive("codeBlock") ? "is-active" : ""}`}
                onClick={toggleCodeBlock}
                title="Code block"
              >
                <span className="btn-icon">CB</span>
              </button>
              <button
                className={`btn icon-only ${isActive("link") ? "is-active" : ""}`}
                onClick={setLink}
                title="Insert link"
              >
                <span className="btn-icon">🔗</span>
              </button>
              <button
                className="btn icon-only"
                onClick={onImageClick}
                title="Insert image"
              >
                <span className="btn-icon">🖼️</span>
              </button>
            </div>

            <div className="group">
              <button
                className={`btn icon-only ${isActive("bulletList") ? "is-active" : ""}`}
                onClick={toggleBulletList}
                title="Bullet List"
              >
                <span className="btn-icon">•</span>
              </button>
              <button
                className={`btn icon-only ${isActive("orderedList") ? "is-active" : ""}`}
                onClick={toggleOrderedList}
                title="Ordered List"
              >
                <span className="btn-icon">1.</span>
              </button>
              <button
                className={`btn icon-only ${isActive("taskList") ? "is-active" : ""}`}
                onClick={toggleTaskList}
                title="Task List"
              >
                <span className="btn-icon">☑</span>
              </button>
            </div>

            <div className="group">
              <button className="btn" onClick={insertTable}>
                <span className="btn-icon">▦</span>
                <span className="btn-label">Table</span>
              </button>
            </div>
          </div>
        </div>

        <div className="toolbar-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            <span className="btn-icon">◑</span>
          </button>
        </div>
      </div>
    </header>
  );
};
