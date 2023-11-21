import { Router } from "express";

type Toy = {
  id: number;
  name: string;
  description: string;
};

export function createToysRouter(): Router {
  const toys: Toy[] = [];

  const toysRouter = Router();

  toysRouter.get("/", (req, res) => {
    res.json(toys);
  });

  toysRouter.get("/:id", (req, res) => {
    const toyId = parseInt(req.params.id);
    const toy = toys.find((t) => t.id === toyId);
    if (toy) {
      res.json(toy);
    } else {
      res.status(404).json({ message: "Toy not found" });
    }
  });

  toysRouter.post("/", (req, res) => {
    const { name, description } = req.body;
    const toy: Toy = { id: toys.length + 1, name, description };
    toys.push(toy);
    res.status(201).json(toy);
  });

  toysRouter.put("/:id", (req, res) => {
    const toyId = parseInt(req.params.id);
    const { name, description } = req.body;
    const toyIndex = toys.findIndex((t) => t.id === toyId);
    if (toyIndex === -1) {
      res.status(404).json({ message: "Toy not found" });
      return;
    }
    toys[toyIndex] = { ...toys[toyIndex], name, description };
    res.json(toys[toyIndex]);
  });

  toysRouter.delete("/:id", (req, res) => {
    const toyId = parseInt(req.params.id);
    const toyIndex = toys.findIndex((t) => t.id === toyId);
    if (toyIndex !== -1) {
      const deletedToy = toys.splice(toyIndex, 1)[0];
      res.json(deletedToy);
    } else {
      res.status(404).json({ message: "Toy not found" });
    }
  });

  return toysRouter;
}
