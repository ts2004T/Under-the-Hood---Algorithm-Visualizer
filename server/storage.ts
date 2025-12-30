import { type Algorithm, type InsertAlgorithm } from "@shared/schema";

export interface IStorage {
  getAlgorithms(): Promise<Algorithm[]>;
  getAlgorithm(id: string): Promise<Algorithm | undefined>;
  // We won't need create/update for this static educational app, 
  // but we'll populate it with initial data.
}

export class MemStorage implements IStorage {
  private algorithms: Map<string, Algorithm>;

  constructor() {
    this.algorithms = new Map();
    this.seedAlgorithms();
  }

  async getAlgorithms(): Promise<Algorithm[]> {
    return Array.from(this.algorithms.values());
  }

  async getAlgorithm(id: string): Promise<Algorithm | undefined> {
    return this.algorithms.get(id);
  }

  private seedAlgorithms() {
    const algos: InsertAlgorithm[] = [
      {
        id: "bubble-sort",
        name: "Bubble Sort",
        category: "Sorting",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        pseudoCode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`,
      },
      {
        id: "selection-sort",
        name: "Selection Sort",
        category: "Sorting",
        description: "An in-place comparison sort. It divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        pseudoCode: `procedure selectionSort(A : list of sortable items)
    n := length(A)
    for i := 0 to n - 2 do
        minIdx := i
        for j := i + 1 to n - 1 do
            if A[j] < A[minIdx] then
                minIdx := j
            end if
        end for
        swap(A[i], A[minIdx])
    end for
end procedure`,
      },
      {
        id: "insertion-sort",
        name: "Insertion Sort",
        category: "Sorting",
        description: "Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        pseudoCode: `procedure insertionSort(A : list of sortable items)
    i := 1
    while i < length(A)
        j := i
        while j > 0 and A[j-1] > A[j]
            swap A[j] and A[j-1]
            j := j - 1
        end while
        i := i + 1
    end while
end procedure`,
      },
      {
        id: "merge-sort",
        name: "Merge Sort",
        category: "Sorting",
        description: "An efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        pseudoCode: `procedure mergeSort(A : list of sortable items)
    if length(A) <= 1 then
        return A
    
    mid := length(A) / 2
    left := mergeSort(A[0..mid])
    right := mergeSort(A[mid..end])
    
    return merge(left, right)
end procedure`,
      },
      {
        id: "quick-sort",
        name: "Quick Sort",
        category: "Sorting",
        description: "A divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        pseudoCode: `procedure quickSort(A, lo, hi)
    if lo < hi then
        p := partition(A, lo, hi)
        quickSort(A, lo, p - 1)
        quickSort(A, p + 1, hi)
end procedure`,
      },
      {
        id: "binary-search",
        name: "Binary Search",
        category: "Searching",
        description: "A search algorithm that finds the position of a target value within a sorted array.",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        pseudoCode: `procedure binarySearch(A, target)
    low := 0
    high := length(A) - 1
    while low <= high do
        mid := (low + high) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            low := mid + 1
        else
            high := mid - 1
        end if
    end while
    return -1
end procedure`,
      },
      {
        id: "two-pointers",
        name: "Two Pointers",
        category: "Searching",
        description: "A pattern used to search for pairs in a sorted array or to reverse an array/string.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        pseudoCode: `procedure twoPointers(A, target)
    left := 0
    right := length(A) - 1
    while left < right do
        sum := A[left] + A[right]
        if sum == target then
            return {left, right}
        else if sum < target then
            left := left + 1
        else
            right := right - 1
        end if
    end while
    return not found
end procedure`,
      },
      {
        id: "bfs",
        name: "Breadth-First Search",
        category: "Graph",
        description: "An algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        pseudoCode: `procedure BFS(G, start_v)
    let Q be a queue
    label start_v as discovered
    Q.enqueue(start_v)
    while Q is not empty do
        v := Q.dequeue()
        for all edges from v to w in G.adjacentEdges(v) do
            if w is not labeled as discovered then
                label w as discovered
                w.parent := v
                Q.enqueue(w)
            end if
        end for
    end while
end procedure`,
      },
      {
        id: "dfs",
        name: "Depth-First Search",
        category: "Graph",
        description: "An algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        pseudoCode: `procedure DFS(G, v)
    label v as discovered
    for all directed edges from v to w that are in G.adjacentEdges(v) do
        if vertex w is not labeled as discovered then
            DFS(G, w)
        end if
    end for
end procedure`,
      },
      {
        id: "dijkstra",
        name: "Dijkstra's Algorithm",
        category: "Graph",
        description: "An algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.",
        timeComplexity: "O((V + E) log V)",
        spaceComplexity: "O(V)",
        pseudoCode: `procedure Dijkstra(Graph, source)
    dist[source] := 0
    for each vertex v in Graph.Vertices:
        if v != source
            dist[v] := infinity
        add v to Q
    while Q is not empty:
        u := vertex in Q with min dist[u]
        remove u from Q
        for each neighbor v of u:
            alt := dist[u] + length(u, v)
            if alt < dist[v]
                dist[v] := alt
    return dist
end procedure`,
      },
      {
        id: "heap-sort",
        name: "Heap Sort",
        category: "Sorting",
        description: "A comparison-based sorting algorithm that uses a heap data structure. It divides the input into sorted and unsorted regions and iteratively shrinks the unsorted region by extracting the largest element.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        pseudoCode: `procedure heapSort(A : list)
    n := length(A)
    
    // Build max heap
    for i := n/2 - 1 down to 0 do
        heapify(A, n, i)
    
    // Extract elements from heap
    for i := n - 1 down to 1 do
        swap(A[0], A[i])
        heapify(A, i, 0)
end procedure

procedure heapify(A, n, i)
    largest := i
    left := 2 * i + 1
    right := 2 * i + 2
    
    if left < n and A[left] > A[largest]
        largest := left
    if right < n and A[right] > A[largest]
        largest := right
    
    if largest != i
        swap(A[i], A[largest])
        heapify(A, n, largest)
end procedure`,
      },
      {
        id: "a-star",
        name: "A* Pathfinding",
        category: "Pathfinding",
        description: "A pathfinding algorithm that finds the shortest path between nodes in a graph. It uses heuristics (like Manhattan distance) to guide the search and is widely used in game development and robotics.",
        timeComplexity: "O(b^d)",
        spaceComplexity: "O(b^d)",
        pseudoCode: `procedure A*(start, goal, graph)
    openSet := {start}
    cameFrom := empty map
    gScore[start] := 0
    fScore[start] := heuristic(start, goal)
    
    while openSet is not empty do
        current := node in openSet with lowest fScore
        if current == goal
            return reconstructPath(cameFrom, current)
        
        remove current from openSet
        for each neighbor of current do
            tentativeGScore := gScore[current] + cost(current, neighbor)
            if tentativeGScore < gScore[neighbor]
                cameFrom[neighbor] := current
                gScore[neighbor] := tentativeGScore
                fScore[neighbor] := gScore[neighbor] + heuristic(neighbor, goal)
                if neighbor not in openSet
                    add neighbor to openSet
    
    return no path found
end procedure`,
      }
    ];

    algos.forEach(algo => this.algorithms.set(algo.id, algo as Algorithm));
  }
}

export const storage = new MemStorage();
