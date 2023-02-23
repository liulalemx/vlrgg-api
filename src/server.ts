import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes/routes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.listen(port, () => console.log(`Server started on port ${port}`));
