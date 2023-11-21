import express from "express";
import path from "path";

export const main = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.static("public"));

  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
