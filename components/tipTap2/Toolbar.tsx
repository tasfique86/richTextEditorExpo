import { Editor } from "@tiptap/react";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

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
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
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
                className={`btn icon-only ${isActive("bold") ? "is-active" : ""}`}
                onClick={() => toggleBold()}
              >
                B
              </button>
            </div>

            <div className="group">
              <button
                className="btn"
                onClick={() => addTable()}
                disabled={!editor.can().insertTable({ rows: 3, cols: 3 })}
              >
                Insert Table
              </button>
            </div>

            <div
              className={`table-controls-group ${isActive("table") ? "active-context" : ""}`}
            >
              <button
                className="btn"
                onClick={() => addRowAbove()}
                disabled={!isActive("table") || !editor.can().addRowBefore()}
              >
                +Row(A)
              </button>
              <button
                className="btn"
                onClick={() => addRowBelow()}
                disabled={!isActive("table") || !editor.can().addRowAfter()}
              >
                +Row(B)
              </button>
              <button
                className="btn"
                onClick={() => deleteRow()}
                disabled={!isActive("table") || !editor.can().deleteRow()}
              >
                -Row
              </button>
              <button
                className="btn"
                onClick={() => addColumnBefore()}
                disabled={!isActive("table") || !editor.can().addColumnBefore()}
              >
                +Col(B)
              </button>
              <button
                className="btn"
                onClick={() => addColumnAfter()}
                disabled={!isActive("table") || !editor.can().addColumnAfter()}
              >
                +Col(A)
              </button>
              <button
                className="btn"
                onClick={() => deleteColumn()}
                disabled={!isActive("table") || !editor.can().deleteColumn()}
              >
                -Col
              </button>
              <button
                className="btn"
                onClick={() => mergeCells()}
                disabled={!isActive("table") || !editor.can().mergeCells()}
              >
                Merge
              </button>
              <button
                className="btn"
                onClick={() => splitCell()}
                disabled={!isActive("table") || !editor.can().splitCell()}
              >
                Split
              </button>
              <button
                className="btn"
                onClick={() => deleteTable()}
                disabled={!isActive("table") || !editor.can().deleteTable()}
              >
                Delete Table
              </button>
            </div>

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
