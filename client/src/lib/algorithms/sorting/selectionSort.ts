import { AnimationStep } from "../types";

export function generateSelectionSortSteps(array: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    
    // Highlight starting minimum
    steps.push({
      type: 'highlight',
      indices: [minIdx],
      description: `Assuming minimum is at index ${minIdx} (${arr[minIdx]})`,
      lineNo: 2
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'compare',
        indices: [minIdx, j],
        description: `Comparing current min (${arr[minIdx]}) with ${arr[j]}`,
        lineNo: 3
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'highlight',
          indices: [minIdx],
          description: `Found new minimum at index ${minIdx} (${arr[minIdx]})`,
          lineNo: 4
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        type: 'swap',
        indices: [i, minIdx],
        description: `Swapping ${temp} with new minimum ${arr[i]}`,
        lineNo: 6
      });
    }

    steps.push({
      type: 'sorted',
      indices: [i],
      description: `Index ${i} is now sorted`,
      lineNo: 1
    });
  }

  return steps;
}
