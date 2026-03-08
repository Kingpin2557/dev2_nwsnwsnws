import express, { Request, Response } from "express";
import { getNews, getNewsBySlug, addNews } from "./services/newsService";

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - News - Read Operations
 *     summary: Get all news articles (HTML)
 *     responses:
 *       200:
 *         description: HTML page displaying list of news articles
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/", (_req: Request, res: Response): void => {
  const news = getNews();
  res.render("news", { title: "News", news: news });
});

/**
 * @openapi
 * /article/{slug}:
 *   get:
 *     tags:
 *       - News - Read Operations
 *     summary: Get a specific news article by slug (HTML)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug identifier for the article
 *     responses:
 *       200:
 *         description: HTML page displaying the specific article
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal server error when the slug is not found
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/article/:slug", (req: Request, res: Response): void => {
  const article = getNewsBySlug(req.params.slug as string);

  if (!article) {
    return res.status(404).render("404", { title: "Pagina niet gevonden" });
  }

  res.render("article", { title: "Article", article: article });
});

/**
 * @openapi
 * /add-article:
 *   get:
 *     tags:
 *       - News - Read Operations
 *     summary: Render the form to add a new article (HTML)
 *     responses:
 *       200:
 *         description: HTML form for creating a new article
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/add-article", (_req, res) => {
  res.render("form", {
    title: "Add an article",
    inhoud: "Inhoud",
    button: "Artikel toevoegen",
    datum: "Datum",
  });
});

/**
 * @openapi
 * /add-news:
 *   post:
 *     tags:
 *       - News - Write Operations
 *     summary: Add a news article (HTML)
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       302:
 *         description: Redirects to the news list
 */
router.post("/add-news", (req, res) => {
  const { title, content, date } = req.body;

  addNews({ title, content, date });
  res.redirect("/");
});

router.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
    // Since you use express-layouts, this will render inside layouts/main
    layout: "layouts/main",
  });
});

export default router;
