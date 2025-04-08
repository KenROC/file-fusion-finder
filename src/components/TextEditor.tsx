
import { Textarea } from "@/components/ui/textarea";

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  side: "left" | "right";
}

const TextEditor = ({ content, onChange, side }: TextEditorProps) => {
  return (
    <Textarea
      className="h-[300px] font-mono text-sm resize-none"
      placeholder={`Enter or paste ${side === "left" ? "left" : "right"} content here...`}
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextEditor;
