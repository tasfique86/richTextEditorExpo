export interface TipTapEditorProps {
  name: string;
  initialContent?: string;
  initialContentFormat?: "html" | "markdown";
  onSave?: (content: string) => void;
  theme?: "light" | "dark";
}
