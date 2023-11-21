import express from "express";
import { createToysRouter } from "./kits";

export const main = () => {
  const app = express();

  app.use(express.static("public"));
  app.use(express.json());

  const toysRouter = createToysRouter();

  app.use("/api/v1/toys", toysRouter);

  app.get("/api/v1/status", (req, res) => {
    res.status(200).end();
  });

  return app;
};
