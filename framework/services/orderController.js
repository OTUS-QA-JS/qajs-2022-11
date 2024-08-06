class OrderController {
  constructor() {
    this.orders = []; // Массив для хранения заказов
    this.currentId = 1; // Идентификатор для новых заказов
  }

  createOrder(orderData) {
    const newOrder = {
      orderID: this.currentId++,
      userId: orderData.userId,
      productIds: orderData.productIds,
      status: "pending",
    };
    this.orders.push(newOrder);
    return { status: 201, body: newOrder };
  }

  getOrderById(orderId) {
    const order = this.orders.find((o) => o.orderID === orderId);
    if (!order) {
      return { status: 404, body: { message: "Order not found" } };
    }
    return { status: 200, body: order };
  }

  updateOrder(orderId, updateData) {
    const order = this.orders.find((o) => o.orderID === orderId);
    if (!order) {
      return { status: 404, body: { message: "Order not found" } };
    }
    Object.assign(order, updateData);
    return { status: 200, body: order };
  }

  deleteOrder(orderId) {
    const index = this.orders.findIndex((o) => o.orderID === orderId);
    if (index === -1) {
      return { status: 404, body: { message: "Order not found" } };
    }
    this.orders.splice(index, 1);
    return { status: 204 };
  }
}

module.exports = OrderController;
