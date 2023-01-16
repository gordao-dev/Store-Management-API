import { Router } from "express";

import ProductsRoutes from "./Products.routes";

class ProductsHttp {
  public register(): Router {
    const productsHttp = Router();

    const productsRoutes = new ProductsRoutes();

    productsHttp.use("/", productsRoutes.register());

    return productsHttp;
  }
}

export default ProductsHttp;
