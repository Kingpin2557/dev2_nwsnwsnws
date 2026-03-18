// Importeer sql uit db.ts
import sql from "./db";

// Interface voor een nieuwsartikel
export interface News {
  id: number;
  slug: string;
  title: string;
  content?: string;
  image?: string;
  created_at?: string;
}

// Alle nieuwsartikelen ophalen
export async function getNews(): Promise<News[]> {
  const data: News[] = await sql`select * from articles`;
  return data;
}

/**
 * Zoekt een nieuwsartikel op basis van de slug.
 */
export async function getNewsBySlug(slug: string): Promise<News | null> {
  const data: News[] = await sql`select * FROM articles WHERE slug = ${slug}`;

  console.log(data);
  return data[0];
}

// /**
//  * Voegt een nieuw nieuwsartikel toe aan het JSON-bestand.
//  */
// export const addNews = (newArticle: Omit<News, "slug">): News => {
//   const news = getNews();
// const slug: string = newArticle.title.toLowerCase().replace(/\s/g, "-");
//   const articleWithSlug: News = { slug: slug, ...newArticle };

//   news.push(articleWithSlug);
//   fs.writeFileSync(filePath, JSON.stringify(news, null, 2), "utf-8");

//   return articleWithSlug;
// };
