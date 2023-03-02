import express from "express";
import * as dotenv from "dotenv";
import apicache from "apicache";
import routes from "./routes/routes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const cache = apicache.middleware;

app.use(cache("1 day"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);
app.get("/", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/21591099/2s93CUHVaw");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
