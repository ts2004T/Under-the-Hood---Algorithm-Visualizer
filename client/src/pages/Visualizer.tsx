import { useEffect, useState, useMemo } from "react";
import { useRoute } from "wouter";
import { useAlgorithm } from "@/hooks/use-algorithms";
import { Controls } from "@/components/Controls";
import { CodeViewer } from "@/components/CodeViewer";
import { SortingVisualizer } from "@/components/SortingVisualizer";
import { ArrowLeft, RefreshCw, Clock, Database, Info } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Algorithm generators
import { generateBubbleSortSteps } from "@/lib/algorithms/sorting/bubbleSort";
import { generateSelectionSortSteps } from "@/lib/algorithms/sorting/selectionSort";
import { generateHeapSortSteps } from "@/lib/algorithms/sorting/heapSort";
import { generateAStarSteps } from "@/lib/algorithms/pathfinding/aStar";
import { AnimationStep } from "@/lib/algorithms/types";

// Random array generator
const generateRandomArray = (length: number, min: number, max: number) => 
  Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min));

export default function Visualizer() {
  const [match, params] = useRoute("/visualize/:id");
  const algoId = params?.id || "";
  const { data: algorithm, isLoading } = useAlgorithm(algoId);

  // State
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  
  // Initialize visualization
  useEffect(() => {
    resetVisualization();
  }, [algoId]);

  const resetVisualization = () => {
    const newArray = generateRandomArray(15, 5, 100);
    setArray(newArray);
    setCurrentStepIndex(-1);
    setIsPlaying(false);

    // Generate steps based on algorithm
    let generatedSteps: AnimationStep[] = [];
    if (algoId === 'bubble-sort') generatedSteps = generateBubbleSortSteps(newArray);
    else if (algoId === 'selection-sort') generatedSteps = generateSelectionSortSteps(newArray);
    else if (algoId === 'heap-sort') generatedSteps = generateHeapSortSteps(newArray);
    else if (algoId === 'a-star') generatedSteps = generateAStarSteps(10, 10);
    // Add more algorithms here
    
    setSteps(generatedSteps);
  };

  // Playback loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  // Derived state for the visualizer
  const currentVisualizationState = useMemo(() => {
    // Reconstruct the array state at the current step
    // This is inefficient for large datasets but perfect for small visualizations
    // Ideally we would apply delta updates, but reconstructing ensures consistency for "step back"
    
    const tempArray = [...array]; // Initial state
    const sortedIndices = new Set<number>();

    for (let i = 0; i <= currentStepIndex; i++) {
      const step = steps[i];
      if (step.type === 'swap' && step.indices.length === 2 && step.values) {
        tempArray[step.indices[0]] = step.values[0];
        tempArray[step.indices[1]] = step.values[1];
      }
      if (step.type === 'sorted') {
        step.indices.forEach(idx => sortedIndices.add(idx));
      }
    }
    return { tempArray, sortedIndices };
  }, [array, currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex];

  if (isLoading) return <div className="flex h-screen items-center justify-center text-muted-foreground font-mono">Loading algorithm data...</div>;
  if (!algorithm) return <div className="flex h-screen items-center justify-center text-red-500 font-mono">Algorithm not found</div>;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </a>
            </Link>
            <div>
              <h1 className="text-lg font-bold font-display tracking-tight">{algorithm.name}</h1>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {algorithm.timeComplexity}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1"><Database className="w-3 h-3" /> {algorithm.spaceComplexity}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={resetVisualization}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors border border-primary/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Generate New Data</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Visualization & Controls */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex-1 bg-card rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative min-h-[400px]">
            {/* Status Bar Overlay */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
              <div className="bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg max-w-md">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold block mb-1">Current Operation</span>
                <p className="text-sm font-medium text-white font-mono">
                  {currentStep?.description || "Ready to start..."}
                </p>
              </div>
            </div>

            <SortingVisualizer 
              array={currentVisualizationState.tempArray} 
              currentStep={currentStep}
              sortedIndices={currentVisualizationState.sortedIndices}
            />
          </div>

          <Controls 
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={() => {
              setCurrentStepIndex(-1);
              setIsPlaying(false);
            }}
            onStepForward={() => setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1))}
            onStepBackward={() => setCurrentStepIndex(prev => Math.max(prev - 1, -1))}
            speed={speed}
            onSpeedChange={setSpeed}
            progress={currentStepIndex + 1}
            totalSteps={steps.length}
            canStepForward={currentStepIndex < steps.length - 1}
            canStepBackward={currentStepIndex > -1}
          />
        </div>

        {/* Right Col: Info & Code */}
        <div className="flex flex-col gap-6 h-[calc(100vh-8rem)] sticky top-24">
          <div className="bg-card rounded-2xl border border-white/5 p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Info className="w-5 h-5" />
              <h3 className="font-bold font-display">Description</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {algorithm.description}
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
             <CodeViewer 
               code={algorithm.pseudoCode} 
               activeLine={currentStep?.lineNo} 
             />
          </div>
        </div>
      </main>
    </div>
  );
}
