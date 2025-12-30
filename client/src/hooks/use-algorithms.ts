import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useAlgorithms() {
  return useQuery({
    queryKey: [api.algorithms.list.path],
    queryFn: async () => {
      const res = await fetch(api.algorithms.list.path);
      if (!res.ok) throw new Error("Failed to fetch algorithms");
      return api.algorithms.list.responses[200].parse(await res.json());
    },
  });
}

export function useAlgorithm(id: string) {
  return useQuery({
    queryKey: [api.algorithms.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.algorithms.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch algorithm");
      return api.algorithms.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
