import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import clsx from "clsx";

interface CodeViewerProps {
  code: string;
  activeLine?: number;
  language?: string;
}

export function CodeViewer({ code, activeLine, language = "typescript" }: CodeViewerProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-lg flex flex-col h-full font-mono text-sm">
      <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="ml-4 text-xs text-muted-foreground uppercase tracking-wider">Pseudocode</span>
      </div>
      
      <div className="relative overflow-y-auto flex-1 custom-scrollbar p-4">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isActive = activeLine === lineNumber;
          
          return (
            <div 
              key={index}
              className={clsx(
                "flex transition-colors duration-200 rounded px-2 -mx-2",
                isActive && "bg-white/10"
              )}
            >
              <span className="w-8 text-muted-foreground/50 select-none text-right pr-4 text-xs leading-6">
                {lineNumber}
              </span>
              <pre className="!m-0 !p-0 !bg-transparent flex-1 overflow-visible">
                <code 
                  className={`language-${language} !text-sm leading-6 !whitespace-pre`}
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(line, Prism.languages[language], language)
                  }}
                />
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
