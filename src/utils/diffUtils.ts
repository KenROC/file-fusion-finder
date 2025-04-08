
export type DiffResult = {
  lines: Array<{
    text: string;
    type: 'same' | 'left-only' | 'right-only';
    lineNumber: number;
  }>;
};

export function computeDiff(leftText: string, rightText: string): DiffResult {
  const leftLines = leftText.split('\n');
  const rightLines = rightText.split('\n');
  const result: DiffResult = { lines: [] };
  
  // Simple line-by-line comparison
  const maxLines = Math.max(leftLines.length, rightLines.length);
  
  for (let i = 0; i < maxLines; i++) {
    const leftLine = i < leftLines.length ? leftLines[i] : '';
    const rightLine = i < rightLines.length ? rightLines[i] : '';
    
    if (leftLine === rightLine) {
      result.lines.push({
        text: leftLine,
        type: 'same',
        lineNumber: i + 1
      });
    } else {
      // Lines differ
      if (leftLine) {
        result.lines.push({
          text: leftLine,
          type: 'left-only',
          lineNumber: i + 1
        });
      }
      
      if (rightLine) {
        result.lines.push({
          text: rightLine,
          type: 'right-only',
          lineNumber: i + 1
        });
      }
    }
  }
  
  return result;
}
