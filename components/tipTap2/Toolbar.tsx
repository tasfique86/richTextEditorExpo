import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface ToolbarProps {
  editor: Editor | null;
  onImageClick: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor, onImageClick }) => {
  const [toolbarState, setToolbarState] = useState({
    isTableActive: false,
    canInsertTable: true,
    isBoldActive: false,
    isItalicActive: false,
    isUnderlineActive: false,
    isStrikeActive: false,
    isHighlightActive: false,
    isCodeActive: false,
    isBlockquoteActive: false,
    isCodeBlockActive: false,
    isLinkActive: false,
    isBulletListActive: false,
    isOrderedListActive: false,
    isTaskListActive: false,
  });

  useEffect(() => {
    if (!editor) return;

    const updateState = () => {
      setToolbarState({
        isTableActive: editor.isActive("table"),
        canInsertTable: editor.can().insertTable({ rows: 3, cols: 3 }),
        isBoldActive: editor.isActive("bold"),
        isItalicActive: editor.isActive("italic"),
        isUnderlineActive: editor.isActive("underline"),
        isStrikeActive: editor.isActive("strike"),
        isHighlightActive: editor.isActive("highlight"),
        isCodeActive: editor.isActive("code"),
        isBlockquoteActive: editor.isActive("blockquote"),
        isCodeBlockActive: editor.isActive("codeBlock"),
        isLinkActive: editor.isActive("link"),
        isBulletListActive: editor.isActive("bulletList"),
        isOrderedListActive: editor.isActive("orderedList"),
        isTaskListActive: editor.isActive("taskList"),
      });
    };

    // Initial state sync
    updateState();

    editor.on("transaction", updateState);
    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  if (!editor || !editor.isEditable) return null;

  const isActive = (name: string, opts?: any) => editor.isActive(name, opts);
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleHighlight = () => editor.chain().focus().toggleHighlight().run();

  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const toggleTaskList = () => editor.chain().focus().toggleTaskList().run();

  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleBlockquote = () =>
    editor.chain().focus().toggleBlockquote().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  const setLink = () => {
    if (toolbarState.isLinkActive) {
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

  const addTable = () =>
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
      .run();
  const addRowAbove = () => editor.chain().focus().addRowBefore().run();
  const addRowBelow = () => editor.chain().focus().addRowAfter().run();
  const deleteRow = () => editor.chain().focus().deleteRow().run();
  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const deleteColumn = () => editor.chain().focus().deleteColumn().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();

  // const toggleHeaderColumn = () =>
  //   editor.chain().focus().toggleHeaderColumn().run();
  // const toggleHeaderRow = () => editor.chain().focus().toggleHeaderRow().run();
  // const toggleHeaderCell = () =>
  //   editor.chain().focus().toggleHeaderCell().run();

  return (
    <header className="toolbar">
      <div className="toolbar-inner">
        <div className="toolbar-left">
          <div className="toolbar-controls">
            {/* Undo Redo */}
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
                className={`btn icon-only ${toolbarState.isBulletListActive ? "is-active" : ""}`}
                onClick={() => toggleBulletList()}
                title="Bullet List"
              >
                <span className="btn-icon">•</span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isOrderedListActive ? "is-active" : ""}`}
                onClick={() => toggleOrderedList()}
                title="Ordered List"
              >
                <span className="btn-icon">1.</span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isTaskListActive ? "is-active" : ""}`}
                onClick={() => toggleTaskList()}
                title="Task List"
              >
                <span className="btn-icon">☑</span>
              </button>
            </div>

            <div className="group">
              <button
                className={`btn icon-only ${toolbarState.isBoldActive ? "is-active" : ""}`}
                onClick={() => toggleBold()}
                title="Bold"
              >
                <span className="btn-icon">B</span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isItalicActive ? "is-active" : ""}`}
                onClick={() => toggleItalic()}
                title="Italic"
              >
                <span className="btn-icon">
                  <i>I</i>
                </span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isUnderlineActive ? "is-active" : ""}`}
                onClick={() => toggleUnderline()}
                title="Underline"
              >
                <span className="btn-icon">
                  <u>U</u>
                </span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isStrikeActive ? "is-active" : ""}`}
                onClick={() => toggleStrike()}
                title="Strikethrough"
              >
                <span className="btn-icon">
                  <s>S</s>
                </span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isHighlightActive ? "is-active" : ""}`}
                onClick={() => toggleHighlight()}
                title="Highlight"
              >
                <span className="btn-icon">H</span>
              </button>
            </div>

            <div className="group">
              <button
                className={`btn icon-only ${toolbarState.isCodeActive ? "is-active" : ""}`}
                onClick={() => toggleCode()}
                title="Inline code"
              >
                <span className="btn-icon">{`</>`}</span>
              </button>
              <button
                className={`btn ${toolbarState.isBlockquoteActive ? "is-active" : ""}`}
                onClick={() => toggleBlockquote()}
                title="Blockquote"
              >
                <span className="btn-icon">”</span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isCodeBlockActive ? "is-active" : ""}`}
                onClick={() => toggleCodeBlock()}
                title="Code block"
              >
                <span className="btn-icon">CB</span>
              </button>
              <button
                className={`btn icon-only ${toolbarState.isLinkActive ? "is-active" : ""}`}
                onClick={() => setLink()}
                title="Insert link"
              >
                <span className="btn-icon">🔗</span>
              </button>
              <button
                className="btn icon-only"
                onClick={() => onImageClick()}
                title="Insert image"
              >
                <span className="btn-icon">🖼️</span>
              </button>
            </div>

            <div className="group">
              <button
                className={`btn ${toolbarState.isTableActive ? "is-active" : ""}`}
                onClick={() => addTable()}
                // Use explicit state and command check to prevent nesting
                disabled={
                  toolbarState.isTableActive || !toolbarState.canInsertTable
                }
              >
                <span className="btn-icon">▦</span>
                <span className="btn-label">Table</span>
              </button>
            </div>

            {toolbarState.isTableActive && (
              <div
                className={`table-controls-group ${toolbarState.isTableActive ? "active-context" : ""}`}
              >
                <button
                  className="btn"
                  onClick={() => deleteTable()}
                  disabled={
                    !toolbarState.isTableActive || !editor.can().deleteTable()
                  }
                  title="Delete Table"
                >
                  <span className="btn-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </span>
                  <span className="btn-label">Table</span>
                </button>
                <button
                  className="btn"
                  onClick={() => addRowBelow()}
                  disabled={
                    !toolbarState.isTableActive || !editor.can().addRowAfter()
                  }
                >
                  +Row(↓)
                </button>
                <button
                  className="btn"
                  onClick={() => deleteRow()}
                  disabled={
                    !toolbarState.isTableActive || !editor.can().deleteRow()
                  }
                >
                  -Row
                </button>
                <button
                  className="btn"
                  onClick={() => addRowAbove()}
                  disabled={
                    !toolbarState.isTableActive || !editor.can().addRowBefore()
                  }
                >
                  +Row(↑)
                </button>
                <button
                  className="btn"
                  onClick={() => addColumnBefore()}
                  disabled={
                    !toolbarState.isTableActive ||
                    !editor.can().addColumnBefore()
                  }
                >
                  +Col(←)
                </button>
                <button
                  className="btn"
                  onClick={() => deleteColumn()}
                  disabled={
                    !toolbarState.isTableActive || !editor.can().deleteColumn()
                  }
                >
                  -Col
                </button>
                <button
                  className="btn"
                  onClick={() => addColumnAfter()}
                  disabled={
                    !toolbarState.isTableActive ||
                    !editor.can().addColumnAfter()
                  }
                >
                  +Col(→)
                </button>

                {/* <button
                  className="btn"
                  onClick={() => mergeCells()}
                  disabled={
                    !toolbarState.isTableActive || !editor.can().mergeCells()
                  }
                >
                  Merge
                </button>
                <button
                  className="btn"
                  onClick={() => splitCell()}
                  disabled={
                    !toolbarState.isTableActive || !editor.can().splitCell()
                  }
                >
                  Split
                </button> */}
              </div>
            )}

            <div className="group">
              <button className="btn" onClick={() => toggleTheme()}>
                🌓
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
