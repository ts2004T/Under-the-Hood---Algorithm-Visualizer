import { z } from 'zod';
import { algorithms, insertAlgorithmSchema } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  algorithms: {
    list: {
      method: 'GET' as const,
      path: '/api/algorithms',
      responses: {
        200: z.array(z.custom<typeof algorithms.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/algorithms/:id',
      responses: {
        200: z.custom<typeof algorithms.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
