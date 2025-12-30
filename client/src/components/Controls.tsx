import { Play, Pause, RotateCcw, SkipBack, SkipForward, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  speed: number;
  onSpeedChange: (val: number) => void;
  progress: number;
  totalSteps: number;
  canStepForward: boolean;
  canStepBackward: boolean;
}

export function Controls({
  isPlaying,
  onPlayPause,
  onReset,
  onStepForward,
  onStepBackward,
  speed,
  onSpeedChange,
  progress,
  totalSteps,
  canStepForward,
  canStepBackward
}: ControlsProps) {
  return (
    <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
      
      {/* Playback Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onReset}
          className="p-3 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <div className="flex items-center bg-secondary/50 rounded-xl p-1 border border-white/5">
          <button 
            onClick={onStepBackward}
            disabled={!canStepBackward}
            className="p-3 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          
          <button 
            onClick={onPlayPause}
            className="p-3 mx-1 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current pl-1" />
            )}
          </button>

          <button 
            onClick={onStepForward}
            disabled={!canStepForward}
            className="p-3 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>

      {/* Progress & Speed */}
      <div className="flex-1 w-full flex flex-col gap-4 md:px-8">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round((progress / Math.max(totalSteps, 1)) * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${(progress / Math.max(totalSteps, 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-48 space-y-3">
        <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <span>Speed</span>
          <span>{speed}x</span>
        </div>
        <Slider
          value={[speed]}
          min={0.5}
          max={10}
          step={0.5}
          onValueChange={(val) => onSpeedChange(val[0])}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
