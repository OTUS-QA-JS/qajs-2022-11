class ProductController {
  constructor() {
    this.products = []; // Массив для хранения продуктов
    this.currentId = 1; // Идентификатор для новых продуктов
  }

  createProduct(productData) {
    const existingProduct = this.products.find(
      (p) => p.name === productData.name,
    );
    if (existingProduct) {
      return { status: 409, body: { message: "Product already exists!" } };
    }

    const newProduct = {
      productID: this.currentId++,
      name: productData.name,
      price: productData.price,
      category: productData.category,
    };
    this.products.push(newProduct);
    return { status: 201, body: newProduct };
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.productID === productId);
    if (!product) {
      return { status: 404, body: { message: "Product not found" } };
    }
    return { status: 200, body: product };
  }

  updateProduct(productId, updateData) {
    const product = this.products.find((p) => p.productID === productId);
    if (!product) {
      return { status: 404, body: { message: "Product not found" } };
    }
    Object.assign(product, updateData);
    return { status: 200, body: product };
  }

  deleteProduct(productId) {
    const index = this.products.findIndex((p) => p.productID === productId);
    if (index === -1) {
      return { status: 404, body: { message: "Product not found" } };
    }
    this.products.splice(index, 1);
    return { status: 204 };
  }
}

module.exports = ProductController;
