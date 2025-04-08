
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileDiff } from "lucide-react";
import FileUploader from "@/components/FileUploader";
import TextEditor from "@/components/TextEditor";
import DiffViewer from "@/components/DiffViewer";
import { computeDiff, DiffResult } from "@/utils/diffUtils";
import { toast } from "sonner";

const Index = () => {
  const [leftContent, setLeftContent] = useState<string>("");
  const [rightContent, setRightContent] = useState<string>("");
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);
  
  const handleCompare = () => {
    if (!leftContent && !rightContent) {
      toast.error("Please provide content for at least one file to compare");
      return;
    }
    
    const result = computeDiff(leftContent, rightContent);
    setDiffResult(result);
  };
  
  const handleFileLoad = (content: string, side: "left" | "right") => {
    if (side === "left") {
      setLeftContent(content);
    } else {
      setRightContent(content);
    }
    
    // Reset diff result when new file is loaded
    setDiffResult(null);
    toast.success(`${side === "left" ? "Left" : "Right"} file loaded successfully`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 md:px-8">
        <Card className="w-full shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileDiff className="h-6 w-6" />
              File Diff Tool
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-4">
                <h3 className="font-medium">Left File</h3>
                <FileUploader 
                  onFileLoad={(content) => handleFileLoad(content, "left")} 
                  side="left" 
                />
                <TextEditor 
                  content={leftContent} 
                  onChange={setLeftContent} 
                  side="left" 
                />
              </div>
              
              {/* Right Side */}
              <div className="space-y-4">
                <h3 className="font-medium">Right File</h3>
                <FileUploader 
                  onFileLoad={(content) => handleFileLoad(content, "right")} 
                  side="right" 
                />
                <TextEditor 
                  content={rightContent} 
                  onChange={setRightContent} 
                  side="right" 
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                size="lg" 
                onClick={handleCompare}
              >
                <FileDiff className="mr-2 h-5 w-5" />
                Compare Files
              </Button>
            </div>
            
            {diffResult && (
              <>
                <Separator className="my-8" />
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Comparison Results</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-diff-left mr-2"></div>
                      <span>Content only in left file</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-diff-right mr-2"></div>
                      <span>Content only in right file</span>
                    </div>
                  </div>
                  <DiffViewer diffResult={diffResult} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
