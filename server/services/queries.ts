import sql from "./db";
import { type News } from "./newsService";

export const articleQueries = {
  getAll: () => sql<News[]>`
    SELECT * FROM articles ORDER BY created_at DESC
  `,

  getBySlug: (slug: string) => sql<News[]>`
    SELECT * FROM articles WHERE slug = ${slug} LIMIT 1
  `,
};
