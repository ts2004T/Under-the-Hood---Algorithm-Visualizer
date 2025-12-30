# Under the Hood — Algorithm Visualizer

Under the Hood is an interactive algorithm visualizer built to make core Data Structures and Algorithms easier to understand by showing **how they work internally, step by step**.

The project focuses on educational clarity, clean architecture, and real algorithm logic rather than pre-baked animations.

---

## 🚀 Features

- Step-by-step visualization of algorithms  
- Clear separation between algorithm logic and UI rendering  
- Speed control and reset for visualizations  
- Clean and minimal UI focused on learning  

---

## 🧠 Algorithms Implemented

### Sorting Algorithms
- Bubble Sort  
- Selection Sort  
- Insertion Sort  
- Merge Sort  

### Searching & Techniques
- Binary Search  
- Two Pointers Technique  

### Graph Algorithms
- Breadth-First Search (BFS)  
- Depth-First Search (DFS)  
- Dijkstra’s Algorithm  
- A* Algorithm  

### Data Structures
- Heap / Priority Queue  

---

## 🏗️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Tooling:** Vite, tsx  
- **Language:** TypeScript  

---

## 🧩 Project Architecture

- Algorithm logic is implemented independently of the UI  
- Each algorithm generates intermediate states that the UI consumes for visualization  
- The backend serves the application and handles routing, while the frontend focuses on interaction and rendering  

This separation makes the project easier to extend and explain in technical interviews.

---

## ▶️ Running Locally

### Prerequisites
- Node.js v18+ (recommended: Node 20 LTS)

### Steps

```bash
# Clone the repository
git clone https://github.com/ts2004T/Under-the-Hood---Algorithm-Visualizer.git

# Navigate into the project
cd Under-the-Hood---Algorithm-Visualizer

# Install dependencies
npm install --omit=optional

# Run the development server
npm run dev
