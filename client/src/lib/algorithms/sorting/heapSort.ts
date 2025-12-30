import { AnimationStep } from "../types";

export function generateHeapSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const array = [...arr];
  const n = array.length;
  let lineNo = 1;

  const swap = (i: number, j: number) => {
    [array[i], array[j]] = [array[j], array[i]];
  };

  const heapify = (heapSize: number, rootIdx: number) => {
    let largest = rootIdx;
    const left = 2 * rootIdx + 1;
    const right = 2 * rootIdx + 2;

    if (left < heapSize && array[left] > array[largest]) {
      largest = left;
    }
    if (right < heapSize && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== rootIdx) {
      steps.push({
        type: "compare",
        indices: [rootIdx, largest],
        description: `Comparing element at ${rootIdx} and ${largest}`,
        lineNo: 9,
      });
      
      swap(rootIdx, largest);
      steps.push({
        type: "swap",
        indices: [rootIdx, largest],
        values: [array[rootIdx], array[largest]],
        description: `Swapping ${array[largest]} and ${array[rootIdx]}`,
        lineNo: 13,
      });
      
      heapify(heapSize, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      type: "highlight",
      indices: [i],
      description: `Building heap: heapifying at index ${i}`,
      lineNo: 3,
    });
    heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      type: "compare",
      indices: [0, i],
      description: `Extracting max element, swapping root with index ${i}`,
      lineNo: 7,
    });

    swap(0, i);
    steps.push({
      type: "swap",
      indices: [0, i],
      values: [array[0], array[i]],
      description: `Moved ${array[i]} to final position`,
      lineNo: 8,
    });

    steps.push({
      type: "sorted",
      indices: [i],
      description: `Element at index ${i} is now in its final sorted position`,
      lineNo: 8,
    });

    heapify(i, 0);
  }

  steps.push({
    type: "sorted",
    indices: [0],
    description: "Array is now fully sorted",
    lineNo: 10,
  });

  return steps;
}
