import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We'll store algorithm metadata on the backend to be served to the frontend
// This allows for easy extensibility without redeploying the frontend if we want to add more metadata later
export const algorithms = pgTable("algorithms", {
  id: text("id").primaryKey(), // e.g., 'bubble-sort'
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'sorting', 'graph', 'searching'
  timeComplexity: text("time_complexity").notNull(),
  spaceComplexity: text("space_complexity").notNull(),
  pseudoCode: text("pseudo_code").notNull(), // Stored as a string, potentially with line numbers
});

export const insertAlgorithmSchema = createInsertSchema(algorithms);

export type Algorithm = typeof algorithms.$inferSelect;
export type InsertAlgorithm = z.infer<typeof insertAlgorithmSchema>;

// Shared types for the visualization engine (not stored in DB, but shared between fe/be if needed)
export type AlgorithmType = 'sorting' | 'graph' | 'searching' | 'pathfinding';

export interface AlgorithmMetadata extends Algorithm {
  // extended properties if needed
}
