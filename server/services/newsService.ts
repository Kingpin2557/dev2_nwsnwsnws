import { articleQueries } from "./queries";

export interface News {
  id: number;
  slug: string;
  title: string;
  content?: string;
  image?: string;
  created_at?: string;
}

export async function getNews(): Promise<News[]> {
  const data: News[] = await articleQueries.getAll();

  return data;
}

/**
 * Zoekt een nieuwsartikel op basis van de slug.
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  const data: News[] = await articleQueries.getBySlug(slug);

  return data[0];
}

/**
 * Voegt een nieuw nieuwsartikel toe aan het JSON-bestand.
 */
export const addNews = (newArticle: Omit<News, "slug">): News => {
  const slug: string = newArticle.title.toLowerCase().replace(/\s/g, "-");
  const articleWithSlug: News = { slug: slug, ...newArticle };

  return articleWithSlug;
};
