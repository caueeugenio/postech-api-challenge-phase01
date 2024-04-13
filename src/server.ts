import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routes/routes";

const app: Express = express();

app.use(express.json());

app.use(router);

const port = 3000;

app.listen(port, () => {
  mongoose.connect("XXXXXXXXXXXX").then(() => {
    console.log(`Running server api on port ${port}.`);
  });
});
