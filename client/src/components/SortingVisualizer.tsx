import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { AnimationStep } from "@/lib/algorithms/types";

interface SortingVisualizerProps {
  array: number[];
  currentStep?: AnimationStep;
  sortedIndices: Set<number>;
}

export function SortingVisualizer({ array, currentStep, sortedIndices }: SortingVisualizerProps) {
  // Determine color of each bar based on current step
  const getBarColor = (index: number) => {
    if (sortedIndices.has(index)) return "var(--vis-sorted)"; // Green
    
    if (currentStep) {
      const { type, indices } = currentStep;
      if (indices.includes(index)) {
        if (type === 'compare') return "var(--vis-compare)"; // Yellow
        if (type === 'swap') return "var(--vis-swap)";       // Red
        if (type === 'overwrite') return "var(--vis-aux)";   // Purple
        if (type === 'sorted') return "var(--vis-sorted)";   // Green
      }
    }
    
    return "var(--vis-default)"; // Blue default
  };

  // Determine height relative to max value for scaling
  const maxValue = useMemo(() => Math.max(...array, 1), [array]);

  return (
    <div className="w-full h-full min-h-[400px] flex items-end justify-center gap-1 p-8 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
      <AnimatePresence mode="popLayout">
        {array.map((value, idx) => (
          <motion.div
            key={`${idx}-${value}`} // Composite key to force re-render on value change if needed, or index for stability
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              height: `${(value / maxValue) * 100}%`,
              backgroundColor: `hsl(${getBarColor(idx)})`,
              opacity: 1
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="flex-1 rounded-t-md relative group min-w-[4px] max-w-[60px]"
          >
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
              {value}
            </div>
            
            {/* Value label for smaller arrays */}
            {array.length <= 20 && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-background/80 mix-blend-screen">
                {value}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
