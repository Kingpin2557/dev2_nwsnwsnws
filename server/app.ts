import express, { Application } from "express";
import expressLayouts from "express-ejs-layouts";

import path from "path";
import routes from "./routes";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app: Application = express();
const PORT: number = 3000;

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
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [path.join(__dirname, "routes.ts")],
};

const specs = swaggerJsDocs(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
