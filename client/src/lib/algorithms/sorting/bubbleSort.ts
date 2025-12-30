import { AnimationStep } from "../types";

export function generateBubbleSortSteps(array: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare step
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing elements at indices ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`,
        lineNo: 2 // Assuming line 2 is the comparison
      });

      if (arr[j] > arr[j + 1]) {
        // Swap logic
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // Swap step
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [arr[j], arr[j + 1]], // New values
          description: `Swapping ${arr[j + 1]} and ${arr[j]} since ${arr[j + 1]} > ${arr[j]}`,
          lineNo: 3 // Assuming line 3 is the swap
        });
      }
    }
    // Element at n-i-1 is sorted
    steps.push({
      type: 'sorted',
      indices: [n - i - 1],
      description: `Element at index ${n - i - 1} is now in its sorted position`,
      lineNo: 1
    });
  }
  
  // Mark remaining as sorted (0th element)
  steps.push({
    type: 'sorted',
    indices: [0],
    description: "Sorting complete",
    lineNo: 5
  });

  return steps;
}
