import request from "supertest";
import { main } from "../../main";

const setup = () => {
  const app = main();
  return { app };
};

describe("createToysRouter", () => {
  test("should return an empty list of toys", () => {
    // Arrange
    const { app } = setup();

    // Act & Assert
    return request(app)
      .get("/api/v1/toys")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });

  test("should create a new toy", () => {
    // Arrange
    const { app } = setup();

    const newToy = {
      name: "Teddy Bear",
      description: "A cute teddy bear",
    };

    // Act & Assert
    return request(app)
      .post("/api/v1/toys")
      .send(newToy)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({ ...newToy, id: 1 });
      });
  });
});
