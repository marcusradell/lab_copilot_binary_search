import request from "supertest";
import { createToysRouter } from "./index";
import express from "express";
import bodyParser from "body-parser";

const setup = () => {
  const app = express();
  app.use(bodyParser.json());
  return { app };
};

describe("createToysRouter", () => {
  test("should return an empty list of toys", () => {
    // Arrange
    const { app } = setup();
    app.use(bodyParser.json()); // Add bodyParser for JSON
    app.use(createToysRouter());

    // Act & Assert
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });

  test("should create a new toy", () => {
    // Arrange
    const { app } = setup();

    app.use(createToysRouter());

    const newToy = {
      name: "Teddy Bear",
      description: "A cute teddy bear",
    };

    // Act & Assert
    return request(app)
      .post("/")
      .send(newToy)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({ ...newToy, id: 1 });
      });
  });
});
