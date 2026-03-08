import express, { Application } from "express";
import expressLayouts from "express-ejs-layouts";

import path from "path";
import routes from "./routes";

const app: Application = express();
const PORT: number = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
