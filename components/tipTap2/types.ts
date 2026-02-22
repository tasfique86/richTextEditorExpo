export interface TipTapEditorProps {
  name: string;
  initialContent?: string;
  onSave?: (content: string) => void;
  theme?: "light" | "dark";
}
