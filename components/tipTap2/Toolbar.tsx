import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [toolbarState, setToolbarState] = useState({
    isTableActive: false,
    canInsertTable: true,
    isBoldActive: false,
  });

  useEffect(() => {
    if (!editor) return;

    const updateState = () => {
      setToolbarState({
        isTableActive: editor.isActive("table"),
        canInsertTable: editor.can().insertTable({ rows: 3, cols: 3 }),
        isBoldActive: editor.isActive("bold"),
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

  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();

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
  const mergeCells = () => editor.chain().focus().mergeCells().run();
  const splitCell = () => editor.chain().focus().splitCell().run();
  const toggleHeaderColumn = () =>
    editor.chain().focus().toggleHeaderColumn().run();
  const toggleHeaderRow = () => editor.chain().focus().toggleHeaderRow().run();
  const toggleHeaderCell = () =>
    editor.chain().focus().toggleHeaderCell().run();

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
              <button
                className={`btn icon-only ${toolbarState.isBoldActive ? "is-active" : ""}`}
                onClick={() => toggleBold()}
              >
                B
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
                className={`btn ${toolbarState.isTableActive ? "is-active" : ""}`}
                onClick={() => addTable()}
                // Use explicit state and command check to prevent nesting
                disabled={
                  toolbarState.isTableActive || !toolbarState.canInsertTable
                }
              >
                Insert Table
              </button>
            </div>

            {toolbarState.isTableActive && (
              <span
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                TABLE MODE ACTIVE
              </span>
            )}

            {/* <div
              className={`table-controls-group ${toolbarState.isTableActive ? "active-context" : ""}`}
            >
              <button
                className="btn"
                onClick={() => addRowAbove()}
                disabled={
                  !toolbarState.isTableActive || !editor.can().addRowBefore()
                }
              >
                +Row(A)
              </button>
              <button
                className="btn"
                onClick={() => addRowBelow()}
                disabled={
                  !toolbarState.isTableActive || !editor.can().addRowAfter()
                }
              >
                +Row(B)
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
                onClick={() => addColumnBefore()}
                disabled={
                  !toolbarState.isTableActive || !editor.can().addColumnBefore()
                }
              >
                +Col(B)
              </button>
              <button
                className="btn"
                onClick={() => addColumnAfter()}
                disabled={
                  !toolbarState.isTableActive || !editor.can().addColumnAfter()
                }
              >
                +Col(A)
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
              </button>
              <button
                className="btn"
                onClick={() => deleteTable()}
                disabled={
                  !toolbarState.isTableActive || !editor.can().deleteTable()
                }
              >
                Delete Table
              </button>
            </div> */}

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
