import express, { Request, Response } from "express";
import { getNews, getNewsBySlug, addNews } from "./services/newsService";

const router = express.Router();

router.get("/", (_req: Request, res: Response): void => {
  const news = getNews();
  res.render("news", { title: "News", news: news });
});

router.get("/article/:slug", (req: Request, res: Response): void => {
  const article = getNewsBySlug(req.params.slug as string);
  res.render("article", { title: "Article", article: article });
});

router.get("/add-article", (_req, res) => {
  res.render("form", {
    title: "Add an article",
    inhoud: "Inhoud",
    button: "Artikel toevoegen",
    datum: "Datum",
  });
});

router.post("/add-news", (req, res) => {
  const { title, content, date } = req.body;

  addNews({ title, content, date });
  res.redirect("/");
});

export default router;
