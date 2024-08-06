const ProductController = require("../framework/services/productController.js");
const { expect } = require("@jest/globals");

describe("ProductController Tests", () => {
  let productController;
  let productId;

  beforeAll(() => {
    productController = new ProductController();
    // Создаем продукт для тестов
    const response = productController.createProduct({
      name: "Test Product",
      price: 19.99,
      category: "Books",
    });
    productId = response.body.productID; // Сохраняем ID созданного продукта
  });

  test("should return error for duplicate product", async () => {
    const response = productController.createProduct({
      name: "Test Product",
      price: 19.99,
      category: "Books",
    });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Product already exists!");
  });

  test("should get product by ID", async () => {
    const response = productController.getProductById(productId);
    expect(response.status).toBe(200);
    expect(response.body.productID).toBe(productId);
  });

  test("should update product successfully", async () => {
    const response = productController.updateProduct(productId, {
      price: 24.99,
    });
    expect(response.status).toBe(200);
    expect(response.body.price).toBe(24.99);
  });

  test("should delete product successfully", async () => {
    const response = productController.deleteProduct(productId);
    expect(response.status).toBe(204);
  });
});
