
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";

interface FileUploaderProps {
  onFileLoad: (content: string) => void;
  side: "left" | "right";
}

const FileUploader = ({ onFileLoad, side }: FileUploaderProps) => {
  const [fileName, setFileName] = useState<string>("");
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileLoad(content);
    };
    
    reader.readAsText(file);
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => document.getElementById(`file-input-${side}`)?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload {side === "left" ? "Left" : "Right"} File
      </Button>
      <input
        id={`file-input-${side}`}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".txt,.js,.ts,.jsx,.tsx,.html,.css,.json,.md"
      />
      {fileName && (
        <p className="text-sm text-muted-foreground truncate max-w-full">
          {fileName}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
