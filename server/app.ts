import express, { Application } from "express";
import expressLayouts from "express-ejs-layouts";

import path from "path";
import routes from "./routes";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app: Application = express();
const PORT: number = parseInt(<string>process.env.PORT, 10) || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My news API",
      version: "1.0.0",
      description: "API docs for my news app",
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes.{ts,js}", "./dist/routes.js", "./api/routes.js"],
};

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
];

const specs = swaggerJsDocs(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCssUrl: CSS_URL,
    customJs: JS_URLS,
  }),
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
