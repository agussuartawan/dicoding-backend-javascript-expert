const createServer = require("./createServer");
const FigureCalculator = require("./FigureCalculator");
const MathBasic = require("./MathBasic");

describe("A HTTP Server", () => {
  describe("when GET /add", () => {
    it("should respond with a status code of 200 and the payload value is addition result of a and b correctly", async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, "add");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/add/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /subtract", () => {
    it("should respond with a status code of 200 and the payload value is subtraction result of a and b correctly", async () => {
      // Arrange
      const a = 12;
      const b = 8;
      const spySubtract = jest.spyOn(MathBasic, "subtract");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/subtract/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(4); // a - b
      expect(spySubtract).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /multiply", () => {
    it("should respond with a status code of 200 and the payload value is multiplication result of a and b correctly", async () => {
      // Arrange
      const a = 12;
      const b = 8;
      const spyMultiply = jest.spyOn(MathBasic, "multiply");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/multiply/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(96);
      expect(spyMultiply).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /divide", () => {
    it("should respond with a status code of 200 and the payload value is division result of a and b correctly", async () => {
      // Arrange
      const a = 12;
      const b = 2;
      const spyDivision = jest.spyOn(MathBasic, "divide");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/divide/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(6);
      expect(spyDivision).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /rectangle/perimeter", () => {
    it("should respond with a status code of 200 and the payload value is rectanglePerimeter result of a and b correctly", async () => {
      // Arrange
      const a = 8;
      const b = 4;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectanglePerimeter = jest.spyOn(
        figureCalculator,
        "calculateRectanglePerimeter"
      );
      const server = createServer({ figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/rectangle/perimeter/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(24);
      expect(spyCalculateRectanglePerimeter).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /rectangle/area", () => {
    it("should respond with a status code of 200 and the payload value is rectangleArea result of a and b correctly", async () => {
      // Arrange
      const a = 8;
      const b = 4;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectangleArea = jest.spyOn(
        figureCalculator,
        "calculateRectangleArea"
      );
      const server = createServer({ figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/rectangle/area/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(32);
      expect(spyCalculateRectangleArea).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /triangle/perimeter", () => {
    it("should respond with a status code of 200 and the payload value is trianglePerimeter result of a and b correctly", async () => {
      // Arrange
      const a = 8;
      const b = 9;
      const base = 5;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateTriangleArea = jest.spyOn(
        figureCalculator,
        "calculateTrianglePerimeter"
      );
      const server = createServer({ figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/triangle/perimeter/${a}/${b}/${base}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(22);
      expect(spyCalculateTriangleArea).toHaveBeenCalledWith(a, b, base);
    });
  });

  describe("when GET /triangle/area", () => {
    it("should respond with a status code of 200 and the payload value is triangleArea result of a and b correctly", async () => {
      // Arrange
      const a = 8;
      const b = 10;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateTriangleArea = jest.spyOn(
        figureCalculator,
        "calculateTriangleArea"
      );
      const server = createServer({ figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/triangle/area/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(40);
      expect(spyCalculateTriangleArea).toHaveBeenCalledWith(a, b);
    });
  });
});
