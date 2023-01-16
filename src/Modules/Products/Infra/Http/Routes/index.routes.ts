import { Router } from "express";
import CityRoutes from "./city.routes";
import ProductsRoutes from "./Products.routes";

class Http {
  public register(): Router {
    const routesHttp = Router();

    const productsRoutes = new ProductsRoutes();
    const cityRoutes = new CityRoutes();

    routesHttp.use("/products", productsRoutes.register());
    routesHttp.use("/cities", cityRoutes.register());

    return routesHttp;
  }
}

export default Http;
