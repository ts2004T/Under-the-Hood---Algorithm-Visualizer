import { AnimationStep } from "../types";

interface GridNode {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent?: GridNode;
  isWall: boolean;
}

// Manhattan distance heuristic
function heuristic(node: GridNode, goal: GridNode): number {
  return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}

export function generateAStarSteps(gridWidth: number = 10, gridHeight: number = 10): AnimationStep[] {
  const steps: AnimationStep[] = [];
  
  // Create simple grid (no walls for initial simplicity)
  const grid: GridNode[][] = [];
  for (let y = 0; y < gridHeight; y++) {
    grid[y] = [];
    for (let x = 0; x < gridWidth; x++) {
      grid[y][x] = {
        x,
        y,
        g: Infinity,
        h: 0,
        f: Infinity,
        isWall: false,
      };
    }
  }

  const start = grid[0][0];
  const goal = grid[gridHeight - 1][gridWidth - 1];
  
  start.g = 0;
  start.h = heuristic(start, goal);
  start.f = start.h;

  const openSet: GridNode[] = [start];
  const closedSet: Set<GridNode> = new Set();
  const nodeToIndex = new Map<GridNode, number>();

  let stepCount = 0;

  // A* main loop
  while (openSet.length > 0) {
    // Find node with lowest f score
    let current = openSet[0];
    let currentIdx = 0;

    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < current.f) {
        current = openSet[i];
        currentIdx = i;
      }
    }

    steps.push({
      type: "visit",
      indices: [current.y * gridWidth + current.x],
      description: `Visiting node at (${current.x}, ${current.y}), f=${current.f.toFixed(1)}`,
      lineNo: 8,
      auxiliary: { x: current.x, y: current.y },
    });

    if (current === goal) {
      steps.push({
        type: "found",
        indices: [goal.y * gridWidth + goal.x],
        description: `Path found! Goal reached at (${goal.x}, ${goal.y})`,
        lineNo: 10,
      });
      break;
    }

    openSet.splice(currentIdx, 1);
    closedSet.add(current);

    // Check neighbors (4-directional)
    const neighbors = [
      grid[current.y - 1]?.[current.x],
      grid[current.y + 1]?.[current.x],
      grid[current.y]?.[current.x - 1],
      grid[current.y]?.[current.x + 1],
    ].filter(Boolean) as GridNode[];

    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor) || neighbor.isWall) continue;

      const tentativeG = current.g + 1;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
        steps.push({
          type: "highlight",
          indices: [neighbor.y * gridWidth + neighbor.x],
          description: `Added (${neighbor.x}, ${neighbor.y}) to open set`,
          lineNo: 18,
          auxiliary: { x: neighbor.x, y: neighbor.y },
        });
      } else if (tentativeG >= neighbor.g) {
        continue;
      }

      neighbor.parent = current;
      neighbor.g = tentativeG;
      neighbor.h = heuristic(neighbor, goal);
      neighbor.f = neighbor.g + neighbor.h;

      steps.push({
        type: "compare",
        indices: [neighbor.y * gridWidth + neighbor.x],
        description: `Updated (${neighbor.x}, ${neighbor.y}): g=${neighbor.g}, f=${neighbor.f.toFixed(1)}`,
        lineNo: 17,
        auxiliary: { x: neighbor.x, y: neighbor.y, g: neighbor.g, f: neighbor.f },
      });
    }

    stepCount++;
    if (stepCount > 100) {
      steps.push({
        type: "found",
        indices: [],
        description: "Search completed (limit reached)",
        lineNo: 20,
      });
      break;
    }
  }

  if (openSet.length === 0 && closedSet.size > 0) {
    steps.push({
      type: "found",
      indices: [],
      description: "Open set is empty - no path found",
      lineNo: 7,
    });
  }

  return steps;
}
