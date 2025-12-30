import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.algorithms.list.path, async (req, res) => {
    const algorithms = await storage.getAlgorithms();
    res.json(algorithms);
  });

  app.get(api.algorithms.get.path, async (req, res) => {
    const algorithm = await storage.getAlgorithm(req.params.id);
    if (!algorithm) {
      return res.status(404).json({ message: "Algorithm not found" });
    }
    res.json(algorithm);
  });

  return httpServer;
}
