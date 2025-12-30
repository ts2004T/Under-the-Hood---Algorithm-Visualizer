export type StepType = 
  | 'compare' 
  | 'swap' 
  | 'overwrite' 
  | 'highlight' 
  | 'sorted' 
  | 'visit' 
  | 'found';

export interface AnimationStep {
  type: StepType;
  indices: number[]; // Indices involved in the step
  values?: any[];    // Values involved (optional)
  description: string; // Text description of what's happening
  lineNo?: number;     // Line number in pseudocode
  auxiliary?: any;     // Extra data for specific algorithms (e.g., merge sort aux array)
}

export interface VisualizationState {
  array: number[];
  highlights: number[]; // Indices currently being processed
  compared: number[];   // Indices being compared (different color)
  sorted: number[];     // Indices that are finalized
  swapped: number[];    // Indices just swapped
  aux?: any;            // Auxiliary state
}
