const OrderController = require("../framework/services/orderController.js");
const { expect } = require("@jest/globals");

describe("OrderController Tests", () => {
  let orderController;
  let orderId;

  beforeAll(() => {
    orderController = new OrderController();
    // Создаем заказ для тестов
    const response = orderController.createOrder({
      userId: "someUserId",
      productIds: ["productId1", "productId2"],
    });
    orderId = response.body.orderID; // Сохраняем ID созданного заказа
  });

  test("should get order by ID", async () => {
    const response = orderController.getOrderById(orderId);
    expect(response.status).toBe(200);
    expect(response.body.orderID).toBe(orderId);
  });

  test("should update order successfully", async () => {
    const response = orderController.updateOrder(orderId, {
      status: "shipped",
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("shipped");
  });

  test("should delete order successfully", async () => {
    const response = orderController.deleteOrder(orderId);
    expect(response.status).toBe(204);
  });
});
