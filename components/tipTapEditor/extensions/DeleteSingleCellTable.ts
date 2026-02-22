import { Extension } from "@tiptap/core";

export const DeleteSingleCellTable = Extension.create({
  name: "deleteSingleCellTable",
  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { state, view } = this.editor;
        const { selection, schema } = state;
        const tableType = schema.nodes.table;
        if (!tableType) return false;
        const $pos = selection.$from;
        for (let depth = $pos.depth; depth > 0; depth--) {
          const node = $pos.node(depth);
          if (node.type === tableType) {
            const rows = node.childCount;
            const cols = node.firstChild ? node.firstChild.childCount : 0;
            if (rows === 1 && cols === 1) {
              const from = $pos.before(depth);
              const to = $pos.after(depth);
              view.dispatch(state.tr.delete(from, to));
              return true;
            }
          }
        }
        return false;
      },
    };
  },
});
