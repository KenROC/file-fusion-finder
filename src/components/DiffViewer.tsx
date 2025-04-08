
import { useEffect, useState } from "react";
import { DiffResult } from "@/utils/diffUtils";
import { cn } from "@/lib/utils";

interface DiffViewerProps {
  diffResult: DiffResult | null;
}

const DiffViewer = ({ diffResult }: DiffViewerProps) => {
  const [leftContent, setLeftContent] = useState<JSX.Element[]>([]);
  const [rightContent, setRightContent] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (!diffResult) {
      setLeftContent([]);
      setRightContent([]);
      return;
    }
    
    const leftLines: JSX.Element[] = [];
    const rightLines: JSX.Element[] = [];
    
    diffResult.lines.forEach((line, index) => {
      const className = cn(
        "px-4 py-1 whitespace-pre font-mono text-sm",
        {
          "bg-diff-left": line.type === "left-only",
          "bg-diff-right": line.type === "right-only",
        }
      );
      
      if (line.type === "same" || line.type === "left-only") {
        leftLines.push(
          <div key={`left-${index}`} className={className}>
            <span className="inline-block w-8 text-gray-500 select-none">{line.lineNumber}</span>
            {line.text}
          </div>
        );
      } else if (line.type === "right-only") {
        leftLines.push(
          <div key={`left-${index}`} className="px-4 py-1">
            <span className="inline-block w-8 text-gray-500 select-none"></span>
          </div>
        );
      }
      
      if (line.type === "same" || line.type === "right-only") {
        rightLines.push(
          <div key={`right-${index}`} className={className}>
            <span className="inline-block w-8 text-gray-500 select-none">{line.lineNumber}</span>
            {line.text}
          </div>
        );
      } else if (line.type === "left-only") {
        rightLines.push(
          <div key={`right-${index}`} className="px-4 py-1">
            <span className="inline-block w-8 text-gray-500 select-none"></span>
          </div>
        );
      }
    });
    
    setLeftContent(leftLines);
    setRightContent(rightLines);
  }, [diffResult]);
  
  return (
    <div className="grid grid-cols-2 gap-1 overflow-hidden border rounded-md">
      <div className="overflow-auto max-h-[70vh] border-r">
        {leftContent.length > 0 ? (
          leftContent
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No content to display
          </div>
        )}
      </div>
      <div className="overflow-auto max-h-[70vh]">
        {rightContent.length > 0 ? (
          rightContent
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No content to display
          </div>
        )}
      </div>
    </div>
  );
};

export default DiffViewer;
